/*
---

name: Device.iPhone

description:

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Device

provides:
	- Device.iPhone

...
*/

Moobile.Simulator.Device['iPhone'] = new Class({

	Extends: Moobile.Simulator.Device,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	element: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	glare: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	statusBar: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	buttonBar: null,

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	decorate: function(element, display, content, iframe) {

		this.loadCSS('iPhone/styles.css');

		this.element = element;

		this.glare = new Element('div.simulator-display-glare').inject(element, 'top');
		this.buttonBar = new Element('div.simulator-button-bar').inject(content, 'bottom');
		this.statusBar = new Element('div.simulator-status-bar').inject(content, 'top');
		this.statusBar.adopt([
			new Element('div.simulator-status-bar-time'),
			new Element('div.simulator-status-bar-network'),
			new Element('div.simulator-status-bar-battery')
		]);

		this.updateTime();
 	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	destroy: function() {
		this.glare.destroy();
		this.statusBar.destroy();
		this.buttonBar.destroy();
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	willChangeOrientationAnimated: function(orientation) {
		this.element.addClass('animate');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	didChangeOrientationAnimated: function(orientation) {
		this.element.removeClass('animate');
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	supportsOrientation: function(orientation) {
		return ['portrait', 'landscape'].contains(orientation);
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	supportsPixelRatio: function(ratio) {
		return [1, 2].contains(ratio);
	},

	/**
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1
	 */
	updateTime: function() {

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

		this.element.getElement('.simulator-status-bar-time').set('html', hh + ":" + mm + " " + am);

		this.updateTime.delay(5000, this);
	}

});
