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

		document.body.addClass(Browser.name);
		document.body.addClass(Browser.name + '-' + Browser.version);

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

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	destroy: function() {
		this.deviceElement.destroy();
		this.deviceElement = null;
		this.facadeElement = null;
		this.screenElement = null;
		this.iframeElement = null;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	setDeviceAnimated: function(name) {

		if (this.deviceAnimating || this.deviceName === name)
			return this;

		var onPlay = function(animation) {
			if (animation.getName() === '2') this.setDevice(name);
		}.bind(this);

		var anim = new Animation.List();
		anim.addEvent('play', onPlay);
		anim.addEvent('start', this.bound('_onDeviceAnimationStart'));
		anim.addEvent('end', this.bound('_onDeviceAnimationEnd'));
		anim.setAnimation('1', new Animation(this.deviceElement).setAnimationClass('hide-device'));
		anim.setAnimation('2', new Animation(this.deviceElement).setAnimationClass('show-device'));
		anim.start();

		return this;
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

		var device = Moobile.Simulator.Device[name];
		if (device === undefined) {
			throw new Error('Device ' + name + ' does not exists.');
		}

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

		var onPlay = function(animation) {
			if (animation.getName() === '2') this.setDeviceOrientation(orientation);
		}.bind(this);

		var anim = new Animation.List();
		anim.addEvent('play', onPlay);
		anim.addEvent('start', this.bound('_onDeviceAnimationStart'));
		anim.addEvent('end', this.bound('_onDeviceAnimationEnd'));

		switch (orientation) {

			case 'portrait':
				anim.setAnimation('1', new Animation(this.deviceElement).setAnimationClass('rotate-device-portrait'));
				anim.setAnimation('2', new Animation(this.screenElement).setAnimationClass('rotate-screen-portrait'));
				break;

			case 'landscape':
				anim.setAnimation('1', new Animation(this.deviceElement).setAnimationClass('rotate-device-landscape'));
				anim.setAnimation('2', new Animation(this.screenElement).setAnimationClass('rotate-screen-landscape'));
				break;
		}

		anim.start();

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
		this.applicationLoaded = false;
		this.applicationWindow = null;

		this.iframeElement.set('src', path + '?' + String.uniqueID());

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
	_onAppLoad: function() {
		if (this.applicationLoaded === false) {
			this.applicationLoaded = true;
			this.applicationWindow = this.iframeElement.contentWindow;
			this.device.applicationDidLoad();
		}
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.2
	 */
	_onAppReady: function() {

		if (this.applicationWindow === null) {
			this.applicationWindow = this.iframeElement.contentWindow;
		}

		this.applicationWindow.orientation     = this.deviceOrientation === 'portrait' ? 0 : 90;
		this.applicationWindow.orientationName = this.deviceOrientation;
		this.device.applicationDidStart();
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