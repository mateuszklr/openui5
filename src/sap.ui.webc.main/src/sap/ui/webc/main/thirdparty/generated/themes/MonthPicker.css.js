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
    fileName: "themes/MonthPicker.css",
    content: ":host(:not([hidden])){display:block}:host{height:100%;width:100%}.ui5-mp-root{align-items:center;display:flex;flex-direction:column;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize);justify-content:center;padding:2rem 0 1rem 0}.ui5-mp-item{align-items:center;background-color:var(--sapLegend_WorkingBackground);border:var(--_ui5-v1-18-0_monthpicker_item_border);border-radius:var(--_ui5-v1-18-0_monthpicker_item_border_radius);box-sizing:border-box;color:var(--sapButton_Lite_TextColor);cursor:default;display:flex;flex-direction:column;height:var(--_ui5-v1-18-0_month_picker_item_height);justify-content:center;margin:var(--_ui5-v1-18-0_monthpicker_item_margin);outline:none;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:calc(33.333% - .125rem)}.ui5-dp-monthsectext{color:var(--sapNeutralElementColor);font-size:.75rem}.ui5-mp-item:hover{background-color:var(--sapList_Hover_Background)}.ui5-mp-item.ui5-mp-item--selected,.ui5-mp-item.ui5-mp-item--selected .ui5-dp-monthsectext{background-color:var(--_ui5-v1-18-0_monthpicker_item_selected_background_color);box-shadow:var(--_ui5-v1-18-0_monthpicker_item_selected_box_shadow);color:var(--_ui5-v1-18-0_monthpicker_item_selected_text_color);font-weight:var(--_ui5-v1-18-0_monthpicker_item_selected_font_wieght)}.ui5-mp-item.ui5-mp-item--disabled{opacity:.5;pointer-events:none}.ui5-mp-item.ui5-mp-item--selected:focus{background-color:var(--sapContent_Selected_Background)}.ui5-mp-item.ui5-mp-item--selected:focus:after{border-color:var(--_ui5-v1-18-0_monthpicker_item_focus_after_border)}.ui5-mp-item.ui5-mp-item--selected:hover{background-color:var(--_ui5-v1-18-0_monthpicker_item_selected_hover_color)}.ui5-mp-item:focus:after{border:var(--_ui5-v1-18-0_button_focused_border);border-radius:var(--_ui5-v1-18-0_monthpicker_item_focus_after_border_radius);content:\"\";inset:0;position:absolute}.ui5-mp-quarter{align-items:center;display:flex;justify-content:center;width:100%}"
  };
  var _default = styleData;
  _exports.default = _default;
});