/*
---

name: Device.GalaxyS3

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.GalaxyS3

...
*/

Moobile.Simulator.Device['GalaxyS3'] = new Class({

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
	 * @since  0.1
	 */
	setup: function() {

		this.parent();

		this.require('GalaxyS3/styles.css');

		var wrapper = this.simulator.getDeviceElement();
		var content = this.simulator.getScreenElement();

		this.glare = new Element('div.simulator-glare');
		this.glare.inject(wrapper, 'top');

		this.statusBar = new Element('div.simulator-status-bar');
		this.statusBar.inject(content, 'top');

		this.defineOption('glare', 'Show Screen Glare', {
			active: true,
			enable:  function() { wrapper.removeClass('without-glare') },
			disable: function() { wrapper.addClass('without-glare') }
		});
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	teardown: function() {
		this.glare.destroy();
		this.glare = null;
		this.statusBar.destroy();
		this.statusBar = null;
		this.parent();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getSize: function() {
		return {
			x: 418,
			y: 812
		};
	}

});