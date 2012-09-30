/*
---

name: Device.iPhone

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.iPhone

...
*/

Moobile.Simulator.Device['iPhone'] = new Class({

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

		this.require('iPhone/styles.css');

		var payload = this.simulator.getIframeElement();
		var wrapper = this.simulator.getDeviceElement();

		this.safariBar = new Element('div.simulator-safari-bar');
		this.buttonBar = new Element('div.simulator-button-bar');
		this.safariBar.inject(payload, 'before');
		this.buttonBar.inject(payload, 'after');

		this.defineOption('safari-bar', 'Show Safari Navigation Bar', {
			active: false,
			enable:  function() { wrapper.addClass('with-safari-bar') },
			disable: function() { wrapper.removeClass('with-safari-bar') }
		});

		this.defineOption('tool-bar', 'Show Safari Toolbar', {
			active: false,
			enable:  function() { wrapper.addClass('with-button-bar') },
			disable: function() { wrapper.removeClass('with-button-bar') }
		});
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	teardown: function() {
		this.safariBar.destroy();
		this.safariBar = null;
		this.buttonBar.destroy();
		this.buttonBar = null;
		this.parent();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getSize: function() {
		return {
			x: 382,
			y: 744
		};
	}

});
