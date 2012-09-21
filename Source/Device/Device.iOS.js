/*
---

name: Device.iOS

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.iOS

...
*/

Moobile.Simulator.Device['iOS'] = new Class({

	Extends: Moobile.Simulator.Device,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	glare: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	statusBar: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	statusBarTime: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	statusBarNetwork: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	statusBarBattery: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setup: function() {

		this.parent();

		this.require('iOS/styles.css');

		var wrapper = this.simulator.getWrapperElement();
		var content = this.simulator.getContentElement();

		this.glare = new Element('div.simulator-glare');
		this.glare.inject(wrapper, 'top');

		this.statusBar = new Element('div.simulator-status-bar');
		this.statusBarTime = new Element('div.simulator-status-bar-time');
		this.statusBarNetwork = new Element('div.simulator-status-bar-network');
		this.statusBarBattery = new Element('div.simulator-status-bar-battery');

		this.statusBar.inject(content, 'top');
		this.statusBarTime.inject(this.statusBar);
		this.statusBarNetwork.inject(this.statusBar);
		this.statusBarBattery.inject(this.statusBar);

		this.clock();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	teardown: function() {
		this.glare.destroy();
		this.glare = null;
		this.statusBar.destroy();
		this.statusBarTime = null;
		this.statusBarNetwork = null;
		this.statusBarBattery = null;
		this.parent();
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