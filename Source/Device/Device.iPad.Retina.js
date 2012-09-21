/*
---

name: Device.iPadRetina

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.iPadRetina

...
*/

Moobile.Simulator.Device['iPadRetina'] = new Class({

	Extends: Moobile.Simulator.Device['iPad'],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	iframe: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	decorate: function(element, display, content, iframe) {
		this.parent(element, display, content, iframe);
		this.require('iPadRetina/styles.css');
		this.setZoom('200%');
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
 	teardown: function() {
 		this.setZoom(null);
 		this.parent();
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getSize: function() {
		return {
			x: 1956,
			y: 2536
		};
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	didLoadApp: function() {
		this.parent();
		this.setZoom('200%');
	}

});
