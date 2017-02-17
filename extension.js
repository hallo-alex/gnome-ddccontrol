const Clutter = imports.gi.Clutter;
const Lang = imports.lang;
const St = imports.gi.St;
const Gtk = imports.gi.Gtk;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.lib.convenience;
const Slider = imports.ui.slider;

let varDdcControlIndicator, initBrightness, device1, address1, device2, address2;
let _onDdcControlIndicatorScrollEventId;

function init() {
	let settings=Convenience.getSettings();
	initBrightness=settings.get_int("init-brightness")
	device1=settings.get_string("device1")
	address1=settings.get_string("brightness-address1")
	device2=settings.get_string("device2")
	address2=settings.get_string("brightness-address2")
	//setBrightness(initBrightness);
}

function sliderChanged(slider, value, property) {
		let val = Math.floor(1 + value*99);
	    setBrightness(val)
}

function setBrightness (value) {
	Util.spawn(['ddccontrol', device1, "-r", address1, "-w" + value]);
	Util.spawn(['ddccontrol', device2, "-r", address2, "-w" + value]);
}

const DdcControlIndicator = new Lang.Class({

	Name: 'DdcControlIndicator',
	Extends: PanelMenu.Button,
	_TimeoutId: null,
	_FirstTimeoutId: null,
//	_onEvent:  function() {
	// 	switch (e.get_scroll_direction()) {
	// 	case Clutter.ScrollDirection.UP:
	// 			Slider.set_value(Slider.get_value()-10);
	// 		case Clutter.ScrollDirection.DOWN:
	// //			SlideDown
	// 		default:
	//
	// 	}
//	}
	_init: function() {
		log("init");
		this.parent(0.0, "DdcControlIndicator");
		Gtk.IconTheme.get_default().append_search_path(Me.dir.get_child('icons').get_path());

		// Create the button in status bar

		let box = new St.BoxLayout({ vertical: false, style_class: 'panel-status-menu-box' });
		let label = new St.Label({ text: '', y_expand: true, y_align: Clutter.ActorAlign.CENTER });
		let icon = new St.Icon({icon_name: "icon2", style_class: 'system-status-icon'});

		box.add_child(icon);
		box.add_child(label);
		this.actor.add_child(box);

		// Create the menu

		let panelSlider = new PopupMenu.PopupBaseMenuItem();
		let slider = new Slider.Slider(initBrightness/100);
		let icon2 = new St.Icon({icon_name: "icon2", style_class: 'popup-menu-icon'});

	    panelSlider.actor.add(icon2);
	    panelSlider.actor.add(slider.actor, { expand: true });

		//let settingsMenuItem = new PopupMenu.PopupMenuItem(_('Settings'));

		this.menu.addMenuItem(panelSlider);
		// this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
		// this.menu.addMenuItem(settingsMenuItem);


		// Events

		slider.connect('value-changed', sliderChanged);
	//	settingsMenuItem.connect('activate', Lang.bind(this, this._openSettings));
	},

	_openSettings: function () {
		Util.spawn([ "gnome-shell-extension-prefs", Me.uuid ]);
	},

});

function enable() {
	varDdcControlIndicator = new DdcControlIndicator();
	Main.panel.addToStatusArea('DdcControlIndicator', varDdcControlIndicator);


}

function disable() {

	varDdcControlIndicator.destroy();

}
