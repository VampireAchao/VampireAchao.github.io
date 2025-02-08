/*!
 * Viewer.js v1.5.0
 * https://fengyuanchen.github.io/viewerjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2019-11-23T05:10:26.193Z
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.Viewer = factory());
}(this, (function () {
    'use strict';

    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function (obj) {
                return typeof obj;
            };
        } else {
            _typeof = function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }

        return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);

        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
        }

        return keys;
    }

    function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
                ownKeys(Object(source), true).forEach(function (key) {
                    _defineProperty(target, key, source[key]);
                });
            } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
                ownKeys(Object(source)).forEach(function (key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
            }
        }

        return target;
    }

    var DEFAULTS = {
        /**
         * Enable a modal backdrop, specify `static` for a backdrop
         * which doesn't close the modal on click.
         * @type {boolean}
         */
        backdrop: true,

        /**
         * Show the button on the top-right of the viewer.
         * @type {boolean}
         */
        button: true,

        /**
         * Show the navbar.
         * @type {boolean | number}
         */
        navbar: true,

        /**
         * Specify the visibility and the content of the title.
         * @type {boolean | number | Function | Array}
         */
        title: true,

        /**
         * Show the toolbar.
         * @type {boolean | number | Object}
         */
        toolbar: true,

        /**
         * Custom class name(s) to add to the viewer's root element.
         * @type {string}
         */
        className: '',

        /**
         * Define where to put the viewer in modal mode.
         * @type {string | Element}
         */
        container: 'body',

        /**
         * Filter the images for viewing. Return true if the image is viewable.
         * @type {Function}
         */
        filter: null,

        /**
         * Enable to request fullscreen when play.
         * @type {boolean}
         */
        fullscreen: true,

        /**
         * Define the initial index of image for viewing.
         * @type {number}
         */
        initialViewIndex: 0,

        /**
         * Enable inline mode.
         * @type {boolean}
         */
        inline: false,

        /**
         * The amount of time to delay between automatically cycling an image when playing.
         * @type {number}
         */
        interval: 5000,

        /**
         * Enable keyboard support.
         * @type {boolean}
         */
        keyboard: true,

        /**
         * Indicate if show a loading spinner when load image or not.
         * @type {boolean}
         */
        loading: true,

        /**
         * Indicate if enable loop viewing or not.
         * @type {boolean}
         */
        loop: true,

        /**
         * Min width of the viewer in inline mode.
         * @type {number}
         */
        minWidth: 200,

        /**
         * Min height of the viewer in inline mode.
         * @type {number}
         */
        minHeight: 100,

        /**
         * Enable to move the image.
         * @type {boolean}
         */
        movable: true,

        /**
         * Enable to rotate the image.
         * @type {boolean}
         */
        rotatable: true,

        /**
         * Enable to scale the image.
         * @type {boolean}
         */
        scalable: true,

        /**
         * Enable to zoom the image.
         * @type {boolean}
         */
        zoomable: true,

        /**
         * Enable to zoom the current image by dragging on the touch screen.
         * @type {boolean}
         */
        zoomOnTouch: true,

        /**
         * Enable to zoom the image by wheeling mouse.
         * @type {boolean}
         */
        zoomOnWheel: true,

        /**
         * Enable to slide to the next or previous image by swiping on the touch screen.
         * @type {boolean}
         */
        slideOnTouch: true,

        /**
         * Indicate if toggle the image size between its natural size
         * and initial size when double click on the image or not.
         * @type {boolean}
         */
        toggleOnDblclick: true,

        /**
         * Show the tooltip with image ratio (percentage) when zoom in or zoom out.
         * @type {boolean}
         */
        tooltip: true,

        /**
         * Enable CSS3 Transition for some special elements.
         * @type {boolean}
         */
        transition: true,

        /**
         * Define the CSS `z-index` value of viewer in modal mode.
         * @type {number}
         */
        zIndex: 2015,

        /**
         * Define the CSS `z-index` value of viewer in inline mode.
         * @type {number}
         */
        zIndexInline: 0,

        /**
         * Define the ratio when zoom the image by wheeling mouse.
         * @type {number}
         */
        zoomRatio: 0.1,

        /**
         * Define the min ratio of the image when zoom out.
         * @type {number}
         */
        minZoomRatio: 0.01,

        /**
         * Define the max ratio of the image when zoom in.
         * @type {number}
         */
        maxZoomRatio: 100,

        /**
         * Define where to get the original image URL for viewing.
         * @type {string | Function}
         */
        url: 'src',

        /**
         * Event shortcuts.
         * @type {Function}
         */
        ready: null,
        show: null,
        shown: null,
        hide: null,
        hidden: null,
        view: null,
        viewed: null,
        zoom: null,
        zoomed: null
    };

    var TEMPLATE = '<div class="viewer-container" touch-action="none">' + '<div class="viewer-canvas"></div>' + '<div class="viewer-footer">' + '<div class="viewer-title"></div>' + '<div class="viewer-toolbar"></div>' + '<div class="viewer-navbar">' + '<ul class="viewer-list"></ul>' + '</div>' + '</div>' + '<div class="viewer-tooltip"></div>' + '<div role="button" class="viewer-button" data-viewer-action="mix"></div>' + '<div class="viewer-player"></div>' + '</div>';

    var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    var WINDOW = IS_BROWSER ? window : {};
    var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
    var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
    var NAMESPACE = 'viewer'; // Actions

    var ACTION_MOVE = 'move';
    var ACTION_SWITCH = 'switch';
    var ACTION_ZOOM = 'zoom'; // Classes

    var CLASS_ACTIVE = "".concat(NAMESPACE, "-active");
    var CLASS_CLOSE = "".concat(NAMESPACE, "-close");
    var CLASS_FADE = "".concat(NAMESPACE, "-fade");
    var CLASS_FIXED = "".concat(NAMESPACE, "-fixed");
    var CLASS_FULLSCREEN = "".concat(NAMESPACE, "-fullscreen");
    var CLASS_FULLSCREEN_EXIT = "".concat(NAMESPACE, "-fullscreen-exit");
    var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
    var CLASS_HIDE_MD_DOWN = "".concat(NAMESPACE, "-hide-md-down");
    var CLASS_HIDE_SM_DOWN = "".concat(NAMESPACE, "-hide-sm-down");
    var CLASS_HIDE_XS_DOWN = "".concat(NAMESPACE, "-hide-xs-down");
    var CLASS_IN = "".concat(NAMESPACE, "-in");
    var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
    var CLASS_LOADING = "".concat(NAMESPACE, "-loading");
    var CLASS_MOVE = "".concat(NAMESPACE, "-move");
    var CLASS_OPEN = "".concat(NAMESPACE, "-open");
    var CLASS_SHOW = "".concat(NAMESPACE, "-show");
    var CLASS_TRANSITION = "".concat(NAMESPACE, "-transition"); // Events

    var EVENT_CLICK = 'click';
    var EVENT_DBLCLICK = 'dblclick';
    var EVENT_DRAG_START = 'dragstart';
    var EVENT_HIDDEN = 'hidden';
    var EVENT_HIDE = 'hide';
    var EVENT_KEY_DOWN = 'keydown';
    var EVENT_LOAD = 'load';
    var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
    var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
    var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
    var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
    var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
    var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
    var EVENT_READY = 'ready';
    var EVENT_RESIZE = 'resize';
    var EVENT_SHOW = 'show';
    var EVENT_SHOWN = 'shown';
    var EVENT_TRANSITION_END = 'transitionend';
    var EVENT_VIEW = 'view';
    var EVENT_VIEWED = 'viewed';
    var EVENT_WHEEL = 'wheel';
    var EVENT_ZOOM = 'zoom';
    var EVENT_ZOOMED = 'zoomed'; // Data keys

    var DATA_ACTION = "".concat(NAMESPACE, "Action"); // RegExps

    var REGEXP_SPACES = /\s\s*/; // Misc

    var BUTTONS = ['zoom-in', 'zoom-out', 'one-to-one', 'reset', 'prev', 'play', 'next', 'rotate-left', 'rotate-right', 'flip-horizontal', 'flip-vertical'];

    /**
     * Check if the given value is a string.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is a string, else `false`.
     */

    function isString(value) {
        return typeof value === 'string';
    }

    /**
     * Check if the given value is not a number.
     */

    var isNaN = Number.isNaN || WINDOW.isNaN;

    /**
     * Check if the given value is a number.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is a number, else `false`.
     */

    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    /**
     * Check if the given value is undefined.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
     */

    function isUndefined(value) {
        return typeof value === 'undefined';
    }

    /**
     * Check if the given value is an object.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is an object, else `false`.
     */

    function isObject(value) {
        return _typeof(value) === 'object' && value !== null;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Check if the given value is a plain object.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
     */

    function isPlainObject(value) {
        if (!isObject(value)) {
            return false;
        }

        try {
            var _constructor = value.constructor;
            var prototype = _constructor.prototype;
            return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if the given value is a function.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is a function, else `false`.
     */

    function isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * Iterate the given data.
     * @param {*} data - The data to iterate.
     * @param {Function} callback - The process function for each element.
     * @returns {*} The original data.
     */

    function forEach(data, callback) {
        if (data && isFunction(callback)) {
            if (Array.isArray(data) || isNumber(data.length)
                /* array-like */
            ) {
                var length = data.length;
                var i;

                for (i = 0; i < length; i += 1) {
                    if (callback.call(data, data[i], i, data) === false) {
                        break;
                    }
                }
            } else if (isObject(data)) {
                Object.keys(data).forEach(function (key) {
                    callback.call(data, data[key], key, data);
                });
            }
        }

        return data;
    }

    /**
     * Extend the given object.
     * @param {*} obj - The object to be extended.
     * @param {*} args - The rest objects which will be merged to the first object.
     * @returns {Object} The extended object.
     */

    var assign = Object.assign || function assign(obj) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (isObject(obj) && args.length > 0) {
            args.forEach(function (arg) {
                if (isObject(arg)) {
                    Object.keys(arg).forEach(function (key) {
                        obj[key] = arg[key];
                    });
                }
            });
        }

        return obj;
    };
    var REGEXP_SUFFIX = /^(?:width|height|left|top|marginLeft|marginTop)$/;

    /**
     * Apply styles to the given element.
     * @param {Element} element - The target element.
     * @param {Object} styles - The styles for applying.
     */

    function setStyle(element, styles) {
        var style = element.style;
        forEach(styles, function (value, property) {
            if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
                value += 'px';
            }

            style[property] = value;
        });
    }

    /**
     * Escape a string for using in HTML.
     * @param {String} value - The string to escape.
     * @returns {String} Returns the escaped string.
     */

    function escapeHTMLEntities(value) {
        return isString(value) ? value.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : value;
    }

    /**
     * C