/*!
 * ${copyright}
 */
sap.ui.define([
    "sap/ui/mdc/LinkDelegate",
	"sap/ui/mdc/link/LinkItem",
	"sap/ui/mdc/enums/LinkType"
], function(LinkDelegate, LinkItem, LinkType) {
    "use strict";

    var SampleLinkDelegate = Object.assign({}, LinkDelegate);
	SampleLinkDelegate.fetchLinkType = function(oLink) {
		var oLinkItem = new LinkItem({
			key: "L1_1",
			text: "Manage author",
			href: self.location.pathname + (self.location.search && self.location.search) +  "#/Authors/{path: 'author_ID', targetType: 'raw'}"
		});
		var oLinkType = {
			type: LinkType.DirectLink,
			directLink: oLinkItem
		};
		return Promise.resolve(oLinkType);
	};

    return SampleLinkDelegate;
});
