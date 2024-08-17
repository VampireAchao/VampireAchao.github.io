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
     * Check if the given element has a special class.
     * @param {Element} element - The element to check.
     * @param {string} value - The class to search.
     * @returns {boolean} Returns `true` if the special class was found.
     */

    function hasClass(element, value) {
        if (!element || !value) {
            return false;
        }

        return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
    }

    /**
     * Add classes to the given element.
     * @param {Element} element - The target element.
     * @param {string} value - The classes to be added.
     */

    function addClass(element, value) {
        if (!element || !value) {
            return;
        }

        if (isNumber(element.length)) {
            forEach(element, function (elem) {
                addClass(elem, value);
            });
            return;
        }

        if (element.classList) {
            element.classList.add(value);
            return;
        }

        var className = element.className.trim();

        if (!className) {
            element.className = value;
        } else if (className.indexOf(value) < 0) {
            element.className = "".concat(className, " ").concat(value);
        }
    }

    /**
     * Remove classes from the given element.
     * @param {Element} element - The target element.
     * @param {string} value - The classes to be removed.
     */

    function removeClass(element, value) {
        if (!element || !value) {
            return;
        }

        if (isNumber(element.length)) {
            forEach(element, function (elem) {
                removeClass(elem, value);
            });
            return;
        }

        if (element.classList) {
            element.classList.remove(value);
            return;
        }

        if (element.className.indexOf(value) >= 0) {
            element.className = element.className.replace(value, '');
        }
    }

    /**
     * Add or remove classes from the given element.
     * @param {Element} element - The target element.
     * @param {string} value - The classes to be toggled.
     * @param {boolean} added - Add only.
     */

    function toggleClass(element, value, added) {
        if (!value) {
            return;
        }

        if (isNumber(element.length)) {
            forEach(element, function (elem) {
                toggleClass(elem, value, added);
            });
            return;
        } // IE10-11 doesn't support the second parameter of `classList.toggle`


        if (added) {
            addClass(element, value);
        } else {
            removeClass(element, value);
        }
    }

    var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;

    /**
     * Transform the given string from camelCase to kebab-case
     * @param {string} value - The value to transform.
     * @returns {string} The transformed value.
     */

    function hyphenate(value) {
        return value.replace(REGEXP_HYPHENATE, '$1-$2').toLowerCase();
    }

    /**
     * Get data from the given element.
     * @param {Element} element - The target element.
     * @param {string} name - The data key to get.
     * @returns {string} The data value.
     */

    function getData(element, name) {
        if (isObject(element[name])) {
            return element[name];
        }

        if (element.dataset) {
            return element.dataset[name];
        }

        return element.getAttribute("data-".concat(hyphenate(name)));
    }

    /**
     * Set data to the given element.
     * @param {Element} element - The target element.
     * @param {string} name - The data key to set.
     * @param {string} data - The data value.
     */

    function setData(element, name, data) {
        if (isObject(data)) {
            element[name] = data;
        } else if (element.dataset) {
            element.dataset[name] = data;
        } else {
            element.setAttribute("data-".concat(hyphenate(name)), data);
        }
    }

    var onceSupported = function () {
        var supported = false;

        if (IS_BROWSER) {
            var once = false;

            var listener = function listener() {
            };

            var options = Object.defineProperty({}, 'once', {
                get: function get() {
                    supported = true;
                    return once;
                },

                /**
                 * This setter can fix a `TypeError` in strict mode
                 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
                 * @param {boolean} value - The value to set
                 */
                set: function set(value) {
                    once = value;
                }
            });
            WINDOW.addEventListener('test', listener, options);
            WINDOW.removeEventListener('test', listener, options);
        }

        return supported;
    }();

    /**
     * Remove event listener from the target element.
     * @param {Element} element - The event target.
     * @param {string} type - The event type(s).
     * @param {Function} listener - The event listener.
     * @param {Object} options - The event options.
     */


    function removeListener(element, type, listener) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var handler = listener;
        type.trim().split(REGEXP_SPACES).forEach(function (event) {
            if (!onceSupported) {
                var listeners = element.listeners;

                if (listeners && listeners[event] && listeners[event][listener]) {
                    handler = listeners[event][listener];
                    delete listeners[event][listener];

                    if (Object.keys(listeners[event]).length === 0) {
                        delete listeners[event];
                    }

                    if (Object.keys(listeners).length === 0) {
                        delete element.listeners;
                    }
                }
            }

            element.removeEventListener(event, handler, options);
        });
    }

    /**
     * Add event listener to the target element.
     * @param {Element} element - The event target.
     * @param {string} type - The event type(s).
     * @param {Function} listener - The event listener.
     * @param {Object} options - The event options.
     */

    function addListener(element, type, listener) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var _handler = listener;
        type.trim().split(REGEXP_SPACES).forEach(function (event) {
            if (options.once && !onceSupported) {
                var _element$listeners = element.listeners,
                    listeners = _element$listeners === void 0 ? {} : _element$listeners;

                _handler = function handler() {
                    delete listeners[event][listener];
                    element.removeEventListener(event, _handler, options);

                    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        args[_key2] = arguments[_key2];
                    }

                    listener.apply(element, args);
                };

                if (!listeners[event]) {
                    listeners[event] = {};
                }

                if (listeners[event][listener]) {
                    element.removeEventListener(event, listeners[event][listener], options);
                }

                listeners[event][listener] = _handler;
                element.listeners = listeners;
            }

            element.addEventListener(event, _handler, options);
        });
    }

    /**
     * Dispatch event on the target element.
     * @param {Element} element - The event target.
     * @param {string} type - The event type(s).
     * @param {Object} data - The additional event data.
     * @returns {boolean} Indicate if the event is default prevented or not.
     */

    function dispatchEvent(element, type, data) {
        var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

        if (isFunction(Event) && isFunction(CustomEvent)) {
            event = new CustomEvent(type, {
                detail: data,
                bubbles: true,
                cancelable: true
            });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, data);
        }

        return element.dispatchEvent(event);
    }

    /**
     * Get the offset base on the document.
     * @param {Element} element - The target element.
     * @returns {Object} The offset data.
     */

    function getOffset(element) {
        var box = element.getBoundingClientRect();
        return {
            left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
            top: box.top + (window.pageYOffset - document.documentElement.clientTop)
        };
    }

    /**
     * Get transforms base on the given object.
     * @param {Object} obj - The target object.
     * @returns {string} A string contains transform values.
     */

    function getTransforms(_ref) {
        var rotate = _ref.rotate,
            scaleX = _ref.scaleX,
            scaleY = _ref.scaleY,
            translateX = _ref.translateX,
            translateY = _ref.translateY;
        var values = [];

        if (isNumber(translateX) && translateX !== 0) {
            values.push("translateX(".concat(translateX, "px)"));
        }

        if (isNumber(translateY) && translateY !== 0) {
            values.push("translateY(".concat(translateY, "px)"));
        } // Rotate should come first before scale to match orientation transform


        if (isNumber(rotate) && rotate !== 0) {
            values.push("rotate(".concat(rotate, "deg)"));
        }

        if (isNumber(scaleX) && scaleX !== 1) {
            values.push("scaleX(".concat(scaleX, ")"));
        }

        if (isNumber(scaleY) && scaleY !== 1) {
            values.push("scaleY(".concat(scaleY, ")"));
        }

        var transform = values.length ? values.join(' ') : 'none';
        return {
            WebkitTransform: transform,
            msTransform: transform,
            transform: transform
        };
    }

    /**
     * Get an image name from an image url.
     * @param {string} url - The target url.
     * @example
     * // picture.jpg
     * getImageNameFromURL('https://domain.com/path/to/picture.jpg?size=1280×960')
     * @returns {string} A string contains the image name.
     */

    function getImageNameFromURL(url) {
        return isString(url) ? decodeURIComponent(url.replace(/^.*\//, '').replace(/[?&#].*$/, '')) : '';
    }

    var IS_SAFARI = WINDOW.navigator && /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(WINDOW.navigator.userAgent);

    /**
     * Get an image's natural sizes.
     * @param {string} image - The target image.
     * @param {Function} callback - The callback function.
     * @returns {HTMLImageElement} The new image.
     */

    function getImageNaturalSizes(image, callback) {
        var newImage = document.createElement('img'); // Modern browsers (except Safari)

        if (image.naturalWidth && !IS_SAFARI) {
            callback(image.naturalWidth, image.naturalHeight);
            return newImage;
        }

        var body = document.body || document.documentElement;

        newImage.onload = function () {
            callback(newImage.width, newImage.height);

            if (!IS_SAFARI) {
                body.removeChild(newImage);
            }
        };

        newImage.src = image.src; // iOS Safari will convert the image automatically
        // with its orientation once append it into DOM

        if (!IS_SAFARI) {
            newImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
            body.appendChild(newImage);
        }

        return newImage;
    }

    /**
     * Get the related class name of a responsive type number.
     * @param {string} type - The responsive type.
     * @returns {string} The related class name.
     */

    function getResponsiveClass(type) {
        switch (type) {
            case 2:
                return CLASS_HIDE_XS_DOWN;

            case 3:
                return CLASS_HIDE_SM_DOWN;

            case 4:
                return CLASS_HIDE_MD_DOWN;

            default:
                return '';
        }
    }

    /**
     * Get the max ratio of a group of pointers.
     * @param {string} pointers - The target pointers.
     * @returns {number} The result ratio.
     */

    function getMaxZoomRatio(pointers) {
        var pointers2 = _objectSpread2({}, pointers);

        var ratios = [];
        forEach(pointers, function (pointer, pointerId) {
            delete pointers2[pointerId];
            forEach(pointers2, function (pointer2) {
                var x1 = Math.abs(pointer.startX - pointer2.startX);
                var y1 = Math.abs(pointer.startY - pointer2.startY);
                var x2 = Math.abs(pointer.endX - pointer2.endX);
                var y2 = Math.abs(pointer.endY - pointer2.endY);
                var z1 = Math.sqrt(x1 * x1 + y1 * y1);
                var z2 = Math.sqrt(x2 * x2 + y2 * y2);
                var ratio = (z2 - z1) / z1;
                ratios.push(ratio);
            });
        });
        ratios.sort(function (a, b) {
            return Math.abs(a) < Math.abs(b);
        });
        return ratios[0];
    }

    /**
     * Get a pointer from an event object.
     * @param {Object} event - The target event object.
     * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
     * @returns {Object} The result pointer contains start and/or end point coordinates.
     */

    function getPointer(_ref2, endOnly) {
        var pageX = _ref2.pageX,
            pageY = _ref2.pageY;
        var end = {
            endX: pageX,
            endY: pageY
        };
        return endOnly ? end : _objectSpread2({
            timeStamp: Date.now(),
            startX: pageX,
            startY: pageY
        }, end);
    }

    /**
     * Get the center point coordinate of a group of pointers.
     * @param {Object} pointers - The target pointers.
     * @returns {Object} The center point coordinate.
     */

    function getPointersCenter(pointers) {
        var pageX = 0;
        var pageY = 0;
        var count = 0;
        forEach(pointers, function (_ref3) {
            var startX = _ref3.startX,
                startY = _ref3.startY;
            pageX += startX;
            pageY += startY;
            count += 1;
        });
        pageX /= count;
        pageY /= count;
        return {
            pageX: pageX,
            pageY: pageY
        };
    }

    var render = {
        render: function render() {
            this.initContainer();
            this.initViewer();
            this.initList();
            this.renderViewer();
        },
        initContainer: function initContainer() {
            this.containerData = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        initViewer: function initViewer() {
            var options = this.options,
                parent = this.parent;
            var viewerData;

            if (options.inline) {
                viewerData = {
                    width: Math.max(parent.offsetWidth, options.minWidth),
                    height: Math.max(parent.offsetHeight, options.minHeight)
                };
                this.parentData = viewerData;
            }

            if (this.fulled || !viewerData) {
                viewerData = this.containerData;
            }

            this.viewerData = assign({}, viewerData);
        },
        renderViewer: function renderViewer() {
            if (this.options.inline && !this.fulled) {
                setStyle(this.viewer, this.viewerData);
            }
        },
        initList: function initList() {
            var _this = this;

            var elemen