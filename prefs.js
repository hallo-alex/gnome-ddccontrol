
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;
const Lang = imports.lang;
//const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Util = imports.misc.util;
const ExtensionUtils = imports.misc.extensionUtils;
const Convenience = Me.imports.lib.convenience;
const Utils = Me.imports.utilsss

// const Gettext = imports.gettext.domain('arch-update');
// const _ = Gettext.gettext;

let settings;

function init() {
	let settings=Convenience.getSettings();
	//Utils.initTranslations("arch-update");
}


function buildPrefsWidget(){

	let grid = new Gtk.Grid({
		margin: 10, row_spacing: 10, column_spacing: 20, column_homogeneous: false, row_homogeneous: true
		});
    // Prepare labels and controls
	let lblDev1 = new Gtk.Label({
		label: _("Device 1"),
		hexpand: true,
		halign: Gtk.Align.START
    });
  let txtDev1 = new Gtk.Entry();
	settings.bind('device1' , txtDev1 , 'text' , Gio.SettingsBindFlags.DEFAULT);

  let lblDev2 = new Gtk.Label({
		label: _("Device 2"),
		hexpand: true,
		halign: Gtk.Align.START
    });
  let txtDev2 = new Gtk.Entry();
	settings.bind('device1' , txtDev2 , 'text' , Gio.SettingsBindFlags.DEFAULT);



 grid.attach(lblDev1          , 1, 1, 1, 1);
 	grid.attach(txtDev1        , 1,2, 1, 1);
  grid.attach(lblDev2          , 2, 1, 1, 1);
   grid.attach(txtDev2        , 2, 2, 1, 1);
//
  grid.show_all();

	return grid;
	});
}
