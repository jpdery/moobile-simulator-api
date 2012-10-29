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

	Extends: Moobile.Simulator.Device['iOS'],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	safariBar: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	buttonBar: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setup: function() {

		this.parent();

		this.require('iPad/styles.css');

		var payload = this.simulator.getIframeElement();
		var wrapper = this.simulator.getDeviceElement();

		this.safariBar = new Element('div.simulator-safari-bar');
		this.safariBar.inject(payload, 'before');

		this.defineOption('safari-bar', 'Show Navigation Bar', {
			active: false,
			enable:  function() { wrapper.addClass('with-safari-bar'); },
			disable: function() { wrapper.removeClass('with-safari-bar'); }
		});
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	teardown: function() {
		this.safariBar.destroy();
		this.safariBar = null;
		this.parent();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getSize: function() {
		return {
			x: 966,
			y: 1256
		};
	}

});