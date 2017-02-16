// This is a module using an object literal pattern.
// It's an easy way to organize your custom JavaScript into modules with methods.
// Since this system uses Webpack, you can reuse other modules and dependencies
// by importing them into the module.


import * as core from "../core";
// Here's jQuery in case you need it. If you're just doing DOM manipulation, you
// probably won't need it. Recommend using core.dom module to handle node caching.
import $ from "jquery/dist/jquery";

// Hammer js
const Hammer = require('hammerjs');

// get Modernizr object
const Modernizr = window.Modernizr;


let $_jsElements = null;


/**
 *
 * @public
 * @module Accordion
 * @description An Accordion hook module.
 *
 */
const Accordion = {
    /**
     *
     * @public
     * @method init
     * @memberof Accordion
     * @description Method runs once when window loads.
     *
     */
    init () {
        if ( this.isActive() ) {
            initElement();
        }
        // console.log( "Accordion module: initialized" );
    },


    /**
     *
     * @public
     * @method isActive
     * @memberof Accordion
     * @description Method informs of active status.
     * @returns {boolean}
     *
     */
    isActive () {
        return (this.getElements() > 0);
    },


    /**
     *
     * @public
     * @method unload
     * @memberof Accordion
     * @description Method performs unloading actions for this module.
     *
     */
    unload () {
        // Typically unloading and tearing down isn't required unless you're
        // using a complete AJAX Squarespace website that functions like
        // a single page application.
        this.teardown();
    },


    /**
     *
     * @public
     * @method teardown
     * @memberof Accordion
     * @description Method performs cleanup after this module. Removes events, null vars etc...
     *
     */
    teardown () {
        $_jsElements = null;
    },


    /**
     *
     * @public
     * @method getElements
     * @memberof Accordion
     * @description Method queries DOM for this modules node.
     * @returns {number}
     *
     */
    getElements () {
        $_jsElements = core.dom.body.find( ".accordion" );

        return ( $_jsElements.length );
    }
};


/**
 *
 * @private
 * @method execElement
 * @memberof Accordion
 * @description Handles execution of something.
 * @param {jQuery} $element The element.
 *
 */
const execElement = function ( $element ) {
    // get the accordion items
    let $items = $element.find('.accordion-item');

    // loop through each item and add event listeners
    $items.each(function () {
      // cached this element
      let $this = $(this);
      // get this accordion item's title. This is the main event listener target
      let $target = $this.find('.accordion-item--title');
      // get this accordion item's link elements
      let $targetLinks = $this.find('a');

      // stop event propagation of actual links
      $targetLinks.on('click', function (e) {
        e.stopPropagation();
      });

      // slidetoggle it's sibling on click
      $target.on('click', function () {
        $target.next('.accordion-item--content').slideToggle(180);
      });

      // prevent default tap events if device is touch enabled
      if(Modernizr.touch) {
        // get hammer instance of this element
        let $thisH = new Hammer($this[0]);

        // prevent default event on tap
        $thisH.on('tap', function (e) {
          e.preventDefault();
        });
      }

    });

    // Misc:
    // console.log( `Look ma, there's an element, and its data attributes!` );
    // console.log( $element );
};


/**
 *
 * @private
 * @method initElement
 * @memberof Accordion
 * @description This module would do something with your elements.
 *
 */
const initElement = function ( ) {
    const $notLoaded = $_jsElements.not( ".is-initialized" );
    let $element = null;
    let i = $notLoaded.length;

    for ( i; i--; ) {
        $element = $_jsElements.eq( i );

        $element.addClass( "is-initialized" );

        execElement( $element );
    }
};



/******************************************************************************
 * Export
*******************************************************************************/
export default Accordion;
