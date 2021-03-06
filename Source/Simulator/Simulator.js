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
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	applicationPath: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	applicationWindow: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	device: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	deviceName: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	deviceOrientation: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	deviceAnimating: false,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	deviceElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	facadeElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	screenElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	iframeElement: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	options: {
		container: document.body
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	initialize: function(options) {
		this.setOptions(options);
		this.build();
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	build: function() {

		Asset.css(Moobile.Simulator.getResource('simulator.css'));

		this.deviceElement = new Element('div.simulator').inject(this.options.container);
		this.facadeElement = new Element('div.simulator-facade').inject(this.deviceElement);
		this.screenElement = new Element('div.simulator-screen').inject(this.facadeElement);
		this.iframeElement = new Element('iframe[scrolling=no]').inject(this.screenElement);

		this.iframeElement.addEvent('load', this.bound('_onApplicationLoad'));

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	destroy: function() {

		this.iframeElement.removeEvent('load', this.bound('_onApplicationLoad'));
		this.iframeElement = null;

		this.deviceElement.destroy();
		this.deviceElement = null;
		this.facadeElement = null;
		this.screenElement = null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceAnimated: function(name) {

		if (this.deviceAnimating || this.deviceName === name)
			return this;

		var onPlay = function(anim) {
			if (anim === '2') this.setDevice(name);
		}.bind(this);

		var animation = this._createAnimationList();
		animation.setAnimation('1', new Animation(this.deviceElement).setAnimationClass('hide-device'));
		animation.setAnimation('2', new Animation(this.deviceElement).setAnimationClass('show-device'));
		animation.addEvent('play', onPlay);
		animation.start();

		this.fireEvent('beforedevicechange', name);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setDevice: function(name) {

		if (this.deviceName === name)
			return this;

		if (this.device) {
			this.device.teardown();
			this.device = null;
		}

		var device = Moobile.Simulator.Device[name] || Moobile.Simulator.Device['iPhone5'];

		this.device = new device(this);
		this.deviceElement.setStyle('height', this.device.getSize().y);
		this.deviceElement.setStyle('width', this.device.getSize().x);
		this.device.setup();

		this.deviceName = name;

		this.fireEvent('devicechange', name);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceOrientationAnimated: function(orientation) {

		if (this.deviceAnimating || this.deviceOrientation === orientation)
			return this;

		var onPlay = function(name) {
			if (name === '2') this.setDeviceOrientation(orientation);
		}.bind(this)

		var animation = this._createAnimationList();

		switch (orientation) {
			case 'portrait':
				animation.setAnimation('1', new Animation(this.deviceElement).setAnimationClass('rotate-device-portrait'));
				animation.setAnimation('2', new Animation(this.screenElement).setAnimationClass('rotate-screen-portrait'));
				break;
			case 'landscape':
				animation.setAnimation('1', new Animation(this.deviceElement).setAnimationClass('rotate-device-landscape'));
				animation.setAnimation('2', new Animation(this.screenElement).setAnimationClass('rotate-screen-landscape'));
				break;
		}

		animation.addEvent('play', onPlay);
		animation.start();

		this.fireEvent('beforedeviceorientationchange', orientation);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setDeviceOrientation: function(orientation) {

		if (this.deviceOrientation === orientation)
			return this;

		this.deviceOrientation = orientation;

		this.deviceElement.removeClass('portrait');
		this.deviceElement.removeClass('landscape');
		this.deviceElement.addClass(orientation);

		if (this.applicationWindow) {
			this.applicationWindow.orientation = orientation === 'portrait' ? 0 : 90;
			this.applicationWindow.orientationName = orientation;
			this.applicationWindow.fireEvent('orientationchange');
		}

		this.fireEvent('deviceorientationchange', orientation);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	getDeviceOrientation: function() {
		return this.deviceOrientation;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceName: function() {
		return this.deviceName;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceSize: function() {
		return this.device.getSize();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setDeviceOptions: function(options) {

		if (this.device === null)
			return this;

		Object.each(options, function(value, option) {
			this.setDeviceOption(option, value);
		}, this);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceOptions: function() {
		return this.device ? this.device.getOptions() : null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	setDeviceOption: function(option, value) {

		if (this.device == null)
			return this;

		var current = this.device.getOption(option);
		if (current === value)
			return this;

		this.device.setOption(option, value);

		this.fireEvent('deviceoptionchange', [option, value]);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceOption: function(option) {
		return this.device ? this.device.getOption(option) : null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setApplication: function(path) {

		if (this.applicationPath === path)
			return this;

		this.applicationPath = path;
		this.applicationWindow = null;
		this.iframeElement.set('src', path + '?' + String.uniqueID());

		this.fireEvent('deviceapplicationchange', path);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getApplicationPath: function() {
		return this.applicationPath;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getApplicationWindow: function() {
		return this.applicationWindow;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getDeviceElement: function() {
		return this.deviceElement;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getFacadeElement: function() {
		return this.facadeElement;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getScreenElement: function() {
		return this.screenElement;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	getIframeElement: function() {
		return this.iframeElement;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_createAnimationList: function() {
		var list = new Animation.List();
		list.addEvent('start', this.bound('_onDeviceAnimationStart'));
		list.addEvent('end', this.bound('_onDeviceAnimationEnd'));
		return list;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_onDeviceAnimationStart: function() {
		this.deviceAnimating = true;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_onDeviceAnimationEnd: function() {
		this.deviceAnimating = false;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_onApplicationLoad: function() {
		this.applicationWindow = this.iframeElement.contentWindow;
		this.applicationWindow.orientation = this.deviceOrientation === 'portrait' ? 0 : 90;
		this.applicationWindow.orientationName = this.deviceOrientation;
		this.device.applicationDidLoad();
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