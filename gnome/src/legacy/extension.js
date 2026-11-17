// GNOME Shell 43–44 (imports antigos). Zorin OS 17 usa esta versão.
imports.gi.versions.Soup = '3.0';
const {GObject, St, Clutter, GLib, Gio, Soup} = imports.gi;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

class AIUsageMeterExtension {
    enable() {
        this._controller = new Me.imports.core.Controller(
            {GObject, St, Clutter, GLib, Gio, Soup, Main, PanelMenu, PopupMenu, I18n: Me.imports.i18n},
            {
                settings: ExtensionUtils.getSettings(),
                path: Me.path,
                uuid: Me.metadata.uuid,
                openPrefs: () => ExtensionUtils.openPrefs(),
            });
        this._controller.enable();
    }

    disable() {
        if (this._controller)
            this._controller.disable();
        this._controller = null;
    }
}

function init() {
    return new AIUsageMeterExtension();
}
