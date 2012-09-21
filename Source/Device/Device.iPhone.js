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

		var payload = this.simulator.getPayloadElement();
		var wrapper = this.simulator.getWrapperElement();

		this.safariBar = new Element('div.simulator-safari-bar');
		this.buttonBar = new Element('div.simulator-button-bar');
		this.safariBar.inject(payload, 'before');
		this.buttonBar.inject(payload, 'after');

		this.defineOption('safari-bar', 'Navigation Bar', {
			active: false,
			enable:  function() { wrapper.addClass('with-safari-bar') },
			disable: function() { wrapper.removeClass('with-safari-bar') }
		});

		this.defineOption('tool-bar', 'Tool Bar', {
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
		return {x: 0, y: 0};
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	clock: function() {

		var time = new Date()
		var hh = time.getHours()
		var mm = time.getMinutes()
		var am = "AM";
		if (hh >= 12) {
			hh = hh - 12;
			am = "PM";
		}
		if (hh == 0) {
			hh = 12;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}

		if (this.statusBar) {
			this.statusBar.getElement('.simulator-status-bar-time').set('html', hh + ":" + mm + " " + am);
			this.clock.delay(5000, this);
		}
	}

});
