/*
---

name: Animation

description: Provides a wrapper for a CSS animation.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:

provides:
	- Animation

...
*/

if (!window.Moobile) window.Moobile = {};

/**
 * @see    http://moobilejs.com/doc/latest/Animation/Animation
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @since  0.1.0
 */
var Animation = new Class({

	Implements: [
		Events,
		Options,
		Class.Binds
	],

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	_name: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	_running: false,

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#element
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	element: null,

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#animationClass
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	animationClass: null,

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#animationProperties
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	animationProperties: {
		'name': null,
		'duration': null,
		'iteration-count': null,
		'animation-direction': null,
		'animation-timing-function': null,
		'animation-fill-mode': null,
		'animation-delay': null
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#initialize
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	initialize: function(element, options) {
		this.setElement(element);
		this.setOptions(options);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setName
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setName: function(name) {
		this._name = name;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getName
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getName: function() {
		return this._name;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setElement
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setElement: function(element) {
		this.element = document.id(element);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getElement
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getElement: function() {
		return this.element;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationClass
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationClass: function(value) {
		this.animationClass = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationClass
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationClass: function() {
		return this.animationClass;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationName
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationName: function(value) {
		this.animationProperties['name'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationName
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationName: function() {
		return this.animationProperties['name'];
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationDuration
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDuration: function(value) {
		this.animationProperties['duration'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationDuration
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDuration: function() {
		return this.animationProperties['duration'];
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationIterationCount
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationIterationCount: function(value) {
		this.animationProperties['iteration-count'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationIterationCount
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationIterationCount: function() {
		return this.animationProperties['iteration-count'];
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationDirection
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDirection: function(value) {
		this.animationProperties['direction'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationDirection
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDirection: function() {
		return this.animationProperties['direction'];
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationTimingFunction
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationTimingFunction: function(value) {
		this.animationProperties['timing-function'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationTimingFunction
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationTimingFunction: function() {
		return this.animationProperties['timing-function'];
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationFillMode
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationFillMode: function(value) {
		this.animationProperties['fill-mode'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationFillMode
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationFillMode: function() {
		return this.animationProperties['fill-mode'];
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#setAnimationDelay
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDelay: function(value) {
		this.animationProperties['delay'] = value;
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#getAnimationDelay
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDelay: function() {
		return this.animationProperties['delay'];
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	attach: function() {

		this.element.addEvent('animationend', this.bound('onAnimationEnd'));
		this.element.addClass(this.animationClass);

		Object.each(this.animationProperties, function(val, key) {
			this.element.setStyle('-webkit-animation-' + key, val);
		}, this);

		return this;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	detach: function() {

		this.element.removeEvent('animationend', this.bound('onAnimationEnd'));
		this.element.removeClass(this.animationClass);

		Object.each(this.animationProperties, function(val, key) {
			this.element.setStyle('-webkit-animation-' + key, null);
		}, this);

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#start
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	start: function() {

		if (this._running)
			return this;


		this._running = true;
		this.fireEvent('start');
		this.attach();

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#stop
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	stop: function() {

		if (this._running === false)
			return this;

		this._running = false;
		this.detach();
		this.fireEvent('stop');

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation#isRunning
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	isRunning: function() {
		return this._running;
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationEnd: function(e) {

		if (this._running === false)
			return;

		if (this.element !== e.target)
			return;

		e.stop();

		this._running = false;
		this.detach();
		this.fireEvent('end');
	}

});
