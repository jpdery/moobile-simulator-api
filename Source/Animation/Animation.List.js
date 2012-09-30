/*
---

name: Animation.List

description: Provides a container for multiple animations.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Animation

provides:
	- Animation.List

...
*/

/**
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @since  0.1.0
 */
Animation.List = new Class({

	Extends: Animation,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	element: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	animations: [],

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	currentAnimationIndex: -1,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	initialize: function(element, options) {
		this.parent(element, options);
		delete this.animationClass;
		delete this.animationProperties;
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimation: function(name, animation) {

		animation.setName(name);
		animation.setOptions(this.options);

		animation.addEvent('start', this.bound('onAnimationStart'));
		animation.addEvent('stop', this.bound('onAnimationStop'));
		animation.addEvent('end', this.bound('onAnimationEnd'));

		this.animations.include(animation);

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimation: function(name) {
		return this.animations.find(function(animation) {
			return animation.getName() === name;
		});
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	removeAnimation: function(name) {

		var animation = this.getAnimation(name);
		if (animation) {
			animation.cancel();
			animation.removeEvent('start', this.bound('onAnimationStart'));
			animation.removeEvent('stop', this.bound('onAnimationStop'));
			animation.removeEvent('end', this.bound('onAnimationEnd'));
			this.animations.erase(animation);
		}

		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setElement: function(element) {
		this.element = document.id(element);
		this.animations.invoke('setElement', this.element);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getElement: function() {
		return this.animations.invoke('getElement');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationClass: function(value) {
		this.animations.invoke('setAnimationClass', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationClass: function() {
		return this.animations.invoke('getAnimationClass');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationName: function(value) {
		this.animations.invoke('setAnimationName', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationName: function() {
		return this.animations.invoke('getAnimationName');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDuration: function(value) {
		this.animations.invoke('setAnimationDuration', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDuration: function() {
		return this.animations.invoke('getAnimationDuration');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationIterationCount: function(value) {
		this.animations.invoke('setAnimationIterationCount', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationIterationCount: function() {
		return this.animations.invoke('getAnimationIterationCount');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDirection: function(value) {
		this.animations.invoke('setAnimationDirection', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDirection: function() {
		return this.animations.invoke('getAnimationDirection');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationTimingFunction: function(value) {
		this.animations.invoke('setAnimationTimingFunction', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationTimingFunction: function() {
		return this.animations.invoke('getAnimationTimingFunction');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationFillMode: function(value) {
		this.animations.invoke('setAnimationFillMode', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationFillMode: function() {
		return this.animations.invoke('getAnimationFillMode');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDelay: function(value) {
		this.animations.invoke('setAnimationDelay', value);
		return this;
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDelay: function() {
		return this.animations.invoke('getAnimationDelay');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	start: function() {

		this.currentAnimationIndex = 0;

		var animation = this.animations[this.currentAnimationIndex];
		if (animation) {
			animation.start();
		}

		this.fireEvent('start');

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#stop
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	stop: function() {

		var animation = this.animations[this.currentAnimationIndex];
		if (animation) {
			animation.stop();
		}

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#isRunning
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	isRunning: function() {
		return this.animations.some(function(animation) {
			return animation.isRunning();
		});
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationStart: function() {
		this.fireEvent('play', this.animations[this.currentAnimationIndex]);
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationStop: function() {
		this.fireEvent('stop', this.animations[this.currentAnimationIndex]);
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationEnd: function() {
		var animation = this.animations[++this.currentAnimationIndex];
		if (animation) {
			animation.start();
		} else {
			this.fireEvent('end');
		}
	},

});
