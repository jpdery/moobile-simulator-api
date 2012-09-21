/*
---

name: Device.iPhoneRetina

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.iPhoneRetina

...
*/

Moobile.Simulator.Device['iPhone-Retina'] = new Class({

	Extends: Moobile.Simulator.Device['iPhone'],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setup: function() {
		this.parent();
		this.require('iPhone-Retina/styles.css');
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
 	teardown: function() {

 		var applicationWindow = this.simulator.getApplicationWindow();
 		if (applicationWindow) {
 			applicationWindow.document.body.style.zoom = null;
 		}

 		this.parent();
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getSize: function() {
		return {
			x: 764,
			y: 1488
		};
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	applicationDidStart: function() {

		this.parent();

 		var applicationWindow = this.simulator.getApplicationWindow();
 		if (applicationWindow) {
 			applicationWindow.document.body.style.zoom = '200%';
 		}
	}

});
