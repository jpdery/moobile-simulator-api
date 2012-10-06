/*
---

name: Device.iPhone5

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.iPhone5

...
*/

Moobile.Simulator.Device['iPhone5'] = new Class({

	Extends: Moobile.Simulator.Device['iPhone4'],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setup: function() {
		this.parent();
		this.require('iPhone5/styles.css');
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getSize: function() {
		return {
			x: 382,
			y: 801
		};
	}

});
