// Preferências — GNOME Shell 43–44 (imports antigos).
const {Adw, Gtk, Gio, GLib} = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

function init() {}

function fillPreferencesWindow(window) {
    Me.imports.prefsCore.buildPrefs(
        {Adw, Gtk, Gio}, window, ExtensionUtils.getSettings(), Me.imports.i18n.makeTr(GLib));
}
