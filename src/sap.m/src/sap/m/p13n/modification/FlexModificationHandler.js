/*!
 * ${copyright}
 */
sap.ui.define([
    "./ModificationHandler",
    "sap/m/p13n/FlexUtil",
    "sap/m/p13n/enums/PersistenceMode",
    "sap/ui/core/Lib"
], (ModificationHandler, FlexUtil, mode, Library) => {
	"use strict";

	let oFlexModificationHandler, pInitialize, pRuntimeAPI, pWriteAPI;

	const _requireFlexRuntimeAPI = () => {
		if (!pRuntimeAPI) {
			pRuntimeAPI = new Promise((resolve, reject) => {
				sap.ui.require([
					"sap/ui/fl/apply/api/FlexRuntimeInfoAPI"
				], (FlexRuntimeInfoAPI) => {
					resolve(FlexRuntimeInfoAPI);
				}, reject);
			});
		}
		return pRuntimeAPI;
	};

	const _requireWriteAPI = () => {
		if (!pWriteAPI) {
			pWriteAPI = new Promise((resolve, reject) => {
				sap.ui.require([
					"sap/ui/fl/write/api/ControlPersonalizationWriteAPI"
				], (ControlPersonalizationWriteAPI) => {
					resolve(ControlPersonalizationWriteAPI);
				});
			});
		}
		return pWriteAPI;
	};

	/**
	 * @class This class offers <code>sap.ui.fl</code> capabilities.
	 * It should be used as the persistence layer in the {@link sap.m.p13n.Engine#register Engine#register} process.
	 *
	 * @author SAP SE
	 * @private
	 * @experimental Since 1.104.
	 * @alias sap.m.p13n.modification.FlexModificationHandler
	 */
	const FlexModificationHandler = ModificationHandler.extend("sap.m.p13n.modification.FlexModificationHandler");

	FlexModificationHandler.prototype.processChanges = function(aChanges, oModificationPayload) {
		const oControl = aChanges && aChanges[0] ? aChanges[0].selectorElement : undefined;

		let sInternalPersistenceMode = oModificationPayload.mode;

		/**
		 * In case of 'Auto' we internally overwrite the persistence mode to use the VM
		 * in case it has been provided instead of the PP
		 */
		const bIsAutoGlobal = sInternalPersistenceMode === mode.Auto;
		if (bIsAutoGlobal) {
			sInternalPersistenceMode = oModificationPayload.hasVM ? "Standard" : mode.Global;
		}

		const bIsGlobal = sInternalPersistenceMode === mode.Global;

		const bIsTransient = sInternalPersistenceMode === mode.Transient;

		return this.initialize()
			.then(() => {

				const oHandleChangesPromise = FlexUtil.handleChanges(aChanges, bIsGlobal, bIsTransient);
				return bIsGlobal ? oHandleChangesPromise.then((aDirtyChanges) => {
					return FlexUtil.saveChanges(oControl, aDirtyChanges);
				}) : oHandleChangesPromise;
			});
	};

	FlexModificationHandler.prototype.waitForChanges = function(mPropertyBag, oModificationPayload) {
		return this.initialize()
			.then(() => {
				return _requireFlexRuntimeAPI().then((FlexRuntimeInfoAPI) => {
					return FlexRuntimeInfoAPI.waitForChanges(mPropertyBag, oModificationPayload);
				});
			});
	};

	FlexModificationHandler.prototype.hasChanges = function(mPropertyBag, oModificationPayload) {

		let sInternalPersistenceMode = oModificationPayload.mode;

		if (sInternalPersistenceMode === mode.Auto) {
			sInternalPersistenceMode = oModificationPayload.hasVM ? "Standard" : mode.Global;
		}

		return this.initialize()
			.then(() => {
				if (sInternalPersistenceMode === mode.Global) {
					return _requireFlexRuntimeAPI().then((FlexRuntimeInfoAPI) => {
						return FlexRuntimeInfoAPI.isPersonalized({
							...mPropertyBag,
							selectors: [mPropertyBag.selector]
						});
					});
				} else {
					return _requireWriteAPI().then((ControlPersonalizationWriteAPI) => {
						return ControlPersonalizationWriteAPI.hasDirtyFlexObjects(mPropertyBag);
					});
				}
			});
	};

	FlexModificationHandler.prototype.reset = function(mPropertyBag, oModificationPayload) {
		const sPersistenceMode = oModificationPayload.mode;

		const bIsGlobal = sPersistenceMode === mode.Global;
		const bIsAutoGlobal = !oModificationPayload.hasVM && oModificationPayload.hasPP && sPersistenceMode === mode.Auto;

		return this.initialize()
			.then(() => {
				return (bIsGlobal || bIsAutoGlobal) ? FlexUtil.reset(mPropertyBag) : FlexUtil.restore(mPropertyBag);
			});
	};

	FlexModificationHandler.prototype.isModificationSupported = function(mPropertyBag, oModificationPayload) {
		return this.initialize()
			.then(() => {
				return _requireFlexRuntimeAPI().then((FlexRuntimeInfoAPI) => {
					return FlexRuntimeInfoAPI.isFlexSupported(mPropertyBag, oModificationPayload);
				});
			});
	};

    FlexModificationHandler.prototype.initialize = function() {
        if (!pInitialize) {
            pInitialize = Library.load({name: 'sap.ui.fl'});
        }
        return pInitialize;
    };

	FlexModificationHandler.getInstance = () => {
		if (!oFlexModificationHandler) {
			oFlexModificationHandler = new FlexModificationHandler();
		}
		return oFlexModificationHandler;
	};

	return FlexModificationHandler;
});