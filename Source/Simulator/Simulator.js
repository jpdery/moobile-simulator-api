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
	 * @since  0.2
	 */
	_applicationPath: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_applicationLoaded: false,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_applicationWindow: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_device: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_deviceOrientation: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_deviceAnimating: false,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	wrapperElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	displayElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	contentElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	payloadElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	options: {
		device: 'iPhone',
		deviceOrientation: 'portrait',
		deviceOptions: {},
		container: null
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	initialize: function(options) {

		this.setOptions(options);

		document.body.addClass(Browser.name);

		var parent = document.id(this.options.container) || document.body;

		this.wrapperElement = new Element('div.simulator').inject(parent);
		this.displayElement = new Element('div.simulator-display').inject(this.wrapperElement);
		this.contentElement = new Element('div.simulator-content').inject(this.displayElement);
		this.payloadElement = new Element('iframe').inject(this.contentElement);
		this.payloadElement.set('scrolling', 'no');
		this.payloadElement.addEvent('load', this.bound('_onAppLoad'));

		this.setDevice(this.options.device);
		this.setDeviceOptions(this.options.deviceOptions);
		this.setDeviceOrientation(this.options.deviceOrientation);

		window.addEvent('appready', this.bound('_onAppReady'));

		Asset.css(Moobile.Simulator.getResource('simulator.css'));

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	destroy: function() {

		this.payloadElement = null;
		this.payloadElement.removeEvent('load', this.bound('_onAppLoad'));

		this.displayElement = null;
		this.contentElement = null;

		this.wrapperElement.destroy();
		this.wrapperElement = null;

		this._resources.invoke('destroy');
		this._resources = null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	execute: function(path) {

		if (this._applicationPath === path)
			return this;

		this._applicationPath = path;
		this._applicationLoaded = false;
		this._applicationWindow = null;

		this.payloadElement.set('src', path + '?' + String.uniqueID());

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDevice: function(name, animated) {

		if (this._deviceAnimating || this._deviceName === name)
			return this;

		var apply = function() {

			if (this._device) {
				this._device.teardown();
				this._device = null;
				this._deviceName = null;
			}

			if (name) {

				var device = Moobile.Simulator.Device[name];
				if (device == undefined) {
					throw new Error('Device ' + name + ' does not exists.');
				}

				this._device = new device(this);
				this._device.setup();
				this._deviceName = name;

				var size = this._device.getSize();
				this.wrapperElement.setStyle('height', size.y);
				this.wrapperElement.setStyle('width', size.x);

				if (this._applicationLoaded) {
					this._device.applicationDidLoad();
					this._device.applicationDidStart();
				}

				this.fireEvent('devicechange', this._device);
			}

			return this;

		}.bind(this);

		if (animated) {

			var onBackgroundAnimationEnd = function() {
				apply();
				this.wrapperElement.removeEvent('animationend', onBackgroundAnimationEnd);
				this.wrapperElement.removeClass('show-device');
				this.wrapperElement.addEvent('animationend', onForegroundAnimationEnd);
				this.wrapperElement.addClass('hide-device');
			}.bind(this);

			var onForegroundAnimationEnd = function() {
				this.wrapperElement.removeEvent('animationend', onForegroundAnimationEnd);
				this.wrapperElement.removeClass('hide-device');
			}.bind(this);

			this.wrapperElement.addEvent('animationend', onBackgroundAnimationEnd);
			this.wrapperElement.addClass('show-device');

			return this;
		}

		return apply();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceName: function() {
		return this._deviceName;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceSize: function() {
		return this._device.getSize();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setDeviceOptions: function(options) {

		if (this._device) {
			Object.each(options, this.setDeviceOption, this);
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceOptions: function() {

		if (this._device) {
			return this._device.getOptions();
		}

		return null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setDeviceOption: function(id, active) {

		if (this._device) {
			this._device.setOption(id, active);
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceOption: function(id) {

		if (this._device) {
			return this._device.getOption(id);
		}

		return null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceOrientation: function(orientation, animated) {

		if (this._deviceAnimating || this._deviceOrientation === orientation)
			return this;

		var apply = function() {

			this._deviceOrientation = orientation;

			this.wrapperElement.removeClass('portrait');
			this.wrapperElement.removeClass('landscape');
			this.wrapperElement.addClass(orientation);

			if (this._applicationWindow) {
				this._applicationWindow.orientation     = orientation === 'portrait' ? 0 : 90;
				this._applicationWindow.orientationName = orientation;
				this._applicationWindow.fireEvent('rotate', orientation);
			}

			this.fireEvent('deviceorientationchange', orientation);

			return this;

		}.bind(this);

		if (animated) {

			var onWrapperRotationEnd = function(e) {
				if (e.target !== this.wrapperElement) return;
				apply();
			}.bind(this);

			var onContentRotationEnd = function(e) {
				if (e.target !== this.contentElement) return;
				this.contentElement.removeEvent('animationend', onContentRotationEnd)
				this.wrapperElement.removeEvent('animationend', onWrapperRotationEnd);
				this.wrapperElement.removeClass('rotate-portrait');
				this.wrapperElement.removeClass('rotate-landscape');
			}.bind(this);

			this.contentElement.addEvent('animationend', onContentRotationEnd);
			this.wrapperElement.addEvent('animationend', onWrapperRotationEnd);

			switch (this._deviceOrientation) {
				case 'portrait': this.wrapperElement.addClass('rotate-landscape'); break;
				case 'landscape': this.wrapperElement.addClass('rotate-portrait'); break;
			}

			return this;
		}

		return apply();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getDeviceOrientation: function() {
		return this._deviceOrientation;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getApplicationPath: function() {
		return this._applicationPath;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getApplicationWindow: function() {
		return this._applicationWindow;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getWrapperElement: function() {
		return this.wrapperElement;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDisplayElement: function() {
		return this.displayElement;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getContentElement: function() {
		return this.contentElement;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getPayloadElement: function() {
		return this.payloadElement;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_onAppLoad: function() {
		if (this._applicationLoaded === false) {
			this._applicationLoaded = true;
			this._applicationWindow = this.payloadElement.contentWindow;
			this._device.applicationDidLoad();
		}
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_onAppReady: function() {

		if (this._applicationWindow === null) {
			this._applicationWindow = this.payloadElement.contentWindow;
		}

		this._applicationWindow.orientation     = this._deviceOrientation === 'portrait' ? 0 : 90;
		this._applicationWindow.orientationName = this._deviceOrientation;
		this._device.applicationDidStart();
	}

});

(function() {

var resourcePath = '.';

Moobile.Simulator.setResourcePath = function(path) {
	resourcePath = path.replace(/[/\\]+$/, '');
};

Moobile.Simulator.getResourcePath = function() {
	return resourcePath;
};

Moobile.Simulator.getResource = function(file) {
	return resourcePath + '/' + file;
}

})();