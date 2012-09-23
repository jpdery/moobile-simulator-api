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

		var payload = this.simulator.getPayloadElement();
		var content = this.simulator.getContentElement();

		this.safariBar = new Element('div.simulator-safari-bar');
		this.safariBar.inject(payload, 'after');

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
			x: 978,
			y: 1268
		};
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