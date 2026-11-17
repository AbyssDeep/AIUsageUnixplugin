// GNOME Shell 45+ (módulos ES).
import GObject from 'gi://GObject';
import St from 'gi://St';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Soup from 'gi://Soup?version=3.0';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

import * as I18n from './i18n.js';
import {Controller} from './core.js';

export default class AIUsageMeterExtension extends Extension {
    enable() {
        this._controller = new Controller(
            {GObject, St, Clutter, GLib, Gio, Soup, Main, PanelMenu, PopupMenu, I18n},
            {
                settings: this.getSettings(),
                path: this.path,
                uuid: this.uuid,
                openPrefs: () => this.openPreferences(),
            });
        this._controller.enable();
    }

    disable() {
        this._controller?.disable();
        this._controller = null;
    }
}
