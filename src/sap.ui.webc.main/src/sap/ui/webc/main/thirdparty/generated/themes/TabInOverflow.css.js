sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/asset-registries/Themes", "sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css", "./sap_fiori_3/parameters-bundle.css"], function (_exports, _Themes, _parametersBundle, _parametersBundle2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _parametersBundle = _interopRequireDefault(_parametersBundle);
  _parametersBundle2 = _interopRequireDefault(_parametersBundle2);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", async () => _parametersBundle.default);
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents", "sap_fiori_3", async () => _parametersBundle2.default);
  const styleData = {
    packageName: "@ui5/webcomponents",
    fileName: "themes/TabInOverflow.css",
    content: ".ui5-tab-semantic-icon{display:var(--_ui5-v1-18-0_tc_headerItemSemanticIcon_display);height:var(--_ui5-v1-18-0_tc_headerItemSemanticIcon_size);margin-inline-end:.5rem;width:var(--_ui5-v1-18-0_tc_headerItemSemanticIcon_size)}.ui5-tab-semantic-icon--positive{color:var(--sapPositiveElementColor)}.ui5-tab-semantic-icon--negative{color:var(--sapNegativeElementColor)}.ui5-tab-semantic-icon--critical{color:var(--sapCriticalElementColor)}.ui5-hidden-text{clip:rect(1px,1px,1px,1px);font-size:0;left:-1000px;pointer-events:none;position:absolute;top:-1000px;user-select:none}.ui5-tab-overflow-item{color:var(--_ui5-v1-18-0_tc_overflowItem_default_color)}.ui5-tab-overflow-item--disabled{cursor:default;opacity:var(--sapContent_DisabledOpacity)}.ui5-tab-overflow-item[hidden]{display:none}.ui5-tab-semantic-icon{inset-inline-start:-.25rem;position:absolute}.ui5-tab-overflow-item--positive:not(.ui5-tab-overflow-item--disabled) .ui5-tab-overflow-itemContent{color:var(--_ui5-v1-18-0_tc_overflowItem_positive_color)}.ui5-tab-overflow-item--negative:not(.ui5-tab-overflow-item--disabled) .ui5-tab-overflow-itemContent{color:var(--_ui5-v1-18-0_tc_overflowItem_negative_color)}.ui5-tab-overflow-item--critical:not(.ui5-tab-overflow-item--disabled) .ui5-tab-overflow-itemContent{color:var(--_ui5-v1-18-0_tc_overflowItem_critical_color)}.ui5-tab-overflow-item[active] .ui5-tab-overflow-itemContent{color:var(--sapList_Active_TextColor)}.ui5-tab-overflow-itemContent{align-items:center;display:flex;font-size:.875rem;height:var(--_ui5-v1-18-0_tc_item_text);pointer-events:none;position:relative}.ui5-tab-overflow-itemContent-wrapper{padding-inline-start:calc(var(--_ui5-v1-18-0-tab-indentation-level)*.5rem + var(--_ui5-v1-18-0-tab-extra-indent, 0)*var(--_ui5-v1-18-0_tc_overflowItem_extraIndent))}.ui5-tab-overflow-item--selectedSubTab{background-color:var(--sapList_SelectionBackgroundColor)}.ui5-tab-overflow-item [ui5-icon]:not(.ui5-tab-semantic-icon){color:var(--_ui5-v1-18-0_tc_overflowItem_current_color);height:1.375rem;padding-inline-end:.75rem;width:1.375rem}.ui5-tab-container-responsive-popover [ui5-li-custom][focused]::part(native-li):after{inset:var(--_ui5-v1-18-0_tc_overflowItem_focus_offset)}.ui5-tab-container-responsive-popover::part(content){padding:0}"
  };
  var _default = styleData;
  _exports.default = _default;
});