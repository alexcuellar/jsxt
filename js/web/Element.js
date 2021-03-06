//
// JavaScript unit
// DOM extensions
//
// Copyright (c) 2010 by Ildar Shaimordanov
//

if ( ! this.Element ) {

this.Element = {};

}

Element.classExists = function(element, className)
{
	if ( typeof element == 'string' ) {
		element = document.getElementById(element);
	}

	return Element.classExists.RE(className).test(element.className);
};

Element.classExists.RE = function(className)
{
	return new RegExp('(?:^|\\s+)' + className + '(?=\\s+|$)', 'g');
};

Element.addClass = function(element, className)
{
	if ( typeof element == 'string' ) {
		element = document.getElementById(element);
	}

	if ( ! Element.classExists(element, className) ) {
		element.className += ' ' + className;
	}
	return element;
};

Element.removeClass = function(element, className)
{
	if ( typeof element == 'string' ) {
		element = document.getElementById(element);
	}

	className = element.className.replace(Element.classExists.RE(className), ' ');
	if ( className != element.className ) {
		element.className = className;
	}
	return element;
};

/**
 * Element.toggleClass(element, className)
 *
 * @description
 * Toggles (adds and removes) the definite class by the specified name. 
 * Standard usage is to toggle visibility of HTML-elements. 
 *
 * @example
 * \x3Chead\x3E
 * \x3Cscript type="text/javascript"\x3E
 * 
 * window.onload = function()
 * {
 * 	document.getElementById('header').onclick = function()
 * 	{
 * 		Element.toggleClass('content', 'hiden');
 * 	};
 * };
 * 
 * \x3C/script\x3E
 * \x3Cstyle type="text/css"\x3E
 * 
 * .hidden	{
 * 	display: none;
 * }
 * 
 * \x3C/style\x3E
 * \x3C/head\x3E
 * 
 * \x3Cbody\x3E
 * \x3Cdiv id="container"\x3E
 * \x3Ch1 id="header"\x3EClick here\x3C/h1\x3E
 * \x3Cdiv id="content"\x3E
 * Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
 * tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
 * veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
 * commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
 * velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
 * cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
 * est laborum. 
 * \x3C/div\x3E
 * \x3C/div\x3E
 * \x3C/body\x3E
 * 
 */
Element.toggleClass = function(element, className)
{
	if ( typeof element == 'string' ) {
		element = document.getElementById(element);
	}

	if ( Element.classExists(element, className) ) {
		Element.removeClass(element, className);
	} else {
		Element.addClass(element, className);
	};
	return element;
};


/**
 * Element.toggle(element[, flag])
 *
 * @description
 * Wrapper over Element.toggleClass to toggle (hide/show) visibility of HTML-elements using the specified class name. 
 * Defines once a new CSS-rule 'display: none' and use it to toggle (hide/show) HTML-elements. 
 *
 * The second argument 'flag' defines the definite action: 
 * -1 to hide an element (using the 'addClass' method), 
 * +1 to show an element (using the 'removeClass' method). 
 * If the 'flag' argument is not specified as -1 or +1 then the 'toggleClass' method will be called. 
 * In all cases the class name is defined internally and applied each time as the second argument. 
 *
 * @example
 * \x3Chead\x3E
 * \x3Cscript type="text/javascript"\x3E
 * 
 * window.onload = function()
 * {
 * 	document.getElementById('header').onclick = function()
 * 	{
 * 		Element.toggle('content');
 * 	};
 * };
 * 
 * \x3C/script\x3E
 * \x3C/head\x3E
 * 
 * \x3Cbody\x3E
 * \x3Cdiv id="container"\x3E
 * \x3Ch1 id="header"\x3EClick here\x3C/h1\x3E
 * \x3Cdiv id="content"\x3E
 * Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
 * tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
 * veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
 * commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
 * velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
 * cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id 
 * est laborum. 
 * \x3C/div\x3E
 * \x3C/div\x3E
 * \x3C/body\x3E
 * 
 */
Element.toggle = function(element, flag)
{
	className = 'xhtmldom_element_toggle_to_hidden';

	if ( ! arguments.callee.anon ) {
		arguments.callee.anon = true;

		var style = document.createElement('style');
		style.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(style);

		var style = document.styleSheets[document.styleSheets.length - 1];

		if ( style.insertRule ) {
			style.insertRule('.' + className + '{ display: none; }', style.cssRules.length);
		} else {
			style.addRule('.' + className, 'display: none');
		}
	}

	if ( flag == -1 ) {
		Element.addClass(element, className);
	} else if ( flag == +1 ) {
		Element.removeClass(element, className);
	} else {
		Element.toggleClass(element, className);
	}
};

/**
 * Element.hide(element)
 *
 * @description
 * Hides the HTML-element
 */
Element.hide = function(element)
{
	Element.toggle(element, -1);
};

/**
 * Element.show(element)
 *
 * @description
 * Shows the HTML-element
 */
Element.show = function(element)
{
	Element.toggle(element, +1);
};

/*
Element.onToggle = function(controlling, controlled, className, callback)
{
	if ( typeof callback != 'function' ) {
		var action = className ? 'toggleClass' : 'toggle';
		callback = function()
		{
			Element[action](controlled, className);
		}
	}

	if ( typeof controlling == 'string' ) {
		controlling = document.getElementById(controlling);
	}

	UEvent.addEventListener(controlling, 'click', function(event)
	{
		callback(event || window.event);
	});
};
*/
