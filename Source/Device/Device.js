/*
---

name: Device

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Simulator

provides:
	- Device

...
*/

Moobile.Simulator.Device = new Class({

	Implements: [
		Class.Binds
	],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	simulator: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	resources: [],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	options: {},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @eduted 0.2
	 * @since  0.2
	 */
	initialize: function(simulator) {
		this.simulator = simulator;
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setup: function() {
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @eduted 0.2
	 * @since  0.2
	 */
	teardown: function() {

		Object.each(this.options, function(option) {
			option.disable.call(this);
		});

		this.options = null;

		this.simulator = null;
		this.resources.invoke('destroy');
		this.resource = null;
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	require: function(file) {

		file = Moobile.Simulator.getResource(file);

		var extension = file.split('.').pop();
		if (extension === null)
			return this;

		var load = null;
		switch (extension) {
			case 'js':  load = Asset.js; break;
			case 'css': load = Asset.css; break;
		}

		this.resources.push(load(file));

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getSize: function() {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getName: function() {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	applicationDidLoad: function() {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	applicationDidStart: function() {

	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	defineOption: function(id, title, options) {

		this.options[id] = {
			title: title,
			active: options.active || false,
			enable: options.enable || function(){},
			disable: options.disable || function(){}
		};

		if (this.options[id].active) {
			this.options[id].enable.call(this);
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setOption: function(id, active) {

		if (active === undefined) {
			active = true;
		}

		var option = this.options[id];
		if (option) {
			option.active = active;
			if (active) option.enable.call(this)
			else        option.disable.call(this);
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getOptions: function() {
		return this.options;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getOption: function(id) {
		return this.options[id] || null;
	}

});

Moobile.Simulator.Device.create = function(name, simulator) {

};
