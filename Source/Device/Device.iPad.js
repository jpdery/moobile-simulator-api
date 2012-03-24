/*
---

name: Device.iPad

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device.iPhone

provides:
	- Device.iPad

...
*/

Moobile.Simulator.Device['iPad'] = new Class({

	Extends: Moobile.Simulator.Device.iPhone,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	decorate: function(element, display, content, iframe) {
		this.parent(element, display, content, iframe);
		this.loadCSS('iPad/styles.css');
	}

});