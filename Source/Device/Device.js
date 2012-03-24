/*
---

name: Device

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Simulator

provides:
	- Device

...
*/

Moobile.Simulator.Device = new Class({

	Implements: [
		Events,
		Options,
		Class.Binds
	],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_simulator: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_resources: [],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	initialize: function(simulator) {
		this._simulator = simulator;
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	decorate: function(element, display, content, iframe) {
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	teardown: function() {
		this._resources.invoke('destroy');
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	loadCSS: function(file) {
		this._resources.push(Asset.css(Moobile.Simulator.getResourcePath() + '/' + file));
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	loadJS: function(file) {
		this._resources.push(Asset.javascript(Moobile.Simulator.getResourcePath() + '/' + file));
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	willChangeOrientation: function(orientation) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	willChangeOrientationAnimated: function(orientation) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	didChangeOrientation: function(orientation) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	didChangeOrientationAnimated: function(orientation) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	supportsOrientation: function(orientation) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	supportsPixelRatio: function(ratio) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	willChangePixelRatio: function(ratio) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	willChangePixelRatioAnimated: function(ratio) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	didChangePixelRatio: function(ratio) {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	didChangePixelRatioAnimated: function(ratio) {

	}

});

Moobile.Simulator.Device.create = function(name, simulator) {
	var device = Moobile.Simulator.Device[name];
	if (device) return new device(simulator);
	throw new Error('Device ' + name + ' does not exists.');
};
