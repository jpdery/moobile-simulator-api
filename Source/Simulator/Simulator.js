/*
---

name: Simulator

description: Creates a simulated device.

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Events.CSS3
	- Element.Style.Vendor
	- Class-Extras/Class.Binds

provides:
	- Simulator

...
*/

if (!window.Moobile)           window.Moobile = {};
if (!window.Moobile.Simulator) window.Moobile.Simulator = {};

Moobile.Simulator = new Class({

	Implements: [
		Events,
		Options,
		Class.Binds
	],

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_device: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_deviceOrientation: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_devicePixelRatio: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	applicationPath: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	applicationWindow: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	wrapper: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	element: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	display: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	content: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	iframe: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	options: {
		deviceOrientation: 'portrait',
		devicePixelRatio: 1,
		container: null,
		animationDuration: '350ms',
		animationTimingFunction: 'cubic-bezier(0.5, 0.1, 0.5, 1.0)'
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	initialize: function(device, options) {

		this.setOptions(options);

		this.wrapper = document.id(this.options.container) || document.body;

		this.element =
			new Element('div.simulator').adopt([
				new Element('div.simulator-display').adopt([
					new Element('div.simulator-content').adopt([
						new Element('iframe')
					])
				])
			]).inject(this.wrapper);

		this.display = this.element.getElement('div.simulator-display');
		this.content = this.element.getElement('div.simulator-content');
		this.iframe  = this.element.getElement('div.simulator-content iframe');

		this.setDevice(device);
		this.setDeviceOrientation(this.options.deviceOrientation);

		window.addEvent('appready', this.bound('_onApplicationReady'));

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDevice: function(name) {
		this._freeDevice();
		this._loadDevice(name);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceAnimated: function(name) {

		var animationEnd = function() {
			this._freeDevice();
			this._loadDevice(name);
			this._animate('transform', [
				'scale(0) rotateZ(90deg)',
				'scale(1) rotateZ(0deg)'
			]);
		}.bind(this);

		if (this._device) {
			this._animate('transform', [
				'scale(1) rotateZ(0deg)',
				'scale(0) rotateZ(90deg)'
			], animationEnd);
			return this;
		}

		animationEnd();

		return this;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_loadDevice: function(name) {

		this._device = Moobile.Simulator.Device.create(name, this);
		this._device.decorate(
			this.element,
			this.display,
			this.content,
			this.iframe
		);

		return this;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_freeDevice: function() {

		if (this._device) {
			this._device.teardown();
			this._device = null;
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getDevice: function() {
		return this._device;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceOrientation: function(orientation) {

		if (this._deviceOrientation === orientation)
			return this;

		if (this._device.supportsOrientation(orientation)) {
			this._device.willChangeOrientation(orientation);
			this._applyDeviceOrientation(orientation);
			this._device.didChangeOrientation(orientation);
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceOrientationAnimated: function(orientation) {

		if (this._deviceOrientation === orientation)
			return this;

		if (this._device.supportsOrientation(orientation)) {

			var animationEnd = function() {
				this._device.didChangeOrientation(orientation);
			}.bind(this);

			this._device.willChangeOrientationAnimated(orientation);
			this._animate(animationEnd);
			this._applyDeviceOrientation(orientation);
		}

		return this;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_applyDeviceOrientation: function(orientation) {

		this._deviceOrientation = orientation;

		(function() {

			this.element.removeClass('portrait');
			this.element.removeClass('landscape');
			this.element.addClass(orientation);

			switch (orientation) {
				case 'portrait':
					this.element.setStyle('transform', 'rotate(0deg)');
					this.content.setStyle('transform', 'rotate(0deg)');
					break;
				case 'landscape':
					this.element.setStyle('transform', 'rotate(90deg)');
					this.content.setStyle('transform', 'rotate(-90deg)');
					break;
			}

			if (this.applicationWindow) {
				this.applicationWindow.orientation = orientation === 'portrait' ? 0 : 90;
				this.applicationWindow.orientationName = orientation;
				this.applicationWindow.fireEvent('rotate', orientation);
			}

		}).delay(5, this);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getDeviceOrientation: function() {
		// TODO
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDevicePixelRatio: function() {
		// TODO
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_applyPixelRatio: function(ratio) {
		// TODO
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDevicePixelRatioAnimated: function() {
		// TODO
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getDevicePixelRatio: function() {
		// TODO
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_animate: function(style, value, callback) {

		var styles = null;

		switch (typeof style) {
			case 'string':
				styles[style] = value;
				break;
			case 'function':
				callback = style;
				break;
			case 'object':
				callback = value;
				break;
		}

		var f = {};
		var t = {};
		Object.each(styles, function(key, val) {
			val = Array.from(val);
			if (val.length == 2) {
				f[key] = val[0];
				t[key] = val[1];
			} else {
				t[key] = val[0];
			}
		});

		this.element.setStyles(f);

		(function() {

			this.element.setStyle('transition-property', 'all');
			this.element.setStyle('transition-duration', this.options.animationDuration);
			this.element.setStyle('transition-timing-function', this.options.animationTimingFunction);
			this.element.addEvent('transitionend', function(e) {
				this.element.setStyle('transition-property', null);
				this.element.setStyle('transition-duration', null);
				this.element.setStyle('transition-timing-function', null);
				if (callback) callback();
			}.bind(this));

			this.element.setStyles(t);

		}).delay(5, this);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setApplication: function(path) {

		if (this.applicationPath === path)
			return this;

		this.applicationPath = path;
		this.iframe.set('src', path);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	_onApplicationReady: function() {
		console.log('TEST');
		this.applicationWindow = this.iframe.contentWindow;
		this.applicationWindow.orientation = this._deviceOrientation === 'portrait' ? 0 : 90;
		this.applicationWindow.orientationName = this._deviceOrientation;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getElement: function() {
		return this.element;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	toElement: function() {
		return this.getElement();
	}

});

(function() {

Moobile.Simulator.Animated = true;

var resourcePath = '.';

Moobile.Simulator.setResourcePath = function(path) {
	resourcePath = path.replace(/[/\\]+$/, '');
};

Moobile.Simulator.getResourcePath = function() {
	return resourcePath;
};

var instances = [];

Moobile.Simulator.create = function(device, app, options) {
	var simulator = new Moobile.Simulator(device, options).setApplication(app);
	instances.push(simulator);
	return simulator;
};

Moobile.Simulator.getInstances = function() {
	return instances;
};

Moobile.Simulator.getCurrentInstance = function() {
	return instances[instances.length - 1];
};

})();