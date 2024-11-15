(() => {
    var __webpack_modules__ = {
        786: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                "use strict";
                if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory() {
                "use strict";
                var matchesMethod = function() {
                    var ElemProto = window.Element.prototype;
                    if (ElemProto.matches) return "matches";
                    if (ElemProto.matchesSelector) return "matchesSelector";
                    var prefixes = [ "webkit", "moz", "ms", "o" ];
                    for (var i = 0; i < prefixes.length; i++) {
                        var prefix = prefixes[i];
                        var method = prefix + "MatchesSelector";
                        if (ElemProto[method]) return method;
                    }
                }();
                return function matchesSelector(elem, selector) {
                    return elem[matchesMethod](selector);
                };
            }));
        },
        137: function(module, exports, __webpack_require__) {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(global, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(typeof window != "undefined" && window, (function() {
                "use strict";
                function EvEmitter() {}
                var proto = EvEmitter.prototype;
                proto.on = function(eventName, listener) {
                    if (!eventName || !listener) return;
                    var events = this._events = this._events || {};
                    var listeners = events[eventName] = events[eventName] || [];
                    if (listeners.indexOf(listener) == -1) listeners.push(listener);
                    return this;
                };
                proto.once = function(eventName, listener) {
                    if (!eventName || !listener) return;
                    this.on(eventName, listener);
                    var onceEvents = this._onceEvents = this._onceEvents || {};
                    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
                    onceListeners[listener] = true;
                    return this;
                };
                proto.off = function(eventName, listener) {
                    var listeners = this._events && this._events[eventName];
                    if (!listeners || !listeners.length) return;
                    var index = listeners.indexOf(listener);
                    if (index != -1) listeners.splice(index, 1);
                    return this;
                };
                proto.emitEvent = function(eventName, args) {
                    var listeners = this._events && this._events[eventName];
                    if (!listeners || !listeners.length) return;
                    listeners = listeners.slice(0);
                    args = args || [];
                    var onceListeners = this._onceEvents && this._onceEvents[eventName];
                    for (var i = 0; i < listeners.length; i++) {
                        var listener = listeners[i];
                        var isOnce = onceListeners && onceListeners[listener];
                        if (isOnce) {
                            this.off(eventName, listener);
                            delete onceListeners[listener];
                        }
                        listener.apply(this, args);
                    }
                    return this;
                };
                proto.allOff = function() {
                    delete this._events;
                    delete this._onceEvents;
                };
                return EvEmitter;
            }));
        },
        358: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(786) ], __WEBPACK_AMD_DEFINE_RESULT__ = function(matchesSelector) {
                    return factory(window, matchesSelector);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(window, matchesSelector) {
                "use strict";
                var utils = {};
                utils.extend = function(a, b) {
                    for (var prop in b) a[prop] = b[prop];
                    return a;
                };
                utils.modulo = function(num, div) {
                    return (num % div + div) % div;
                };
                var arraySlice = Array.prototype.slice;
                utils.makeArray = function(obj) {
                    if (Array.isArray(obj)) return obj;
                    if (obj === null || obj === void 0) return [];
                    var isArrayLike = typeof obj == "object" && typeof obj.length == "number";
                    if (isArrayLike) return arraySlice.call(obj);
                    return [ obj ];
                };
                utils.removeFrom = function(ary, obj) {
                    var index = ary.indexOf(obj);
                    if (index != -1) ary.splice(index, 1);
                };
                utils.getParent = function(elem, selector) {
                    while (elem.parentNode && elem != document.body) {
                        elem = elem.parentNode;
                        if (matchesSelector(elem, selector)) return elem;
                    }
                };
                utils.getQueryElement = function(elem) {
                    if (typeof elem == "string") return document.querySelector(elem);
                    return elem;
                };
                utils.handleEvent = function(event) {
                    var method = "on" + event.type;
                    if (this[method]) this[method](event);
                };
                utils.filterFindElements = function(elems, selector) {
                    elems = utils.makeArray(elems);
                    var ffElems = [];
                    elems.forEach((function(elem) {
                        if (!(elem instanceof HTMLElement)) return;
                        if (!selector) {
                            ffElems.push(elem);
                            return;
                        }
                        if (matchesSelector(elem, selector)) ffElems.push(elem);
                        var childElems = elem.querySelectorAll(selector);
                        for (var i = 0; i < childElems.length; i++) ffElems.push(childElems[i]);
                    }));
                    return ffElems;
                };
                utils.debounceMethod = function(_class, methodName, threshold) {
                    threshold = threshold || 100;
                    var method = _class.prototype[methodName];
                    var timeoutName = methodName + "Timeout";
                    _class.prototype[methodName] = function() {
                        var timeout = this[timeoutName];
                        clearTimeout(timeout);
                        var args = arguments;
                        var _this = this;
                        this[timeoutName] = setTimeout((function() {
                            method.apply(_this, args);
                            delete _this[timeoutName];
                        }), threshold);
                    };
                };
                utils.docReady = function(callback) {
                    var readyState = document.readyState;
                    if (readyState == "complete" || readyState == "interactive") setTimeout(callback); else document.addEventListener("DOMContentLoaded", callback);
                };
                utils.toDashed = function(str) {
                    return str.replace(/(.)([A-Z])/g, (function(match, $1, $2) {
                        return $1 + "-" + $2;
                    })).toLowerCase();
                };
                var console = window.console;
                utils.htmlInit = function(WidgetClass, namespace) {
                    utils.docReady((function() {
                        var dashedNamespace = utils.toDashed(namespace);
                        var dataAttr = "data-" + dashedNamespace;
                        var dataAttrElems = document.querySelectorAll("[" + dataAttr + "]");
                        var jsDashElems = document.querySelectorAll(".js-" + dashedNamespace);
                        var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
                        var dataOptionsAttr = dataAttr + "-options";
                        var jQuery = window.jQuery;
                        elems.forEach((function(elem) {
                            var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
                            var options;
                            try {
                                options = attr && JSON.parse(attr);
                            } catch (error) {
                                if (console) console.error("Error parsing " + dataAttr + " on " + elem.className + ": " + error);
                                return;
                            }
                            var instance = new WidgetClass(elem, options);
                            if (jQuery) jQuery.data(elem, namespace, instance);
                        }));
                    }));
                };
                return utils;
            }));
        },
        485: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory() {
                "use strict";
                function getStyleSize(value) {
                    var num = parseFloat(value);
                    var isValid = value.indexOf("%") == -1 && !isNaN(num);
                    return isValid && num;
                }
                function noop() {}
                var logError = typeof console == "undefined" ? noop : function(message) {
                    console.error(message);
                };
                var measurements = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
                var measurementsLength = measurements.length;
                function getZeroSize() {
                    var size = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    };
                    for (var i = 0; i < measurementsLength; i++) {
                        var measurement = measurements[i];
                        size[measurement] = 0;
                    }
                    return size;
                }
                function getStyle(elem) {
                    var style = getComputedStyle(elem);
                    if (!style) logError("Style returned " + style + ". Are you running this code in a hidden iframe on Firefox? " + "See https://bit.ly/getsizebug1");
                    return style;
                }
                var isSetup = false;
                var isBoxSizeOuter;
                function setup() {
                    if (isSetup) return;
                    isSetup = true;
                    var div = document.createElement("div");
                    div.style.width = "200px";
                    div.style.padding = "1px 2px 3px 4px";
                    div.style.borderStyle = "solid";
                    div.style.borderWidth = "1px 2px 3px 4px";
                    div.style.boxSizing = "border-box";
                    var body = document.body || document.documentElement;
                    body.appendChild(div);
                    var style = getStyle(div);
                    isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
                    getSize.isBoxSizeOuter = isBoxSizeOuter;
                    body.removeChild(div);
                }
                function getSize(elem) {
                    setup();
                    if (typeof elem == "string") elem = document.querySelector(elem);
                    if (!elem || typeof elem != "object" || !elem.nodeType) return;
                    var style = getStyle(elem);
                    if (style.display == "none") return getZeroSize();
                    var size = {};
                    size.width = elem.offsetWidth;
                    size.height = elem.offsetHeight;
                    var isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
                    for (var i = 0; i < measurementsLength; i++) {
                        var measurement = measurements[i];
                        var value = style[measurement];
                        var num = parseFloat(value);
                        size[measurement] = !isNaN(num) ? num : 0;
                    }
                    var paddingWidth = size.paddingLeft + size.paddingRight;
                    var paddingHeight = size.paddingTop + size.paddingBottom;
                    var marginWidth = size.marginLeft + size.marginRight;
                    var marginHeight = size.marginTop + size.marginBottom;
                    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
                    var borderHeight = size.borderTopWidth + size.borderBottomWidth;
                    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
                    var styleWidth = getStyleSize(style.width);
                    if (styleWidth !== false) size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
                    var styleHeight = getStyleSize(style.height);
                    if (styleHeight !== false) size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
                    size.innerWidth = size.width - (paddingWidth + borderWidth);
                    size.innerHeight = size.height - (paddingHeight + borderHeight);
                    size.outerWidth = size.width + marginWidth;
                    size.outerHeight = size.height + marginHeight;
                    return size;
                }
                return getSize;
            }));
        },
        334: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
 * Isotope v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(831), __webpack_require__(485), __webpack_require__(786), __webpack_require__(358), __webpack_require__(530), __webpack_require__(763), __webpack_require__(330), __webpack_require__(153), __webpack_require__(987) ], 
                __WEBPACK_AMD_DEFINE_RESULT__ = function(Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
                    return factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode) {
                "use strict";
                var jQuery = window.jQuery;
                var trim = String.prototype.trim ? function(str) {
                    return str.trim();
                } : function(str) {
                    return str.replace(/^\s+|\s+$/g, "");
                };
                var Isotope = Outlayer.create("isotope", {
                    layoutMode: "masonry",
                    isJQueryFiltering: true,
                    sortAscending: true
                });
                Isotope.Item = Item;
                Isotope.LayoutMode = LayoutMode;
                var proto = Isotope.prototype;
                proto._create = function() {
                    this.itemGUID = 0;
                    this._sorters = {};
                    this._getSorters();
                    Outlayer.prototype._create.call(this);
                    this.modes = {};
                    this.filteredItems = this.items;
                    this.sortHistory = [ "original-order" ];
                    for (var name in LayoutMode.modes) this._initLayoutMode(name);
                };
                proto.reloadItems = function() {
                    this.itemGUID = 0;
                    Outlayer.prototype.reloadItems.call(this);
                };
                proto._itemize = function() {
                    var items = Outlayer.prototype._itemize.apply(this, arguments);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        item.id = this.itemGUID++;
                    }
                    this._updateItemsSortData(items);
                    return items;
                };
                proto._initLayoutMode = function(name) {
                    var Mode = LayoutMode.modes[name];
                    var initialOpts = this.options[name] || {};
                    this.options[name] = Mode.options ? utils.extend(Mode.options, initialOpts) : initialOpts;
                    this.modes[name] = new Mode(this);
                };
                proto.layout = function() {
                    if (!this._isLayoutInited && this._getOption("initLayout")) {
                        this.arrange();
                        return;
                    }
                    this._layout();
                };
                proto._layout = function() {
                    var isInstant = this._getIsInstant();
                    this._resetLayout();
                    this._manageStamps();
                    this.layoutItems(this.filteredItems, isInstant);
                    this._isLayoutInited = true;
                };
                proto.arrange = function(opts) {
                    this.option(opts);
                    this._getIsInstant();
                    var filtered = this._filter(this.items);
                    this.filteredItems = filtered.matches;
                    this._bindArrangeComplete();
                    if (this._isInstant) this._noTransition(this._hideReveal, [ filtered ]); else this._hideReveal(filtered);
                    this._sort();
                    this._layout();
                };
                proto._init = proto.arrange;
                proto._hideReveal = function(filtered) {
                    this.reveal(filtered.needReveal);
                    this.hide(filtered.needHide);
                };
                proto._getIsInstant = function() {
                    var isLayoutInstant = this._getOption("layoutInstant");
                    var isInstant = isLayoutInstant !== void 0 ? isLayoutInstant : !this._isLayoutInited;
                    this._isInstant = isInstant;
                    return isInstant;
                };
                proto._bindArrangeComplete = function() {
                    var isLayoutComplete, isHideComplete, isRevealComplete;
                    var _this = this;
                    function arrangeParallelCallback() {
                        if (isLayoutComplete && isHideComplete && isRevealComplete) _this.dispatchEvent("arrangeComplete", null, [ _this.filteredItems ]);
                    }
                    this.once("layoutComplete", (function() {
                        isLayoutComplete = true;
                        arrangeParallelCallback();
                    }));
                    this.once("hideComplete", (function() {
                        isHideComplete = true;
                        arrangeParallelCallback();
                    }));
                    this.once("revealComplete", (function() {
                        isRevealComplete = true;
                        arrangeParallelCallback();
                    }));
                };
                proto._filter = function(items) {
                    var filter = this.options.filter;
                    filter = filter || "*";
                    var matches = [];
                    var hiddenMatched = [];
                    var visibleUnmatched = [];
                    var test = this._getFilterTest(filter);
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.isIgnored) continue;
                        var isMatched = test(item);
                        if (isMatched) matches.push(item);
                        if (isMatched && item.isHidden) hiddenMatched.push(item); else if (!isMatched && !item.isHidden) visibleUnmatched.push(item);
                    }
                    return {
                        matches,
                        needReveal: hiddenMatched,
                        needHide: visibleUnmatched
                    };
                };
                proto._getFilterTest = function(filter) {
                    if (jQuery && this.options.isJQueryFiltering) return function(item) {
                        return jQuery(item.element).is(filter);
                    };
                    if (typeof filter == "function") return function(item) {
                        return filter(item.element);
                    };
                    return function(item) {
                        return matchesSelector(item.element, filter);
                    };
                };
                proto.updateSortData = function(elems) {
                    var items;
                    if (elems) {
                        elems = utils.makeArray(elems);
                        items = this.getItems(elems);
                    } else items = this.items;
                    this._getSorters();
                    this._updateItemsSortData(items);
                };
                proto._getSorters = function() {
                    var getSortData = this.options.getSortData;
                    for (var key in getSortData) {
                        var sorter = getSortData[key];
                        this._sorters[key] = mungeSorter(sorter);
                    }
                };
                proto._updateItemsSortData = function(items) {
                    var len = items && items.length;
                    for (var i = 0; len && i < len; i++) {
                        var item = items[i];
                        item.updateSortData();
                    }
                };
                var mungeSorter = function() {
                    function mungeSorter(sorter) {
                        if (typeof sorter != "string") return sorter;
                        var args = trim(sorter).split(" ");
                        var query = args[0];
                        var attrMatch = query.match(/^\[(.+)\]$/);
                        var attr = attrMatch && attrMatch[1];
                        var getValue = getValueGetter(attr, query);
                        var parser = Isotope.sortDataParsers[args[1]];
                        sorter = parser ? function(elem) {
                            return elem && parser(getValue(elem));
                        } : function(elem) {
                            return elem && getValue(elem);
                        };
                        return sorter;
                    }
                    function getValueGetter(attr, query) {
                        if (attr) return function getAttribute(elem) {
                            return elem.getAttribute(attr);
                        };
                        return function getChildText(elem) {
                            var child = elem.querySelector(query);
                            return child && child.textContent;
                        };
                    }
                    return mungeSorter;
                }();
                Isotope.sortDataParsers = {
                    parseInt: function(val) {
                        return parseInt(val, 10);
                    },
                    parseFloat: function(val) {
                        return parseFloat(val);
                    }
                };
                proto._sort = function() {
                    if (!this.options.sortBy) return;
                    var sortBys = utils.makeArray(this.options.sortBy);
                    if (!this._getIsSameSortBy(sortBys)) this.sortHistory = sortBys.concat(this.sortHistory);
                    var itemSorter = getItemSorter(this.sortHistory, this.options.sortAscending);
                    this.filteredItems.sort(itemSorter);
                };
                proto._getIsSameSortBy = function(sortBys) {
                    for (var i = 0; i < sortBys.length; i++) if (sortBys[i] != this.sortHistory[i]) return false;
                    return true;
                };
                function getItemSorter(sortBys, sortAsc) {
                    return function sorter(itemA, itemB) {
                        for (var i = 0; i < sortBys.length; i++) {
                            var sortBy = sortBys[i];
                            var a = itemA.sortData[sortBy];
                            var b = itemB.sortData[sortBy];
                            if (a > b || a < b) {
                                var isAscending = sortAsc[sortBy] !== void 0 ? sortAsc[sortBy] : sortAsc;
                                var direction = isAscending ? 1 : -1;
                                return (a > b ? 1 : -1) * direction;
                            }
                        }
                        return 0;
                    };
                }
                proto._mode = function() {
                    var layoutMode = this.options.layoutMode;
                    var mode = this.modes[layoutMode];
                    if (!mode) throw new Error("No layout mode: " + layoutMode);
                    mode.options = this.options[layoutMode];
                    return mode;
                };
                proto._resetLayout = function() {
                    Outlayer.prototype._resetLayout.call(this);
                    this._mode()._resetLayout();
                };
                proto._getItemLayoutPosition = function(item) {
                    return this._mode()._getItemLayoutPosition(item);
                };
                proto._manageStamp = function(stamp) {
                    this._mode()._manageStamp(stamp);
                };
                proto._getContainerSize = function() {
                    return this._mode()._getContainerSize();
                };
                proto.needsResizeLayout = function() {
                    return this._mode().needsResizeLayout();
                };
                proto.appended = function(elems) {
                    var items = this.addItems(elems);
                    if (!items.length) return;
                    var filteredItems = this._filterRevealAdded(items);
                    this.filteredItems = this.filteredItems.concat(filteredItems);
                };
                proto.prepended = function(elems) {
                    var items = this._itemize(elems);
                    if (!items.length) return;
                    this._resetLayout();
                    this._manageStamps();
                    var filteredItems = this._filterRevealAdded(items);
                    this.layoutItems(this.filteredItems);
                    this.filteredItems = filteredItems.concat(this.filteredItems);
                    this.items = items.concat(this.items);
                };
                proto._filterRevealAdded = function(items) {
                    var filtered = this._filter(items);
                    this.hide(filtered.needHide);
                    this.reveal(filtered.matches);
                    this.layoutItems(filtered.matches, true);
                    return filtered.matches;
                };
                proto.insert = function(elems) {
                    var items = this.addItems(elems);
                    if (!items.length) return;
                    var i, item;
                    var len = items.length;
                    for (i = 0; i < len; i++) {
                        item = items[i];
                        this.element.appendChild(item.element);
                    }
                    var filteredInsertItems = this._filter(items).matches;
                    for (i = 0; i < len; i++) items[i].isLayoutInstant = true;
                    this.arrange();
                    for (i = 0; i < len; i++) delete items[i].isLayoutInstant;
                    this.reveal(filteredInsertItems);
                };
                var _remove = proto.remove;
                proto.remove = function(elems) {
                    elems = utils.makeArray(elems);
                    var removeItems = this.getItems(elems);
                    _remove.call(this, elems);
                    var len = removeItems && removeItems.length;
                    for (var i = 0; len && i < len; i++) {
                        var item = removeItems[i];
                        utils.removeFrom(this.filteredItems, item);
                    }
                };
                proto.shuffle = function() {
                    for (var i = 0; i < this.items.length; i++) {
                        var item = this.items[i];
                        item.sortData.random = Math.random();
                    }
                    this.options.sortBy = "random";
                    this._sort();
                    this._layout();
                };
                proto._noTransition = function(fn, args) {
                    var transitionDuration = this.options.transitionDuration;
                    this.options.transitionDuration = 0;
                    var returnValue = fn.apply(this, args);
                    this.options.transitionDuration = transitionDuration;
                    return returnValue;
                };
                proto.getFilteredItemElements = function() {
                    return this.filteredItems.map((function(item) {
                        return item.element;
                    }));
                };
                return Isotope;
            }));
        },
        530: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(831) ], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, 
                __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(Outlayer) {
                "use strict";
                function Item() {
                    Outlayer.Item.apply(this, arguments);
                }
                var proto = Item.prototype = Object.create(Outlayer.Item.prototype);
                var _create = proto._create;
                proto._create = function() {
                    this.id = this.layout.itemGUID++;
                    _create.call(this);
                    this.sortData = {};
                };
                proto.updateSortData = function() {
                    if (this.isIgnored) return;
                    this.sortData.id = this.id;
                    this.sortData["original-order"] = this.id;
                    this.sortData.random = Math.random();
                    var getSortData = this.layout.options.getSortData;
                    var sorters = this.layout._sorters;
                    for (var key in getSortData) {
                        var sorter = sorters[key];
                        this.sortData[key] = sorter(this.element, this);
                    }
                };
                var _destroy = proto.destroy;
                proto.destroy = function() {
                    _destroy.apply(this, arguments);
                    this.css({
                        display: ""
                    });
                };
                return Item;
            }));
        },
        763: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(485), __webpack_require__(831) ], 
                __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(getSize, Outlayer) {
                "use strict";
                function LayoutMode(isotope) {
                    this.isotope = isotope;
                    if (isotope) {
                        this.options = isotope.options[this.namespace];
                        this.element = isotope.element;
                        this.items = isotope.filteredItems;
                        this.size = isotope.size;
                    }
                }
                var proto = LayoutMode.prototype;
                var facadeMethods = [ "_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption" ];
                facadeMethods.forEach((function(methodName) {
                    proto[methodName] = function() {
                        return Outlayer.prototype[methodName].apply(this.isotope, arguments);
                    };
                }));
                proto.needsVerticalResizeLayout = function() {
                    var size = getSize(this.isotope.element);
                    var hasSizes = this.isotope.size && size;
                    return hasSizes && size.innerHeight != this.isotope.size.innerHeight;
                };
                proto._getMeasurement = function() {
                    this.isotope._getMeasurement.apply(this, arguments);
                };
                proto.getColumnWidth = function() {
                    this.getSegmentSize("column", "Width");
                };
                proto.getRowHeight = function() {
                    this.getSegmentSize("row", "Height");
                };
                proto.getSegmentSize = function(segment, size) {
                    var segmentName = segment + size;
                    var outerSize = "outer" + size;
                    this._getMeasurement(segmentName, outerSize);
                    if (this[segmentName]) return;
                    var firstItemSize = this.getFirstItemSize();
                    this[segmentName] = firstItemSize && firstItemSize[outerSize] || this.isotope.size["inner" + size];
                };
                proto.getFirstItemSize = function() {
                    var firstItem = this.isotope.filteredItems[0];
                    return firstItem && firstItem.element && getSize(firstItem.element);
                };
                proto.layout = function() {
                    this.isotope.layout.apply(this.isotope, arguments);
                };
                proto.getSize = function() {
                    this.isotope.getSize();
                    this.size = this.isotope.size;
                };
                LayoutMode.modes = {};
                LayoutMode.create = function(namespace, options) {
                    function Mode() {
                        LayoutMode.apply(this, arguments);
                    }
                    Mode.prototype = Object.create(proto);
                    Mode.prototype.constructor = Mode;
                    if (options) Mode.options = options;
                    Mode.prototype.namespace = namespace;
                    LayoutMode.modes[namespace] = Mode;
                    return Mode;
                };
                return LayoutMode;
            }));
        },
        153: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(763) ], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, 
                __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(LayoutMode) {
                "use strict";
                var FitRows = LayoutMode.create("fitRows");
                var proto = FitRows.prototype;
                proto._resetLayout = function() {
                    this.x = 0;
                    this.y = 0;
                    this.maxY = 0;
                    this._getMeasurement("gutter", "outerWidth");
                };
                proto._getItemLayoutPosition = function(item) {
                    item.getSize();
                    var itemWidth = item.size.outerWidth + this.gutter;
                    var containerWidth = this.isotope.size.innerWidth + this.gutter;
                    if (this.x !== 0 && itemWidth + this.x > containerWidth) {
                        this.x = 0;
                        this.y = this.maxY;
                    }
                    var position = {
                        x: this.x,
                        y: this.y
                    };
                    this.maxY = Math.max(this.maxY, this.y + item.size.outerHeight);
                    this.x += itemWidth;
                    return position;
                };
                proto._getContainerSize = function() {
                    return {
                        height: this.maxY
                    };
                };
                return FitRows;
            }));
        },
        330: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
 * Masonry layout mode
 * sub-classes Masonry
 * https://masonry.desandro.com
 */            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(763), __webpack_require__(994) ], 
                __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(LayoutMode, Masonry) {
                "use strict";
                var MasonryMode = LayoutMode.create("masonry");
                var proto = MasonryMode.prototype;
                var keepModeMethods = {
                    _getElementOffset: true,
                    layout: true,
                    _getMeasurement: true
                };
                for (var method in Masonry.prototype) if (!keepModeMethods[method]) proto[method] = Masonry.prototype[method];
                var measureColumns = proto.measureColumns;
                proto.measureColumns = function() {
                    this.items = this.isotope.filteredItems;
                    measureColumns.call(this);
                };
                var _getOption = proto._getOption;
                proto._getOption = function(option) {
                    if (option == "fitWidth") return this.options.isFitWidth !== void 0 ? this.options.isFitWidth : this.options.fitWidth;
                    return _getOption.apply(this.isotope, arguments);
                };
                return MasonryMode;
            }));
        },
        987: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(763) ], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, 
                __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(LayoutMode) {
                "use strict";
                var Vertical = LayoutMode.create("vertical", {
                    horizontalAlignment: 0
                });
                var proto = Vertical.prototype;
                proto._resetLayout = function() {
                    this.y = 0;
                };
                proto._getItemLayoutPosition = function(item) {
                    item.getSize();
                    var x = (this.isotope.size.innerWidth - item.size.outerWidth) * this.options.horizontalAlignment;
                    var y = this.y;
                    this.y += item.size.outerHeight;
                    return {
                        x,
                        y
                    };
                };
                proto._getContainerSize = function() {
                    return {
                        height: this.y
                    };
                };
                return Vertical;
            }));
        },
        994: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(831), __webpack_require__(485) ], 
                __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(Outlayer, getSize) {
                "use strict";
                var Masonry = Outlayer.create("masonry");
                Masonry.compatOptions.fitWidth = "isFitWidth";
                var proto = Masonry.prototype;
                proto._resetLayout = function() {
                    this.getSize();
                    this._getMeasurement("columnWidth", "outerWidth");
                    this._getMeasurement("gutter", "outerWidth");
                    this.measureColumns();
                    this.colYs = [];
                    for (var i = 0; i < this.cols; i++) this.colYs.push(0);
                    this.maxY = 0;
                    this.horizontalColIndex = 0;
                };
                proto.measureColumns = function() {
                    this.getContainerWidth();
                    if (!this.columnWidth) {
                        var firstItem = this.items[0];
                        var firstItemElem = firstItem && firstItem.element;
                        this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth;
                    }
                    var columnWidth = this.columnWidth += this.gutter;
                    var containerWidth = this.containerWidth + this.gutter;
                    var cols = containerWidth / columnWidth;
                    var excess = columnWidth - containerWidth % columnWidth;
                    var mathMethod = excess && excess < 1 ? "round" : "floor";
                    cols = Math[mathMethod](cols);
                    this.cols = Math.max(cols, 1);
                };
                proto.getContainerWidth = function() {
                    var isFitWidth = this._getOption("fitWidth");
                    var container = isFitWidth ? this.element.parentNode : this.element;
                    var size = getSize(container);
                    this.containerWidth = size && size.innerWidth;
                };
                proto._getItemLayoutPosition = function(item) {
                    item.getSize();
                    var remainder = item.size.outerWidth % this.columnWidth;
                    var mathMethod = remainder && remainder < 1 ? "round" : "ceil";
                    var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
                    colSpan = Math.min(colSpan, this.cols);
                    var colPosMethod = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition";
                    var colPosition = this[colPosMethod](colSpan, item);
                    var position = {
                        x: this.columnWidth * colPosition.col,
                        y: colPosition.y
                    };
                    var setHeight = colPosition.y + item.size.outerHeight;
                    var setMax = colSpan + colPosition.col;
                    for (var i = colPosition.col; i < setMax; i++) this.colYs[i] = setHeight;
                    return position;
                };
                proto._getTopColPosition = function(colSpan) {
                    var colGroup = this._getTopColGroup(colSpan);
                    var minimumY = Math.min.apply(Math, colGroup);
                    return {
                        col: colGroup.indexOf(minimumY),
                        y: minimumY
                    };
                };
                proto._getTopColGroup = function(colSpan) {
                    if (colSpan < 2) return this.colYs;
                    var colGroup = [];
                    var groupCount = this.cols + 1 - colSpan;
                    for (var i = 0; i < groupCount; i++) colGroup[i] = this._getColGroupY(i, colSpan);
                    return colGroup;
                };
                proto._getColGroupY = function(col, colSpan) {
                    if (colSpan < 2) return this.colYs[col];
                    var groupColYs = this.colYs.slice(col, col + colSpan);
                    return Math.max.apply(Math, groupColYs);
                };
                proto._getHorizontalColPosition = function(colSpan, item) {
                    var col = this.horizontalColIndex % this.cols;
                    var isOver = colSpan > 1 && col + colSpan > this.cols;
                    col = isOver ? 0 : col;
                    var hasSize = item.size.outerWidth && item.size.outerHeight;
                    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
                    return {
                        col,
                        y: this._getColGroupY(col, colSpan)
                    };
                };
                proto._manageStamp = function(stamp) {
                    var stampSize = getSize(stamp);
                    var offset = this._getElementOffset(stamp);
                    var isOriginLeft = this._getOption("originLeft");
                    var firstX = isOriginLeft ? offset.left : offset.right;
                    var lastX = firstX + stampSize.outerWidth;
                    var firstCol = Math.floor(firstX / this.columnWidth);
                    firstCol = Math.max(0, firstCol);
                    var lastCol = Math.floor(lastX / this.columnWidth);
                    lastCol -= lastX % this.columnWidth ? 0 : 1;
                    lastCol = Math.min(this.cols - 1, lastCol);
                    var isOriginTop = this._getOption("originTop");
                    var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
                    for (var i = firstCol; i <= lastCol; i++) this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
                };
                proto._getContainerSize = function() {
                    this.maxY = Math.max.apply(Math, this.colYs);
                    var size = {
                        height: this.maxY
                    };
                    if (this._getOption("fitWidth")) size.width = this._getContainerFitWidth();
                    return size;
                };
                proto._getContainerFitWidth = function() {
                    var unusedCols = 0;
                    var i = this.cols;
                    while (--i) {
                        if (this.colYs[i] !== 0) break;
                        unusedCols++;
                    }
                    return (this.cols - unusedCols) * this.columnWidth - this.gutter;
                };
                proto.needsResizeLayout = function() {
                    var previousWidth = this.containerWidth;
                    this.getContainerWidth();
                    return previousWidth != this.containerWidth;
                };
                return Masonry;
            }));
        },
        169: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            (function(window, factory) {
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(137), __webpack_require__(485) ], 
                __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, 
                __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(EvEmitter, getSize) {
                "use strict";
                function isEmptyObj(obj) {
                    for (var prop in obj) return false;
                    null;
                    return true;
                }
                var docElemStyle = document.documentElement.style;
                var transitionProperty = typeof docElemStyle.transition == "string" ? "transition" : "WebkitTransition";
                var transformProperty = typeof docElemStyle.transform == "string" ? "transform" : "WebkitTransform";
                var transitionEndEvent = {
                    WebkitTransition: "webkitTransitionEnd",
                    transition: "transitionend"
                }[transitionProperty];
                var vendorProperties = {
                    transform: transformProperty,
                    transition: transitionProperty,
                    transitionDuration: transitionProperty + "Duration",
                    transitionProperty: transitionProperty + "Property",
                    transitionDelay: transitionProperty + "Delay"
                };
                function Item(element, layout) {
                    if (!element) return;
                    this.element = element;
                    this.layout = layout;
                    this.position = {
                        x: 0,
                        y: 0
                    };
                    this._create();
                }
                var proto = Item.prototype = Object.create(EvEmitter.prototype);
                proto.constructor = Item;
                proto._create = function() {
                    this._transn = {
                        ingProperties: {},
                        clean: {},
                        onEnd: {}
                    };
                    this.css({
                        position: "absolute"
                    });
                };
                proto.handleEvent = function(event) {
                    var method = "on" + event.type;
                    if (this[method]) this[method](event);
                };
                proto.getSize = function() {
                    this.size = getSize(this.element);
                };
                proto.css = function(style) {
                    var elemStyle = this.element.style;
                    for (var prop in style) {
                        var supportedProp = vendorProperties[prop] || prop;
                        elemStyle[supportedProp] = style[prop];
                    }
                };
                proto.getPosition = function() {
                    var style = getComputedStyle(this.element);
                    var isOriginLeft = this.layout._getOption("originLeft");
                    var isOriginTop = this.layout._getOption("originTop");
                    var xValue = style[isOriginLeft ? "left" : "right"];
                    var yValue = style[isOriginTop ? "top" : "bottom"];
                    var x = parseFloat(xValue);
                    var y = parseFloat(yValue);
                    var layoutSize = this.layout.size;
                    if (xValue.indexOf("%") != -1) x = x / 100 * layoutSize.width;
                    if (yValue.indexOf("%") != -1) y = y / 100 * layoutSize.height;
                    x = isNaN(x) ? 0 : x;
                    y = isNaN(y) ? 0 : y;
                    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
                    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
                    this.position.x = x;
                    this.position.y = y;
                };
                proto.layoutPosition = function() {
                    var layoutSize = this.layout.size;
                    var style = {};
                    var isOriginLeft = this.layout._getOption("originLeft");
                    var isOriginTop = this.layout._getOption("originTop");
                    var xPadding = isOriginLeft ? "paddingLeft" : "paddingRight";
                    var xProperty = isOriginLeft ? "left" : "right";
                    var xResetProperty = isOriginLeft ? "right" : "left";
                    var x = this.position.x + layoutSize[xPadding];
                    style[xProperty] = this.getXValue(x);
                    style[xResetProperty] = "";
                    var yPadding = isOriginTop ? "paddingTop" : "paddingBottom";
                    var yProperty = isOriginTop ? "top" : "bottom";
                    var yResetProperty = isOriginTop ? "bottom" : "top";
                    var y = this.position.y + layoutSize[yPadding];
                    style[yProperty] = this.getYValue(y);
                    style[yResetProperty] = "";
                    this.css(style);
                    this.emitEvent("layout", [ this ]);
                };
                proto.getXValue = function(x) {
                    var isHorizontal = this.layout._getOption("horizontal");
                    return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + "%" : x + "px";
                };
                proto.getYValue = function(y) {
                    var isHorizontal = this.layout._getOption("horizontal");
                    return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + "%" : y + "px";
                };
                proto._transitionTo = function(x, y) {
                    this.getPosition();
                    var curX = this.position.x;
                    var curY = this.position.y;
                    var didNotMove = x == this.position.x && y == this.position.y;
                    this.setPosition(x, y);
                    if (didNotMove && !this.isTransitioning) {
                        this.layoutPosition();
                        return;
                    }
                    var transX = x - curX;
                    var transY = y - curY;
                    var transitionStyle = {};
                    transitionStyle.transform = this.getTranslate(transX, transY);
                    this.transition({
                        to: transitionStyle,
                        onTransitionEnd: {
                            transform: this.layoutPosition
                        },
                        isCleaning: true
                    });
                };
                proto.getTranslate = function(x, y) {
                    var isOriginLeft = this.layout._getOption("originLeft");
                    var isOriginTop = this.layout._getOption("originTop");
                    x = isOriginLeft ? x : -x;
                    y = isOriginTop ? y : -y;
                    return "translate3d(" + x + "px, " + y + "px, 0)";
                };
                proto.goTo = function(x, y) {
                    this.setPosition(x, y);
                    this.layoutPosition();
                };
                proto.moveTo = proto._transitionTo;
                proto.setPosition = function(x, y) {
                    this.position.x = parseFloat(x);
                    this.position.y = parseFloat(y);
                };
                proto._nonTransition = function(args) {
                    this.css(args.to);
                    if (args.isCleaning) this._removeStyles(args.to);
                    for (var prop in args.onTransitionEnd) args.onTransitionEnd[prop].call(this);
                };
                proto.transition = function(args) {
                    if (!parseFloat(this.layout.options.transitionDuration)) {
                        this._nonTransition(args);
                        return;
                    }
                    var _transition = this._transn;
                    for (var prop in args.onTransitionEnd) _transition.onEnd[prop] = args.onTransitionEnd[prop];
                    for (prop in args.to) {
                        _transition.ingProperties[prop] = true;
                        if (args.isCleaning) _transition.clean[prop] = true;
                    }
                    if (args.from) {
                        this.css(args.from);
                        this.element.offsetHeight;
                        null;
                    }
                    this.enableTransition(args.to);
                    this.css(args.to);
                    this.isTransitioning = true;
                };
                function toDashedAll(str) {
                    return str.replace(/([A-Z])/g, (function($1) {
                        return "-" + $1.toLowerCase();
                    }));
                }
                var transitionProps = "opacity," + toDashedAll(transformProperty);
                proto.enableTransition = function() {
                    if (this.isTransitioning) return;
                    var duration = this.layout.options.transitionDuration;
                    duration = typeof duration == "number" ? duration + "ms" : duration;
                    this.css({
                        transitionProperty: transitionProps,
                        transitionDuration: duration,
                        transitionDelay: this.staggerDelay || 0
                    });
                    this.element.addEventListener(transitionEndEvent, this, false);
                };
                proto.onwebkitTransitionEnd = function(event) {
                    this.ontransitionend(event);
                };
                proto.onotransitionend = function(event) {
                    this.ontransitionend(event);
                };
                var dashedVendorProperties = {
                    "-webkit-transform": "transform"
                };
                proto.ontransitionend = function(event) {
                    if (event.target !== this.element) return;
                    var _transition = this._transn;
                    var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
                    delete _transition.ingProperties[propertyName];
                    if (isEmptyObj(_transition.ingProperties)) this.disableTransition();
                    if (propertyName in _transition.clean) {
                        this.element.style[event.propertyName] = "";
                        delete _transition.clean[propertyName];
                    }
                    if (propertyName in _transition.onEnd) {
                        var onTransitionEnd = _transition.onEnd[propertyName];
                        onTransitionEnd.call(this);
                        delete _transition.onEnd[propertyName];
                    }
                    this.emitEvent("transitionEnd", [ this ]);
                };
                proto.disableTransition = function() {
                    this.removeTransitionStyles();
                    this.element.removeEventListener(transitionEndEvent, this, false);
                    this.isTransitioning = false;
                };
                proto._removeStyles = function(style) {
                    var cleanStyle = {};
                    for (var prop in style) cleanStyle[prop] = "";
                    this.css(cleanStyle);
                };
                var cleanTransitionStyle = {
                    transitionProperty: "",
                    transitionDuration: "",
                    transitionDelay: ""
                };
                proto.removeTransitionStyles = function() {
                    this.css(cleanTransitionStyle);
                };
                proto.stagger = function(delay) {
                    delay = isNaN(delay) ? 0 : delay;
                    this.staggerDelay = delay + "ms";
                };
                proto.removeElem = function() {
                    this.element.parentNode.removeChild(this.element);
                    this.css({
                        display: ""
                    });
                    this.emitEvent("remove", [ this ]);
                };
                proto.remove = function() {
                    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
                        this.removeElem();
                        return;
                    }
                    this.once("transitionEnd", (function() {
                        this.removeElem();
                    }));
                    this.hide();
                };
                proto.reveal = function() {
                    delete this.isHidden;
                    this.css({
                        display: ""
                    });
                    var options = this.layout.options;
                    var onTransitionEnd = {};
                    var transitionEndProperty = this.getHideRevealTransitionEndProperty("visibleStyle");
                    onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
                    this.transition({
                        from: options.hiddenStyle,
                        to: options.visibleStyle,
                        isCleaning: true,
                        onTransitionEnd
                    });
                };
                proto.onRevealTransitionEnd = function() {
                    if (!this.isHidden) this.emitEvent("reveal");
                };
                proto.getHideRevealTransitionEndProperty = function(styleProperty) {
                    var optionStyle = this.layout.options[styleProperty];
                    if (optionStyle.opacity) return "opacity";
                    for (var prop in optionStyle) return prop;
                };
                proto.hide = function() {
                    this.isHidden = true;
                    this.css({
                        display: ""
                    });
                    var options = this.layout.options;
                    var onTransitionEnd = {};
                    var transitionEndProperty = this.getHideRevealTransitionEndProperty("hiddenStyle");
                    onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
                    this.transition({
                        from: options.visibleStyle,
                        to: options.hiddenStyle,
                        isCleaning: true,
                        onTransitionEnd
                    });
                };
                proto.onHideTransitionEnd = function() {
                    if (this.isHidden) {
                        this.css({
                            display: "none"
                        });
                        this.emitEvent("hide");
                    }
                };
                proto.destroy = function() {
                    this.css({
                        position: "",
                        left: "",
                        right: "",
                        top: "",
                        bottom: "",
                        transition: "",
                        transform: ""
                    });
                };
                return Item;
            }));
        },
        831: (module, exports, __webpack_require__) => {
            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
            /*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */            (function(window, factory) {
                "use strict";
                if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(137), __webpack_require__(485), __webpack_require__(358), __webpack_require__(169) ], 
                __WEBPACK_AMD_DEFINE_RESULT__ = function(EvEmitter, getSize, utils, Item) {
                    return factory(window, EvEmitter, getSize, utils, Item);
                }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            })(window, (function factory(window, EvEmitter, getSize, utils, Item) {
                "use strict";
                var console = window.console;
                var jQuery = window.jQuery;
                var noop = function() {};
                var GUID = 0;
                var instances = {};
                function Outlayer(element, options) {
                    var queryElement = utils.getQueryElement(element);
                    if (!queryElement) {
                        if (console) console.error("Bad element for " + this.constructor.namespace + ": " + (queryElement || element));
                        return;
                    }
                    this.element = queryElement;
                    if (jQuery) this.$element = jQuery(this.element);
                    this.options = utils.extend({}, this.constructor.defaults);
                    this.option(options);
                    var id = ++GUID;
                    this.element.outlayerGUID = id;
                    instances[id] = this;
                    this._create();
                    var isInitLayout = this._getOption("initLayout");
                    if (isInitLayout) this.layout();
                }
                Outlayer.namespace = "outlayer";
                Outlayer.Item = Item;
                Outlayer.defaults = {
                    containerStyle: {
                        position: "relative"
                    },
                    initLayout: true,
                    originLeft: true,
                    originTop: true,
                    resize: true,
                    resizeContainer: true,
                    transitionDuration: "0.4s",
                    hiddenStyle: {
                        opacity: 0,
                        transform: "scale(0.001)"
                    },
                    visibleStyle: {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                };
                var proto = Outlayer.prototype;
                utils.extend(proto, EvEmitter.prototype);
                proto.option = function(opts) {
                    utils.extend(this.options, opts);
                };
                proto._getOption = function(option) {
                    var oldOption = this.constructor.compatOptions[option];
                    return oldOption && this.options[oldOption] !== void 0 ? this.options[oldOption] : this.options[option];
                };
                Outlayer.compatOptions = {
                    initLayout: "isInitLayout",
                    horizontal: "isHorizontal",
                    layoutInstant: "isLayoutInstant",
                    originLeft: "isOriginLeft",
                    originTop: "isOriginTop",
                    resize: "isResizeBound",
                    resizeContainer: "isResizingContainer"
                };
                proto._create = function() {
                    this.reloadItems();
                    this.stamps = [];
                    this.stamp(this.options.stamp);
                    utils.extend(this.element.style, this.options.containerStyle);
                    var canBindResize = this._getOption("resize");
                    if (canBindResize) this.bindResize();
                };
                proto.reloadItems = function() {
                    this.items = this._itemize(this.element.children);
                };
                proto._itemize = function(elems) {
                    var itemElems = this._filterFindItemElements(elems);
                    var Item = this.constructor.Item;
                    var items = [];
                    for (var i = 0; i < itemElems.length; i++) {
                        var elem = itemElems[i];
                        var item = new Item(elem, this);
                        items.push(item);
                    }
                    return items;
                };
                proto._filterFindItemElements = function(elems) {
                    return utils.filterFindElements(elems, this.options.itemSelector);
                };
                proto.getItemElements = function() {
                    return this.items.map((function(item) {
                        return item.element;
                    }));
                };
                proto.layout = function() {
                    this._resetLayout();
                    this._manageStamps();
                    var layoutInstant = this._getOption("layoutInstant");
                    var isInstant = layoutInstant !== void 0 ? layoutInstant : !this._isLayoutInited;
                    this.layoutItems(this.items, isInstant);
                    this._isLayoutInited = true;
                };
                proto._init = proto.layout;
                proto._resetLayout = function() {
                    this.getSize();
                };
                proto.getSize = function() {
                    this.size = getSize(this.element);
                };
                proto._getMeasurement = function(measurement, size) {
                    var option = this.options[measurement];
                    var elem;
                    if (!option) this[measurement] = 0; else {
                        if (typeof option == "string") elem = this.element.querySelector(option); else if (option instanceof HTMLElement) elem = option;
                        this[measurement] = elem ? getSize(elem)[size] : option;
                    }
                };
                proto.layoutItems = function(items, isInstant) {
                    items = this._getItemsForLayout(items);
                    this._layoutItems(items, isInstant);
                    this._postLayout();
                };
                proto._getItemsForLayout = function(items) {
                    return items.filter((function(item) {
                        return !item.isIgnored;
                    }));
                };
                proto._layoutItems = function(items, isInstant) {
                    this._emitCompleteOnItems("layout", items);
                    if (!items || !items.length) return;
                    var queue = [];
                    items.forEach((function(item) {
                        var position = this._getItemLayoutPosition(item);
                        position.item = item;
                        position.isInstant = isInstant || item.isLayoutInstant;
                        queue.push(position);
                    }), this);
                    this._processLayoutQueue(queue);
                };
                proto._getItemLayoutPosition = function() {
                    return {
                        x: 0,
                        y: 0
                    };
                };
                proto._processLayoutQueue = function(queue) {
                    this.updateStagger();
                    queue.forEach((function(obj, i) {
                        this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
                    }), this);
                };
                proto.updateStagger = function() {
                    var stagger = this.options.stagger;
                    if (stagger === null || stagger === void 0) {
                        this.stagger = 0;
                        return;
                    }
                    this.stagger = getMilliseconds(stagger);
                    return this.stagger;
                };
                proto._positionItem = function(item, x, y, isInstant, i) {
                    if (isInstant) item.goTo(x, y); else {
                        item.stagger(i * this.stagger);
                        item.moveTo(x, y);
                    }
                };
                proto._postLayout = function() {
                    this.resizeContainer();
                };
                proto.resizeContainer = function() {
                    var isResizingContainer = this._getOption("resizeContainer");
                    if (!isResizingContainer) return;
                    var size = this._getContainerSize();
                    if (size) {
                        this._setContainerMeasure(size.width, true);
                        this._setContainerMeasure(size.height, false);
                    }
                };
                proto._getContainerSize = noop;
                proto._setContainerMeasure = function(measure, isWidth) {
                    if (measure === void 0) return;
                    var elemSize = this.size;
                    if (elemSize.isBorderBox) measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
                    measure = Math.max(measure, 0);
                    this.element.style[isWidth ? "width" : "height"] = measure + "px";
                };
                proto._emitCompleteOnItems = function(eventName, items) {
                    var _this = this;
                    function onComplete() {
                        _this.dispatchEvent(eventName + "Complete", null, [ items ]);
                    }
                    var count = items.length;
                    if (!items || !count) {
                        onComplete();
                        return;
                    }
                    var doneCount = 0;
                    function tick() {
                        doneCount++;
                        if (doneCount == count) onComplete();
                    }
                    items.forEach((function(item) {
                        item.once(eventName, tick);
                    }));
                };
                proto.dispatchEvent = function(type, event, args) {
                    var emitArgs = event ? [ event ].concat(args) : args;
                    this.emitEvent(type, emitArgs);
                    if (jQuery) {
                        this.$element = this.$element || jQuery(this.element);
                        if (event) {
                            var $event = jQuery.Event(event);
                            $event.type = type;
                            this.$element.trigger($event, args);
                        } else this.$element.trigger(type, args);
                    }
                };
                proto.ignore = function(elem) {
                    var item = this.getItem(elem);
                    if (item) item.isIgnored = true;
                };
                proto.unignore = function(elem) {
                    var item = this.getItem(elem);
                    if (item) delete item.isIgnored;
                };
                proto.stamp = function(elems) {
                    elems = this._find(elems);
                    if (!elems) return;
                    this.stamps = this.stamps.concat(elems);
                    elems.forEach(this.ignore, this);
                };
                proto.unstamp = function(elems) {
                    elems = this._find(elems);
                    if (!elems) return;
                    elems.forEach((function(elem) {
                        utils.removeFrom(this.stamps, elem);
                        this.unignore(elem);
                    }), this);
                };
                proto._find = function(elems) {
                    if (!elems) return;
                    if (typeof elems == "string") elems = this.element.querySelectorAll(elems);
                    elems = utils.makeArray(elems);
                    return elems;
                };
                proto._manageStamps = function() {
                    if (!this.stamps || !this.stamps.length) return;
                    this._getBoundingRect();
                    this.stamps.forEach(this._manageStamp, this);
                };
                proto._getBoundingRect = function() {
                    var boundingRect = this.element.getBoundingClientRect();
                    var size = this.size;
                    this._boundingRect = {
                        left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
                        top: boundingRect.top + size.paddingTop + size.borderTopWidth,
                        right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
                        bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
                    };
                };
                proto._manageStamp = noop;
                proto._getElementOffset = function(elem) {
                    var boundingRect = elem.getBoundingClientRect();
                    var thisRect = this._boundingRect;
                    var size = getSize(elem);
                    var offset = {
                        left: boundingRect.left - thisRect.left - size.marginLeft,
                        top: boundingRect.top - thisRect.top - size.marginTop,
                        right: thisRect.right - boundingRect.right - size.marginRight,
                        bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
                    };
                    return offset;
                };
                proto.handleEvent = utils.handleEvent;
                proto.bindResize = function() {
                    window.addEventListener("resize", this);
                    this.isResizeBound = true;
                };
                proto.unbindResize = function() {
                    window.removeEventListener("resize", this);
                    this.isResizeBound = false;
                };
                proto.onresize = function() {
                    this.resize();
                };
                utils.debounceMethod(Outlayer, "onresize", 100);
                proto.resize = function() {
                    if (!this.isResizeBound || !this.needsResizeLayout()) return;
                    this.layout();
                };
                proto.needsResizeLayout = function() {
                    var size = getSize(this.element);
                    var hasSizes = this.size && size;
                    return hasSizes && size.innerWidth !== this.size.innerWidth;
                };
                proto.addItems = function(elems) {
                    var items = this._itemize(elems);
                    if (items.length) this.items = this.items.concat(items);
                    return items;
                };
                proto.appended = function(elems) {
                    var items = this.addItems(elems);
                    if (!items.length) return;
                    this.layoutItems(items, true);
                    this.reveal(items);
                };
                proto.prepended = function(elems) {
                    var items = this._itemize(elems);
                    if (!items.length) return;
                    var previousItems = this.items.slice(0);
                    this.items = items.concat(previousItems);
                    this._resetLayout();
                    this._manageStamps();
                    this.layoutItems(items, true);
                    this.reveal(items);
                    this.layoutItems(previousItems);
                };
                proto.reveal = function(items) {
                    this._emitCompleteOnItems("reveal", items);
                    if (!items || !items.length) return;
                    var stagger = this.updateStagger();
                    items.forEach((function(item, i) {
                        item.stagger(i * stagger);
                        item.reveal();
                    }));
                };
                proto.hide = function(items) {
                    this._emitCompleteOnItems("hide", items);
                    if (!items || !items.length) return;
                    var stagger = this.updateStagger();
                    items.forEach((function(item, i) {
                        item.stagger(i * stagger);
                        item.hide();
                    }));
                };
                proto.revealItemElements = function(elems) {
                    var items = this.getItems(elems);
                    this.reveal(items);
                };
                proto.hideItemElements = function(elems) {
                    var items = this.getItems(elems);
                    this.hide(items);
                };
                proto.getItem = function(elem) {
                    for (var i = 0; i < this.items.length; i++) {
                        var item = this.items[i];
                        if (item.element == elem) return item;
                    }
                };
                proto.getItems = function(elems) {
                    elems = utils.makeArray(elems);
                    var items = [];
                    elems.forEach((function(elem) {
                        var item = this.getItem(elem);
                        if (item) items.push(item);
                    }), this);
                    return items;
                };
                proto.remove = function(elems) {
                    var removeItems = this.getItems(elems);
                    this._emitCompleteOnItems("remove", removeItems);
                    if (!removeItems || !removeItems.length) return;
                    removeItems.forEach((function(item) {
                        item.remove();
                        utils.removeFrom(this.items, item);
                    }), this);
                };
                proto.destroy = function() {
                    var style = this.element.style;
                    style.height = "";
                    style.position = "";
                    style.width = "";
                    this.items.forEach((function(item) {
                        item.destroy();
                    }));
                    this.unbindResize();
                    var id = this.element.outlayerGUID;
                    delete instances[id];
                    delete this.element.outlayerGUID;
                    if (jQuery) jQuery.removeData(this.element, this.constructor.namespace);
                };
                Outlayer.data = function(elem) {
                    elem = utils.getQueryElement(elem);
                    var id = elem && elem.outlayerGUID;
                    return id && instances[id];
                };
                Outlayer.create = function(namespace, options) {
                    var Layout = subclass(Outlayer);
                    Layout.defaults = utils.extend({}, Outlayer.defaults);
                    utils.extend(Layout.defaults, options);
                    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
                    Layout.namespace = namespace;
                    Layout.data = Outlayer.data;
                    Layout.Item = subclass(Item);
                    utils.htmlInit(Layout, namespace);
                    if (jQuery && jQuery.bridget) jQuery.bridget(namespace, Layout);
                    return Layout;
                };
                function subclass(Parent) {
                    function SubClass() {
                        Parent.apply(this, arguments);
                    }
                    SubClass.prototype = Object.create(Parent.prototype);
                    SubClass.prototype.constructor = SubClass;
                    return SubClass;
                }
                var msUnits = {
                    ms: 1,
                    s: 1e3
                };
                function getMilliseconds(time) {
                    if (typeof time == "number") return time;
                    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
                    var num = matches && matches[1];
                    var unit = matches && matches[2];
                    if (!num.length) return 0;
                    num = parseFloat(num);
                    var mult = msUnits[unit] || 1;
                    return num * mult;
                }
                Outlayer.Item = Item;
                return Outlayer;
            }));
        },
        633: module => {
            var x = String;
            var create = function() {
                return {
                    isColorSupported: false,
                    reset: x,
                    bold: x,
                    dim: x,
                    italic: x,
                    underline: x,
                    inverse: x,
                    hidden: x,
                    strikethrough: x,
                    black: x,
                    red: x,
                    green: x,
                    yellow: x,
                    blue: x,
                    magenta: x,
                    cyan: x,
                    white: x,
                    gray: x,
                    bgBlack: x,
                    bgRed: x,
                    bgGreen: x,
                    bgYellow: x,
                    bgBlue: x,
                    bgMagenta: x,
                    bgCyan: x,
                    bgWhite: x,
                    blackBright: x,
                    redBright: x,
                    greenBright: x,
                    yellowBright: x,
                    blueBright: x,
                    magentaBright: x,
                    cyanBright: x,
                    whiteBright: x,
                    bgBlackBright: x,
                    bgRedBright: x,
                    bgGreenBright: x,
                    bgYellowBright: x,
                    bgBlueBright: x,
                    bgMagentaBright: x,
                    bgCyanBright: x,
                    bgWhiteBright: x
                };
            };
            module.exports = create();
            module.exports.createColors = create;
        },
        396: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Container = __webpack_require__(793);
            class AtRule extends Container {
                constructor(defaults) {
                    super(defaults);
                    this.type = "atrule";
                }
                append(...children) {
                    if (!this.proxyOf.nodes) this.nodes = [];
                    return super.append(...children);
                }
                prepend(...children) {
                    if (!this.proxyOf.nodes) this.nodes = [];
                    return super.prepend(...children);
                }
            }
            module.exports = AtRule;
            AtRule.default = AtRule;
            Container.registerAtRule(AtRule);
        },
        371: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Node = __webpack_require__(152);
            class Comment extends Node {
                constructor(defaults) {
                    super(defaults);
                    this.type = "comment";
                }
            }
            module.exports = Comment;
            Comment.default = Comment;
        },
        793: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Comment = __webpack_require__(371);
            let Declaration = __webpack_require__(238);
            let Node = __webpack_require__(152);
            let {isClean, my} = __webpack_require__(151);
            let AtRule, parse, Root, Rule;
            function cleanSource(nodes) {
                return nodes.map((i => {
                    if (i.nodes) i.nodes = cleanSource(i.nodes);
                    delete i.source;
                    return i;
                }));
            }
            function markTreeDirty(node) {
                node[isClean] = false;
                if (node.proxyOf.nodes) for (let i of node.proxyOf.nodes) markTreeDirty(i);
            }
            class Container extends Node {
                append(...children) {
                    for (let child of children) {
                        let nodes = this.normalize(child, this.last);
                        for (let node of nodes) this.proxyOf.nodes.push(node);
                    }
                    this.markDirty();
                    return this;
                }
                cleanRaws(keepBetween) {
                    super.cleanRaws(keepBetween);
                    if (this.nodes) for (let node of this.nodes) node.cleanRaws(keepBetween);
                }
                each(callback) {
                    if (!this.proxyOf.nodes) return;
                    let iterator = this.getIterator();
                    let index, result;
                    while (this.indexes[iterator] < this.proxyOf.nodes.length) {
                        index = this.indexes[iterator];
                        result = callback(this.proxyOf.nodes[index], index);
                        if (result === false) break;
                        this.indexes[iterator] += 1;
                    }
                    delete this.indexes[iterator];
                    return result;
                }
                every(condition) {
                    return this.nodes.every(condition);
                }
                getIterator() {
                    if (!this.lastEach) this.lastEach = 0;
                    if (!this.indexes) this.indexes = {};
                    this.lastEach += 1;
                    let iterator = this.lastEach;
                    this.indexes[iterator] = 0;
                    return iterator;
                }
                getProxyProcessor() {
                    return {
                        get(node, prop) {
                            if (prop === "proxyOf") return node; else if (!node[prop]) return node[prop]; else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) return (...args) => node[prop](...args.map((i => {
                                if (typeof i === "function") return (child, index) => i(child.toProxy(), index); else return i;
                            }))); else if (prop === "every" || prop === "some") return cb => node[prop](((child, ...other) => cb(child.toProxy(), ...other))); else if (prop === "root") return () => node.root().toProxy(); else if (prop === "nodes") return node.nodes.map((i => i.toProxy())); else if (prop === "first" || prop === "last") return node[prop].toProxy(); else return node[prop];
                        },
                        set(node, prop, value) {
                            if (node[prop] === value) return true;
                            node[prop] = value;
                            if (prop === "name" || prop === "params" || prop === "selector") node.markDirty();
                            return true;
                        }
                    };
                }
                index(child) {
                    if (typeof child === "number") return child;
                    if (child.proxyOf) child = child.proxyOf;
                    return this.proxyOf.nodes.indexOf(child);
                }
                insertAfter(exist, add) {
                    let existIndex = this.index(exist);
                    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
                    existIndex = this.index(exist);
                    for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node);
                    let index;
                    for (let id in this.indexes) {
                        index = this.indexes[id];
                        if (existIndex < index) this.indexes[id] = index + nodes.length;
                    }
                    this.markDirty();
                    return this;
                }
                insertBefore(exist, add) {
                    let existIndex = this.index(exist);
                    let type = existIndex === 0 ? "prepend" : false;
                    let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
                    existIndex = this.index(exist);
                    for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node);
                    let index;
                    for (let id in this.indexes) {
                        index = this.indexes[id];
                        if (existIndex <= index) this.indexes[id] = index + nodes.length;
                    }
                    this.markDirty();
                    return this;
                }
                normalize(nodes, sample) {
                    if (typeof nodes === "string") nodes = cleanSource(parse(nodes).nodes); else if (typeof nodes === "undefined") nodes = []; else if (Array.isArray(nodes)) {
                        nodes = nodes.slice(0);
                        for (let i of nodes) if (i.parent) i.parent.removeChild(i, "ignore");
                    } else if (nodes.type === "root" && this.type !== "document") {
                        nodes = nodes.nodes.slice(0);
                        for (let i of nodes) if (i.parent) i.parent.removeChild(i, "ignore");
                    } else if (nodes.type) nodes = [ nodes ]; else if (nodes.prop) {
                        if (typeof nodes.value === "undefined") throw new Error("Value field is missed in node creation"); else if (typeof nodes.value !== "string") nodes.value = String(nodes.value);
                        nodes = [ new Declaration(nodes) ];
                    } else if (nodes.selector || nodes.selectors) nodes = [ new Rule(nodes) ]; else if (nodes.name) nodes = [ new AtRule(nodes) ]; else if (nodes.text) nodes = [ new Comment(nodes) ]; else throw new Error("Unknown node type in node creation");
                    let processed = nodes.map((i => {
                        if (!i[my] || !i.markClean) Container.rebuild(i);
                        i = i.proxyOf;
                        if (i.parent) i.parent.removeChild(i);
                        if (i[isClean]) markTreeDirty(i);
                        if (typeof i.raws.before === "undefined") if (sample && typeof sample.raws.before !== "undefined") i.raws.before = sample.raws.before.replace(/\S/g, "");
                        i.parent = this.proxyOf;
                        return i;
                    }));
                    return processed;
                }
                prepend(...children) {
                    children = children.reverse();
                    for (let child of children) {
                        let nodes = this.normalize(child, this.first, "prepend").reverse();
                        for (let node of nodes) this.proxyOf.nodes.unshift(node);
                        for (let id in this.indexes) this.indexes[id] = this.indexes[id] + nodes.length;
                    }
                    this.markDirty();
                    return this;
                }
                push(child) {
                    child.parent = this;
                    this.proxyOf.nodes.push(child);
                    return this;
                }
                removeAll() {
                    for (let node of this.proxyOf.nodes) node.parent = void 0;
                    this.proxyOf.nodes = [];
                    this.markDirty();
                    return this;
                }
                removeChild(child) {
                    child = this.index(child);
                    this.proxyOf.nodes[child].parent = void 0;
                    this.proxyOf.nodes.splice(child, 1);
                    let index;
                    for (let id in this.indexes) {
                        index = this.indexes[id];
                        if (index >= child) this.indexes[id] = index - 1;
                    }
                    this.markDirty();
                    return this;
                }
                replaceValues(pattern, opts, callback) {
                    if (!callback) {
                        callback = opts;
                        opts = {};
                    }
                    this.walkDecls((decl => {
                        if (opts.props && !opts.props.includes(decl.prop)) return;
                        if (opts.fast && !decl.value.includes(opts.fast)) return;
                        decl.value = decl.value.replace(pattern, callback);
                    }));
                    this.markDirty();
                    return this;
                }
                some(condition) {
                    return this.nodes.some(condition);
                }
                walk(callback) {
                    return this.each(((child, i) => {
                        let result;
                        try {
                            result = callback(child, i);
                        } catch (e) {
                            throw child.addToError(e);
                        }
                        if (result !== false && child.walk) result = child.walk(callback);
                        return result;
                    }));
                }
                walkAtRules(name, callback) {
                    if (!callback) {
                        callback = name;
                        return this.walk(((child, i) => {
                            if (child.type === "atrule") return callback(child, i);
                        }));
                    }
                    if (name instanceof RegExp) return this.walk(((child, i) => {
                        if (child.type === "atrule" && name.test(child.name)) return callback(child, i);
                    }));
                    return this.walk(((child, i) => {
                        if (child.type === "atrule" && child.name === name) return callback(child, i);
                    }));
                }
                walkComments(callback) {
                    return this.walk(((child, i) => {
                        if (child.type === "comment") return callback(child, i);
                    }));
                }
                walkDecls(prop, callback) {
                    if (!callback) {
                        callback = prop;
                        return this.walk(((child, i) => {
                            if (child.type === "decl") return callback(child, i);
                        }));
                    }
                    if (prop instanceof RegExp) return this.walk(((child, i) => {
                        if (child.type === "decl" && prop.test(child.prop)) return callback(child, i);
                    }));
                    return this.walk(((child, i) => {
                        if (child.type === "decl" && child.prop === prop) return callback(child, i);
                    }));
                }
                walkRules(selector, callback) {
                    if (!callback) {
                        callback = selector;
                        return this.walk(((child, i) => {
                            if (child.type === "rule") return callback(child, i);
                        }));
                    }
                    if (selector instanceof RegExp) return this.walk(((child, i) => {
                        if (child.type === "rule" && selector.test(child.selector)) return callback(child, i);
                    }));
                    return this.walk(((child, i) => {
                        if (child.type === "rule" && child.selector === selector) return callback(child, i);
                    }));
                }
                get first() {
                    if (!this.proxyOf.nodes) return;
                    return this.proxyOf.nodes[0];
                }
                get last() {
                    if (!this.proxyOf.nodes) return;
                    return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
                }
            }
            Container.registerParse = dependant => {
                parse = dependant;
            };
            Container.registerRule = dependant => {
                Rule = dependant;
            };
            Container.registerAtRule = dependant => {
                AtRule = dependant;
            };
            Container.registerRoot = dependant => {
                Root = dependant;
            };
            module.exports = Container;
            Container.default = Container;
            Container.rebuild = node => {
                if (node.type === "atrule") Object.setPrototypeOf(node, AtRule.prototype); else if (node.type === "rule") Object.setPrototypeOf(node, Rule.prototype); else if (node.type === "decl") Object.setPrototypeOf(node, Declaration.prototype); else if (node.type === "comment") Object.setPrototypeOf(node, Comment.prototype); else if (node.type === "root") Object.setPrototypeOf(node, Root.prototype);
                node[my] = true;
                if (node.nodes) node.nodes.forEach((child => {
                    Container.rebuild(child);
                }));
            };
        },
        614: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let pico = __webpack_require__(633);
            let terminalHighlight = __webpack_require__(746);
            class CssSyntaxError extends Error {
                constructor(message, line, column, source, file, plugin) {
                    super(message);
                    this.name = "CssSyntaxError";
                    this.reason = message;
                    if (file) this.file = file;
                    if (source) this.source = source;
                    if (plugin) this.plugin = plugin;
                    if (typeof line !== "undefined" && typeof column !== "undefined") if (typeof line === "number") {
                        this.line = line;
                        this.column = column;
                    } else {
                        this.line = line.line;
                        this.column = line.column;
                        this.endLine = column.line;
                        this.endColumn = column.column;
                    }
                    this.setMessage();
                    if (Error.captureStackTrace) Error.captureStackTrace(this, CssSyntaxError);
                }
                setMessage() {
                    this.message = this.plugin ? this.plugin + ": " : "";
                    this.message += this.file ? this.file : "<css input>";
                    if (typeof this.line !== "undefined") this.message += ":" + this.line + ":" + this.column;
                    this.message += ": " + this.reason;
                }
                showSourceCode(color) {
                    if (!this.source) return "";
                    let css = this.source;
                    if (color == null) color = pico.isColorSupported;
                    let aside = text => text;
                    let mark = text => text;
                    let highlight = text => text;
                    if (color) {
                        let {bold, gray, red} = pico.createColors(true);
                        mark = text => bold(red(text));
                        aside = text => gray(text);
                        if (terminalHighlight) highlight = text => terminalHighlight(text);
                    }
                    let lines = css.split(/\r?\n/);
                    let start = Math.max(this.line - 3, 0);
                    let end = Math.min(this.line + 2, lines.length);
                    let maxWidth = String(end).length;
                    return lines.slice(start, end).map(((line, index) => {
                        let number = start + 1 + index;
                        let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
                        if (number === this.line) {
                            if (line.length > 160) {
                                let padding = 20;
                                let subLineStart = Math.max(0, this.column - padding);
                                let subLineEnd = Math.max(this.column + padding, this.endColumn + padding);
                                let subLine = line.slice(subLineStart, subLineEnd);
                                let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, padding - 1)).replace(/[^\t]/g, " ");
                                return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing + mark("^");
                            }
                            let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
                            return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
                        }
                        return " " + aside(gutter) + highlight(line);
                    })).join("\n");
                }
                toString() {
                    let code = this.showSourceCode();
                    if (code) code = "\n\n" + code + "\n";
                    return this.name + ": " + this.message + code;
                }
            }
            module.exports = CssSyntaxError;
            CssSyntaxError.default = CssSyntaxError;
        },
        238: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Node = __webpack_require__(152);
            class Declaration extends Node {
                constructor(defaults) {
                    if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") defaults = {
                        ...defaults,
                        value: String(defaults.value)
                    };
                    super(defaults);
                    this.type = "decl";
                }
                get variable() {
                    return this.prop.startsWith("--") || this.prop[0] === "$";
                }
            }
            module.exports = Declaration;
            Declaration.default = Declaration;
        },
        145: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Container = __webpack_require__(793);
            let LazyResult, Processor;
            class Document extends Container {
                constructor(defaults) {
                    super({
                        type: "document",
                        ...defaults
                    });
                    if (!this.nodes) this.nodes = [];
                }
                toResult(opts = {}) {
                    let lazy = new LazyResult(new Processor, this, opts);
                    return lazy.stringify();
                }
            }
            Document.registerLazyResult = dependant => {
                LazyResult = dependant;
            };
            Document.registerProcessor = dependant => {
                Processor = dependant;
            };
            module.exports = Document;
            Document.default = Document;
        },
        438: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let AtRule = __webpack_require__(396);
            let Comment = __webpack_require__(371);
            let Declaration = __webpack_require__(238);
            let Input = __webpack_require__(106);
            let PreviousMap = __webpack_require__(878);
            let Root = __webpack_require__(644);
            let Rule = __webpack_require__(534);
            function fromJSON(json, inputs) {
                if (Array.isArray(json)) return json.map((n => fromJSON(n)));
                let {inputs: ownInputs, ...defaults} = json;
                if (ownInputs) {
                    inputs = [];
                    for (let input of ownInputs) {
                        let inputHydrated = {
                            ...input,
                            __proto__: Input.prototype
                        };
                        if (inputHydrated.map) inputHydrated.map = {
                            ...inputHydrated.map,
                            __proto__: PreviousMap.prototype
                        };
                        inputs.push(inputHydrated);
                    }
                }
                if (defaults.nodes) defaults.nodes = json.nodes.map((n => fromJSON(n, inputs)));
                if (defaults.source) {
                    let {inputId, ...source} = defaults.source;
                    defaults.source = source;
                    if (inputId != null) defaults.source.input = inputs[inputId];
                }
                if (defaults.type === "root") return new Root(defaults); else if (defaults.type === "decl") return new Declaration(defaults); else if (defaults.type === "rule") return new Rule(defaults); else if (defaults.type === "comment") return new Comment(defaults); else if (defaults.type === "atrule") return new AtRule(defaults); else throw new Error("Unknown node type: " + json.type);
            }
            module.exports = fromJSON;
            fromJSON.default = fromJSON;
        },
        106: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let {nanoid} = __webpack_require__(42);
            let {isAbsolute, resolve} = __webpack_require__(197);
            let {SourceMapConsumer, SourceMapGenerator} = __webpack_require__(866);
            let {fileURLToPath, pathToFileURL} = __webpack_require__(739);
            let CssSyntaxError = __webpack_require__(614);
            let PreviousMap = __webpack_require__(878);
            let terminalHighlight = __webpack_require__(746);
            let fromOffsetCache = Symbol("fromOffsetCache");
            let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
            let pathAvailable = Boolean(resolve && isAbsolute);
            class Input {
                constructor(css, opts = {}) {
                    if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) throw new Error(`PostCSS received ${css} instead of CSS string`);
                    this.css = css.toString();
                    if (this.css[0] === "\ufeff" || this.css[0] === "￾") {
                        this.hasBOM = true;
                        this.css = this.css.slice(1);
                    } else this.hasBOM = false;
                    if (opts.from) if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) this.file = opts.from; else this.file = resolve(opts.from);
                    if (pathAvailable && sourceMapAvailable) {
                        let map = new PreviousMap(this.css, opts);
                        if (map.text) {
                            this.map = map;
                            let file = map.consumer().file;
                            if (!this.file && file) this.file = this.mapResolve(file);
                        }
                    }
                    if (!this.file) this.id = "<input css " + nanoid(6) + ">";
                    if (this.map) this.map.file = this.from;
                }
                error(message, line, column, opts = {}) {
                    let endColumn, endLine, result;
                    if (line && typeof line === "object") {
                        let start = line;
                        let end = column;
                        if (typeof start.offset === "number") {
                            let pos = this.fromOffset(start.offset);
                            line = pos.line;
                            column = pos.col;
                        } else {
                            line = start.line;
                            column = start.column;
                        }
                        if (typeof end.offset === "number") {
                            let pos = this.fromOffset(end.offset);
                            endLine = pos.line;
                            endColumn = pos.col;
                        } else {
                            endLine = end.line;
                            endColumn = end.column;
                        }
                    } else if (!column) {
                        let pos = this.fromOffset(line);
                        line = pos.line;
                        column = pos.col;
                    }
                    let origin = this.origin(line, column, endLine, endColumn);
                    if (origin) result = new CssSyntaxError(message, origin.endLine === void 0 ? origin.line : {
                        column: origin.column,
                        line: origin.line
                    }, origin.endLine === void 0 ? origin.column : {
                        column: origin.endColumn,
                        line: origin.endLine
                    }, origin.source, origin.file, opts.plugin); else result = new CssSyntaxError(message, endLine === void 0 ? line : {
                        column,
                        line
                    }, endLine === void 0 ? column : {
                        column: endColumn,
                        line: endLine
                    }, this.css, this.file, opts.plugin);
                    result.input = {
                        column,
                        endColumn,
                        endLine,
                        line,
                        source: this.css
                    };
                    if (this.file) {
                        if (pathToFileURL) result.input.url = pathToFileURL(this.file).toString();
                        result.input.file = this.file;
                    }
                    return result;
                }
                fromOffset(offset) {
                    let lastLine, lineToIndex;
                    if (!this[fromOffsetCache]) {
                        let lines = this.css.split("\n");
                        lineToIndex = new Array(lines.length);
                        let prevIndex = 0;
                        for (let i = 0, l = lines.length; i < l; i++) {
                            lineToIndex[i] = prevIndex;
                            prevIndex += lines[i].length + 1;
                        }
                        this[fromOffsetCache] = lineToIndex;
                    } else lineToIndex = this[fromOffsetCache];
                    lastLine = lineToIndex[lineToIndex.length - 1];
                    let min = 0;
                    if (offset >= lastLine) min = lineToIndex.length - 1; else {
                        let max = lineToIndex.length - 2;
                        let mid;
                        while (min < max) {
                            mid = min + (max - min >> 1);
                            if (offset < lineToIndex[mid]) max = mid - 1; else if (offset >= lineToIndex[mid + 1]) min = mid + 1; else {
                                min = mid;
                                break;
                            }
                        }
                    }
                    return {
                        col: offset - lineToIndex[min] + 1,
                        line: min + 1
                    };
                }
                mapResolve(file) {
                    if (/^\w+:\/\//.test(file)) return file;
                    return resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
                }
                origin(line, column, endLine, endColumn) {
                    if (!this.map) return false;
                    let consumer = this.map.consumer();
                    let from = consumer.originalPositionFor({
                        column,
                        line
                    });
                    if (!from.source) return false;
                    let to;
                    if (typeof endLine === "number") to = consumer.originalPositionFor({
                        column: endColumn,
                        line: endLine
                    });
                    let fromUrl;
                    if (isAbsolute(from.source)) fromUrl = pathToFileURL(from.source); else fromUrl = new URL(from.source, this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile));
                    let result = {
                        column: from.column,
                        endColumn: to && to.column,
                        endLine: to && to.line,
                        line: from.line,
                        url: fromUrl.toString()
                    };
                    if (fromUrl.protocol === "file:") if (fileURLToPath) result.file = fileURLToPath(fromUrl); else throw new Error(`file: protocol is not available in this PostCSS build`);
                    let source = consumer.sourceContentFor(from.source);
                    if (source) result.source = source;
                    return result;
                }
                toJSON() {
                    let json = {};
                    for (let name of [ "hasBOM", "css", "file", "id" ]) if (this[name] != null) json[name] = this[name];
                    if (this.map) {
                        json.map = {
                            ...this.map
                        };
                        if (json.map.consumerCache) json.map.consumerCache = void 0;
                    }
                    return json;
                }
                get from() {
                    return this.file || this.id;
                }
            }
            module.exports = Input;
            Input.default = Input;
            if (terminalHighlight && terminalHighlight.registerInput) terminalHighlight.registerInput(Input);
        },
        966: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Container = __webpack_require__(793);
            let Document = __webpack_require__(145);
            let MapGenerator = __webpack_require__(604);
            let parse = __webpack_require__(577);
            let Result = __webpack_require__(717);
            let Root = __webpack_require__(644);
            let stringify = __webpack_require__(303);
            let {isClean, my} = __webpack_require__(151);
            __webpack_require__(156);
            const TYPE_TO_CLASS_NAME = {
                atrule: "AtRule",
                comment: "Comment",
                decl: "Declaration",
                document: "Document",
                root: "Root",
                rule: "Rule"
            };
            const PLUGIN_PROPS = {
                AtRule: true,
                AtRuleExit: true,
                Comment: true,
                CommentExit: true,
                Declaration: true,
                DeclarationExit: true,
                Document: true,
                DocumentExit: true,
                Once: true,
                OnceExit: true,
                postcssPlugin: true,
                prepare: true,
                Root: true,
                RootExit: true,
                Rule: true,
                RuleExit: true
            };
            const NOT_VISITORS = {
                Once: true,
                postcssPlugin: true,
                prepare: true
            };
            const CHILDREN = 0;
            function isPromise(obj) {
                return typeof obj === "object" && typeof obj.then === "function";
            }
            function getEvents(node) {
                let key = false;
                let type = TYPE_TO_CLASS_NAME[node.type];
                if (node.type === "decl") key = node.prop.toLowerCase(); else if (node.type === "atrule") key = node.name.toLowerCase();
                if (key && node.append) return [ type, type + "-" + key, CHILDREN, type + "Exit", type + "Exit-" + key ]; else if (key) return [ type, type + "-" + key, type + "Exit", type + "Exit-" + key ]; else if (node.append) return [ type, CHILDREN, type + "Exit" ]; else return [ type, type + "Exit" ];
            }
            function toStack(node) {
                let events;
                if (node.type === "document") events = [ "Document", CHILDREN, "DocumentExit" ]; else if (node.type === "root") events = [ "Root", CHILDREN, "RootExit" ]; else events = getEvents(node);
                return {
                    eventIndex: 0,
                    events,
                    iterator: 0,
                    node,
                    visitorIndex: 0,
                    visitors: []
                };
            }
            function cleanMarks(node) {
                node[isClean] = false;
                if (node.nodes) node.nodes.forEach((i => cleanMarks(i)));
                return node;
            }
            let postcss = {};
            class LazyResult {
                constructor(processor, css, opts) {
                    this.stringified = false;
                    this.processed = false;
                    let root;
                    if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) root = cleanMarks(css); else if (css instanceof LazyResult || css instanceof Result) {
                        root = cleanMarks(css.root);
                        if (css.map) {
                            if (typeof opts.map === "undefined") opts.map = {};
                            if (!opts.map.inline) opts.map.inline = false;
                            opts.map.prev = css.map;
                        }
                    } else {
                        let parser = parse;
                        if (opts.syntax) parser = opts.syntax.parse;
                        if (opts.parser) parser = opts.parser;
                        if (parser.parse) parser = parser.parse;
                        try {
                            root = parser(css, opts);
                        } catch (error) {
                            this.processed = true;
                            this.error = error;
                        }
                        if (root && !root[my]) Container.rebuild(root);
                    }
                    this.result = new Result(processor, root, opts);
                    this.helpers = {
                        ...postcss,
                        postcss,
                        result: this.result
                    };
                    this.plugins = this.processor.plugins.map((plugin => {
                        if (typeof plugin === "object" && plugin.prepare) return {
                            ...plugin,
                            ...plugin.prepare(this.result)
                        }; else return plugin;
                    }));
                }
                async() {
                    if (this.error) return Promise.reject(this.error);
                    if (this.processed) return Promise.resolve(this.result);
                    if (!this.processing) this.processing = this.runAsync();
                    return this.processing;
                }
                catch(onRejected) {
                    return this.async().catch(onRejected);
                }
                finally(onFinally) {
                    return this.async().then(onFinally, onFinally);
                }
                getAsyncError() {
                    throw new Error("Use process(css).then(cb) to work with async plugins");
                }
                handleError(error, node) {
                    let plugin = this.result.lastPlugin;
                    try {
                        if (node) node.addToError(error);
                        this.error = error;
                        if (error.name === "CssSyntaxError" && !error.plugin) {
                            error.plugin = plugin.postcssPlugin;
                            error.setMessage();
                        } else if (plugin.postcssVersion) if (false) ;
                    } catch (err) {
                        if (console && console.error) console.error(err);
                    }
                    return error;
                }
                prepareVisitors() {
                    this.listeners = {};
                    let add = (plugin, type, cb) => {
                        if (!this.listeners[type]) this.listeners[type] = [];
                        this.listeners[type].push([ plugin, cb ]);
                    };
                    for (let plugin of this.plugins) if (typeof plugin === "object") for (let event in plugin) {
                        if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) throw new Error(`Unknown event ${event} in ${plugin.postcssPlugin}. ` + `Try to update PostCSS (${this.processor.version} now).`);
                        if (!NOT_VISITORS[event]) if (typeof plugin[event] === "object") for (let filter in plugin[event]) if (filter === "*") add(plugin, event, plugin[event][filter]); else add(plugin, event + "-" + filter.toLowerCase(), plugin[event][filter]); else if (typeof plugin[event] === "function") add(plugin, event, plugin[event]);
                    }
                    this.hasListener = Object.keys(this.listeners).length > 0;
                }
                async runAsync() {
                    this.plugin = 0;
                    for (let i = 0; i < this.plugins.length; i++) {
                        let plugin = this.plugins[i];
                        let promise = this.runOnRoot(plugin);
                        if (isPromise(promise)) try {
                            await promise;
                        } catch (error) {
                            throw this.handleError(error);
                        }
                    }
                    this.prepareVisitors();
                    if (this.hasListener) {
                        let root = this.result.root;
                        while (!root[isClean]) {
                            root[isClean] = true;
                            let stack = [ toStack(root) ];
                            while (stack.length > 0) {
                                let promise = this.visitTick(stack);
                                if (isPromise(promise)) try {
                                    await promise;
                                } catch (e) {
                                    let node = stack[stack.length - 1].node;
                                    throw this.handleError(e, node);
                                }
                            }
                        }
                        if (this.listeners.OnceExit) for (let [plugin, visitor] of this.listeners.OnceExit) {
                            this.result.lastPlugin = plugin;
                            try {
                                if (root.type === "document") {
                                    let roots = root.nodes.map((subRoot => visitor(subRoot, this.helpers)));
                                    await Promise.all(roots);
                                } else await visitor(root, this.helpers);
                            } catch (e) {
                                throw this.handleError(e);
                            }
                        }
                    }
                    this.processed = true;
                    return this.stringify();
                }
                runOnRoot(plugin) {
                    this.result.lastPlugin = plugin;
                    try {
                        if (typeof plugin === "object" && plugin.Once) {
                            if (this.result.root.type === "document") {
                                let roots = this.result.root.nodes.map((root => plugin.Once(root, this.helpers)));
                                if (isPromise(roots[0])) return Promise.all(roots);
                                return roots;
                            }
                            return plugin.Once(this.result.root, this.helpers);
                        } else if (typeof plugin === "function") return plugin(this.result.root, this.result);
                    } catch (error) {
                        throw this.handleError(error);
                    }
                }
                stringify() {
                    if (this.error) throw this.error;
                    if (this.stringified) return this.result;
                    this.stringified = true;
                    this.sync();
                    let opts = this.result.opts;
                    let str = stringify;
                    if (opts.syntax) str = opts.syntax.stringify;
                    if (opts.stringifier) str = opts.stringifier;
                    if (str.stringify) str = str.stringify;
                    let map = new MapGenerator(str, this.result.root, this.result.opts);
                    let data = map.generate();
                    this.result.css = data[0];
                    this.result.map = data[1];
                    return this.result;
                }
                sync() {
                    if (this.error) throw this.error;
                    if (this.processed) return this.result;
                    this.processed = true;
                    if (this.processing) throw this.getAsyncError();
                    for (let plugin of this.plugins) {
                        let promise = this.runOnRoot(plugin);
                        if (isPromise(promise)) throw this.getAsyncError();
                    }
                    this.prepareVisitors();
                    if (this.hasListener) {
                        let root = this.result.root;
                        while (!root[isClean]) {
                            root[isClean] = true;
                            this.walkSync(root);
                        }
                        if (this.listeners.OnceExit) if (root.type === "document") for (let subRoot of root.nodes) this.visitSync(this.listeners.OnceExit, subRoot); else this.visitSync(this.listeners.OnceExit, root);
                    }
                    return this.result;
                }
                then(onFulfilled, onRejected) {
                    if (false) ;
                    return this.async().then(onFulfilled, onRejected);
                }
                toString() {
                    return this.css;
                }
                visitSync(visitors, node) {
                    for (let [plugin, visitor] of visitors) {
                        this.result.lastPlugin = plugin;
                        let promise;
                        try {
                            promise = visitor(node, this.helpers);
                        } catch (e) {
                            throw this.handleError(e, node.proxyOf);
                        }
                        if (node.type !== "root" && node.type !== "document" && !node.parent) return true;
                        if (isPromise(promise)) throw this.getAsyncError();
                    }
                }
                visitTick(stack) {
                    let visit = stack[stack.length - 1];
                    let {node, visitors} = visit;
                    if (node.type !== "root" && node.type !== "document" && !node.parent) {
                        stack.pop();
                        return;
                    }
                    if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
                        let [plugin, visitor] = visitors[visit.visitorIndex];
                        visit.visitorIndex += 1;
                        if (visit.visitorIndex === visitors.length) {
                            visit.visitors = [];
                            visit.visitorIndex = 0;
                        }
                        this.result.lastPlugin = plugin;
                        try {
                            return visitor(node.toProxy(), this.helpers);
                        } catch (e) {
                            throw this.handleError(e, node);
                        }
                    }
                    if (visit.iterator !== 0) {
                        let iterator = visit.iterator;
                        let child;
                        while (child = node.nodes[node.indexes[iterator]]) {
                            node.indexes[iterator] += 1;
                            if (!child[isClean]) {
                                child[isClean] = true;
                                stack.push(toStack(child));
                                return;
                            }
                        }
                        visit.iterator = 0;
                        delete node.indexes[iterator];
                    }
                    let events = visit.events;
                    while (visit.eventIndex < events.length) {
                        let event = events[visit.eventIndex];
                        visit.eventIndex += 1;
                        if (event === CHILDREN) {
                            if (node.nodes && node.nodes.length) {
                                node[isClean] = true;
                                visit.iterator = node.getIterator();
                            }
                            return;
                        } else if (this.listeners[event]) {
                            visit.visitors = this.listeners[event];
                            return;
                        }
                    }
                    stack.pop();
                }
                walkSync(node) {
                    node[isClean] = true;
                    let events = getEvents(node);
                    for (let event of events) if (event === CHILDREN) {
                        if (node.nodes) node.each((child => {
                            if (!child[isClean]) this.walkSync(child);
                        }));
                    } else {
                        let visitors = this.listeners[event];
                        if (visitors) if (this.visitSync(visitors, node.toProxy())) return;
                    }
                }
                warnings() {
                    return this.sync().warnings();
                }
                get content() {
                    return this.stringify().content;
                }
                get css() {
                    return this.stringify().css;
                }
                get map() {
                    return this.stringify().map;
                }
                get messages() {
                    return this.sync().messages;
                }
                get opts() {
                    return this.result.opts;
                }
                get processor() {
                    return this.result.processor;
                }
                get root() {
                    return this.sync().root;
                }
                get [Symbol.toStringTag]() {
                    return "LazyResult";
                }
            }
            LazyResult.registerPostcss = dependant => {
                postcss = dependant;
            };
            module.exports = LazyResult;
            LazyResult.default = LazyResult;
            Root.registerLazyResult(LazyResult);
            Document.registerLazyResult(LazyResult);
        },
        752: module => {
            "use strict";
            let list = {
                comma(string) {
                    return list.split(string, [ "," ], true);
                },
                space(string) {
                    let spaces = [ " ", "\n", "\t" ];
                    return list.split(string, spaces);
                },
                split(string, separators, last) {
                    let array = [];
                    let current = "";
                    let split = false;
                    let func = 0;
                    let inQuote = false;
                    let prevQuote = "";
                    let escape = false;
                    for (let letter of string) {
                        if (escape) escape = false; else if (letter === "\\") escape = true; else if (inQuote) {
                            if (letter === prevQuote) inQuote = false;
                        } else if (letter === '"' || letter === "'") {
                            inQuote = true;
                            prevQuote = letter;
                        } else if (letter === "(") func += 1; else if (letter === ")") {
                            if (func > 0) func -= 1;
                        } else if (func === 0) if (separators.includes(letter)) split = true;
                        if (split) {
                            if (current !== "") array.push(current.trim());
                            current = "";
                            split = false;
                        } else current += letter;
                    }
                    if (last || current !== "") array.push(current.trim());
                    return array;
                }
            };
            module.exports = list;
            list.default = list;
        },
        604: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let {dirname, relative, resolve, sep} = __webpack_require__(197);
            let {SourceMapConsumer, SourceMapGenerator} = __webpack_require__(866);
            let {pathToFileURL} = __webpack_require__(739);
            let Input = __webpack_require__(106);
            let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
            let pathAvailable = Boolean(dirname && resolve && relative && sep);
            class MapGenerator {
                constructor(stringify, root, opts, cssString) {
                    this.stringify = stringify;
                    this.mapOpts = opts.map || {};
                    this.root = root;
                    this.opts = opts;
                    this.css = cssString;
                    this.originalCSS = cssString;
                    this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
                    this.memoizedFileURLs = new Map;
                    this.memoizedPaths = new Map;
                    this.memoizedURLs = new Map;
                }
                addAnnotation() {
                    let content;
                    if (this.isInline()) content = "data:application/json;base64," + this.toBase64(this.map.toString()); else if (typeof this.mapOpts.annotation === "string") content = this.mapOpts.annotation; else if (typeof this.mapOpts.annotation === "function") content = this.mapOpts.annotation(this.opts.to, this.root); else content = this.outputFile() + ".map";
                    let eol = "\n";
                    if (this.css.includes("\r\n")) eol = "\r\n";
                    this.css += eol + "/*# sourceMappingURL=" + content + " */";
                }
                applyPrevMaps() {
                    for (let prev of this.previous()) {
                        let from = this.toUrl(this.path(prev.file));
                        let root = prev.root || dirname(prev.file);
                        let map;
                        if (this.mapOpts.sourcesContent === false) {
                            map = new SourceMapConsumer(prev.text);
                            if (map.sourcesContent) map.sourcesContent = null;
                        } else map = prev.consumer();
                        this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
                    }
                }
                clearAnnotation() {
                    if (this.mapOpts.annotation === false) return;
                    if (this.root) {
                        let node;
                        for (let i = this.root.nodes.length - 1; i >= 0; i--) {
                            node = this.root.nodes[i];
                            if (node.type !== "comment") continue;
                            if (node.text.startsWith("# sourceMappingURL=")) this.root.removeChild(i);
                        }
                    } else if (this.css) this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, "");
                }
                generate() {
                    this.clearAnnotation();
                    if (pathAvailable && sourceMapAvailable && this.isMap()) return this.generateMap(); else {
                        let result = "";
                        this.stringify(this.root, (i => {
                            result += i;
                        }));
                        return [ result ];
                    }
                }
                generateMap() {
                    if (this.root) this.generateString(); else if (this.previous().length === 1) {
                        let prev = this.previous()[0].consumer();
                        prev.file = this.outputFile();
                        this.map = SourceMapGenerator.fromSourceMap(prev, {
                            ignoreInvalidMapping: true
                        });
                    } else {
                        this.map = new SourceMapGenerator({
                            file: this.outputFile(),
                            ignoreInvalidMapping: true
                        });
                        this.map.addMapping({
                            generated: {
                                column: 0,
                                line: 1
                            },
                            original: {
                                column: 0,
                                line: 1
                            },
                            source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
                        });
                    }
                    if (this.isSourcesContent()) this.setSourcesContent();
                    if (this.root && this.previous().length > 0) this.applyPrevMaps();
                    if (this.isAnnotation()) this.addAnnotation();
                    if (this.isInline()) return [ this.css ]; else return [ this.css, this.map ];
                }
                generateString() {
                    this.css = "";
                    this.map = new SourceMapGenerator({
                        file: this.outputFile(),
                        ignoreInvalidMapping: true
                    });
                    let line = 1;
                    let column = 1;
                    let noSource = "<no source>";
                    let mapping = {
                        generated: {
                            column: 0,
                            line: 0
                        },
                        original: {
                            column: 0,
                            line: 0
                        },
                        source: ""
                    };
                    let last, lines;
                    this.stringify(this.root, ((str, node, type) => {
                        this.css += str;
                        if (node && type !== "end") {
                            mapping.generated.line = line;
                            mapping.generated.column = column - 1;
                            if (node.source && node.source.start) {
                                mapping.source = this.sourcePath(node);
                                mapping.original.line = node.source.start.line;
                                mapping.original.column = node.source.start.column - 1;
                                this.map.addMapping(mapping);
                            } else {
                                mapping.source = noSource;
                                mapping.original.line = 1;
                                mapping.original.column = 0;
                                this.map.addMapping(mapping);
                            }
                        }
                        lines = str.match(/\n/g);
                        if (lines) {
                            line += lines.length;
                            last = str.lastIndexOf("\n");
                            column = str.length - last;
                        } else column += str.length;
                        if (node && type !== "start") {
                            let p = node.parent || {
                                raws: {}
                            };
                            let childless = node.type === "decl" || node.type === "atrule" && !node.nodes;
                            if (!childless || node !== p.last || p.raws.semicolon) if (node.source && node.source.end) {
                                mapping.source = this.sourcePath(node);
                                mapping.original.line = node.source.end.line;
                                mapping.original.column = node.source.end.column - 1;
                                mapping.generated.line = line;
                                mapping.generated.column = column - 2;
                                this.map.addMapping(mapping);
                            } else {
                                mapping.source = noSource;
                                mapping.original.line = 1;
                                mapping.original.column = 0;
                                mapping.generated.line = line;
                                mapping.generated.column = column - 1;
                                this.map.addMapping(mapping);
                            }
                        }
                    }));
                }
                isAnnotation() {
                    if (this.isInline()) return true;
                    if (typeof this.mapOpts.annotation !== "undefined") return this.mapOpts.annotation;
                    if (this.previous().length) return this.previous().some((i => i.annotation));
                    return true;
                }
                isInline() {
                    if (typeof this.mapOpts.inline !== "undefined") return this.mapOpts.inline;
                    let annotation = this.mapOpts.annotation;
                    if (typeof annotation !== "undefined" && annotation !== true) return false;
                    if (this.previous().length) return this.previous().some((i => i.inline));
                    return true;
                }
                isMap() {
                    if (typeof this.opts.map !== "undefined") return !!this.opts.map;
                    return this.previous().length > 0;
                }
                isSourcesContent() {
                    if (typeof this.mapOpts.sourcesContent !== "undefined") return this.mapOpts.sourcesContent;
                    if (this.previous().length) return this.previous().some((i => i.withContent()));
                    return true;
                }
                outputFile() {
                    if (this.opts.to) return this.path(this.opts.to); else if (this.opts.from) return this.path(this.opts.from); else return "to.css";
                }
                path(file) {
                    if (this.mapOpts.absolute) return file;
                    if (file.charCodeAt(0) === 60) return file;
                    if (/^\w+:\/\//.test(file)) return file;
                    let cached = this.memoizedPaths.get(file);
                    if (cached) return cached;
                    let from = this.opts.to ? dirname(this.opts.to) : ".";
                    if (typeof this.mapOpts.annotation === "string") from = dirname(resolve(from, this.mapOpts.annotation));
                    let path = relative(from, file);
                    this.memoizedPaths.set(file, path);
                    return path;
                }
                previous() {
                    if (!this.previousMaps) {
                        this.previousMaps = [];
                        if (this.root) this.root.walk((node => {
                            if (node.source && node.source.input.map) {
                                let map = node.source.input.map;
                                if (!this.previousMaps.includes(map)) this.previousMaps.push(map);
                            }
                        })); else {
                            let input = new Input(this.originalCSS, this.opts);
                            if (input.map) this.previousMaps.push(input.map);
                        }
                    }
                    return this.previousMaps;
                }
                setSourcesContent() {
                    let already = {};
                    if (this.root) this.root.walk((node => {
                        if (node.source) {
                            let from = node.source.input.from;
                            if (from && !already[from]) {
                                already[from] = true;
                                let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                                this.map.setSourceContent(fromUrl, node.source.input.css);
                            }
                        }
                    })); else if (this.css) {
                        let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
                        this.map.setSourceContent(from, this.css);
                    }
                }
                sourcePath(node) {
                    if (this.mapOpts.from) return this.toUrl(this.mapOpts.from); else if (this.usesFileUrls) return this.toFileUrl(node.source.input.from); else return this.toUrl(this.path(node.source.input.from));
                }
                toBase64(str) {
                    if (Buffer) return Buffer.from(str).toString("base64"); else return window.btoa(unescape(encodeURIComponent(str)));
                }
                toFileUrl(path) {
                    let cached = this.memoizedFileURLs.get(path);
                    if (cached) return cached;
                    if (pathToFileURL) {
                        let fileURL = pathToFileURL(path).toString();
                        this.memoizedFileURLs.set(path, fileURL);
                        return fileURL;
                    } else throw new Error("`map.absolute` option is not available in this PostCSS build");
                }
                toUrl(path) {
                    let cached = this.memoizedURLs.get(path);
                    if (cached) return cached;
                    if (sep === "\\") path = path.replace(/\\/g, "/");
                    let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
                    this.memoizedURLs.set(path, url);
                    return url;
                }
            }
            module.exports = MapGenerator;
        },
        211: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let MapGenerator = __webpack_require__(604);
            let parse = __webpack_require__(577);
            const Result = __webpack_require__(717);
            let stringify = __webpack_require__(303);
            __webpack_require__(156);
            class NoWorkResult {
                constructor(processor, css, opts) {
                    css = css.toString();
                    this.stringified = false;
                    this._processor = processor;
                    this._css = css;
                    this._opts = opts;
                    this._map = void 0;
                    let root;
                    let str = stringify;
                    this.result = new Result(this._processor, root, this._opts);
                    this.result.css = css;
                    let self = this;
                    Object.defineProperty(this.result, "root", {
                        get() {
                            return self.root;
                        }
                    });
                    let map = new MapGenerator(str, root, this._opts, css);
                    if (map.isMap()) {
                        let [generatedCSS, generatedMap] = map.generate();
                        if (generatedCSS) this.result.css = generatedCSS;
                        if (generatedMap) this.result.map = generatedMap;
                    } else {
                        map.clearAnnotation();
                        this.result.css = map.css;
                    }
                }
                async() {
                    if (this.error) return Promise.reject(this.error);
                    return Promise.resolve(this.result);
                }
                catch(onRejected) {
                    return this.async().catch(onRejected);
                }
                finally(onFinally) {
                    return this.async().then(onFinally, onFinally);
                }
                sync() {
                    if (this.error) throw this.error;
                    return this.result;
                }
                then(onFulfilled, onRejected) {
                    if (false) ;
                    return this.async().then(onFulfilled, onRejected);
                }
                toString() {
                    return this._css;
                }
                warnings() {
                    return [];
                }
                get content() {
                    return this.result.css;
                }
                get css() {
                    return this.result.css;
                }
                get map() {
                    return this.result.map;
                }
                get messages() {
                    return [];
                }
                get opts() {
                    return this.result.opts;
                }
                get processor() {
                    return this.result.processor;
                }
                get root() {
                    if (this._root) return this._root;
                    let root;
                    let parser = parse;
                    try {
                        root = parser(this._css, this._opts);
                    } catch (error) {
                        this.error = error;
                    }
                    if (this.error) throw this.error; else {
                        this._root = root;
                        return root;
                    }
                }
                get [Symbol.toStringTag]() {
                    return "NoWorkResult";
                }
            }
            module.exports = NoWorkResult;
            NoWorkResult.default = NoWorkResult;
        },
        152: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let CssSyntaxError = __webpack_require__(614);
            let Stringifier = __webpack_require__(668);
            let stringify = __webpack_require__(303);
            let {isClean, my} = __webpack_require__(151);
            function cloneNode(obj, parent) {
                let cloned = new obj.constructor;
                for (let i in obj) {
                    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                    if (i === "proxyCache") continue;
                    let value = obj[i];
                    let type = typeof value;
                    if (i === "parent" && type === "object") {
                        if (parent) cloned[i] = parent;
                    } else if (i === "source") cloned[i] = value; else if (Array.isArray(value)) cloned[i] = value.map((j => cloneNode(j, cloned))); else {
                        if (type === "object" && value !== null) value = cloneNode(value);
                        cloned[i] = value;
                    }
                }
                return cloned;
            }
            class Node {
                constructor(defaults = {}) {
                    this.raws = {};
                    this[isClean] = false;
                    this[my] = true;
                    for (let name in defaults) if (name === "nodes") {
                        this.nodes = [];
                        for (let node of defaults[name]) if (typeof node.clone === "function") this.append(node.clone()); else this.append(node);
                    } else this[name] = defaults[name];
                }
                addToError(error) {
                    error.postcssNode = this;
                    if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
                        let s = this.source;
                        error.stack = error.stack.replace(/\n\s{4}at /, `$&${s.input.from}:${s.start.line}:${s.start.column}$&`);
                    }
                    return error;
                }
                after(add) {
                    this.parent.insertAfter(this, add);
                    return this;
                }
                assign(overrides = {}) {
                    for (let name in overrides) this[name] = overrides[name];
                    return this;
                }
                before(add) {
                    this.parent.insertBefore(this, add);
                    return this;
                }
                cleanRaws(keepBetween) {
                    delete this.raws.before;
                    delete this.raws.after;
                    if (!keepBetween) delete this.raws.between;
                }
                clone(overrides = {}) {
                    let cloned = cloneNode(this);
                    for (let name in overrides) cloned[name] = overrides[name];
                    return cloned;
                }
                cloneAfter(overrides = {}) {
                    let cloned = this.clone(overrides);
                    this.parent.insertAfter(this, cloned);
                    return cloned;
                }
                cloneBefore(overrides = {}) {
                    let cloned = this.clone(overrides);
                    this.parent.insertBefore(this, cloned);
                    return cloned;
                }
                error(message, opts = {}) {
                    if (this.source) {
                        let {end, start} = this.rangeBy(opts);
                        return this.source.input.error(message, {
                            column: start.column,
                            line: start.line
                        }, {
                            column: end.column,
                            line: end.line
                        }, opts);
                    }
                    return new CssSyntaxError(message);
                }
                getProxyProcessor() {
                    return {
                        get(node, prop) {
                            if (prop === "proxyOf") return node; else if (prop === "root") return () => node.root().toProxy(); else return node[prop];
                        },
                        set(node, prop, value) {
                            if (node[prop] === value) return true;
                            node[prop] = value;
                            if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || prop === "text") node.markDirty();
                            return true;
                        }
                    };
                }
                markClean() {
                    this[isClean] = true;
                }
                markDirty() {
                    if (this[isClean]) {
                        this[isClean] = false;
                        let next = this;
                        while (next = next.parent) next[isClean] = false;
                    }
                }
                next() {
                    if (!this.parent) return;
                    let index = this.parent.index(this);
                    return this.parent.nodes[index + 1];
                }
                positionBy(opts, stringRepresentation) {
                    let pos = this.source.start;
                    if (opts.index) pos = this.positionInside(opts.index, stringRepresentation); else if (opts.word) {
                        stringRepresentation = this.toString();
                        let index = stringRepresentation.indexOf(opts.word);
                        if (index !== -1) pos = this.positionInside(index, stringRepresentation);
                    }
                    return pos;
                }
                positionInside(index, stringRepresentation) {
                    let string = stringRepresentation || this.toString();
                    let column = this.source.start.column;
                    let line = this.source.start.line;
                    for (let i = 0; i < index; i++) if (string[i] === "\n") {
                        column = 1;
                        line += 1;
                    } else column += 1;
                    return {
                        column,
                        line
                    };
                }
                prev() {
                    if (!this.parent) return;
                    let index = this.parent.index(this);
                    return this.parent.nodes[index - 1];
                }
                rangeBy(opts) {
                    let start = {
                        column: this.source.start.column,
                        line: this.source.start.line
                    };
                    let end = this.source.end ? {
                        column: this.source.end.column + 1,
                        line: this.source.end.line
                    } : {
                        column: start.column + 1,
                        line: start.line
                    };
                    if (opts.word) {
                        let stringRepresentation = this.toString();
                        let index = stringRepresentation.indexOf(opts.word);
                        if (index !== -1) {
                            start = this.positionInside(index, stringRepresentation);
                            end = this.positionInside(index + opts.word.length, stringRepresentation);
                        }
                    } else {
                        if (opts.start) start = {
                            column: opts.start.column,
                            line: opts.start.line
                        }; else if (opts.index) start = this.positionInside(opts.index);
                        if (opts.end) end = {
                            column: opts.end.column,
                            line: opts.end.line
                        }; else if (typeof opts.endIndex === "number") end = this.positionInside(opts.endIndex); else if (opts.index) end = this.positionInside(opts.index + 1);
                    }
                    if (end.line < start.line || end.line === start.line && end.column <= start.column) end = {
                        column: start.column + 1,
                        line: start.line
                    };
                    return {
                        end,
                        start
                    };
                }
                raw(prop, defaultType) {
                    let str = new Stringifier;
                    return str.raw(this, prop, defaultType);
                }
                remove() {
                    if (this.parent) this.parent.removeChild(this);
                    this.parent = void 0;
                    return this;
                }
                replaceWith(...nodes) {
                    if (this.parent) {
                        let bookmark = this;
                        let foundSelf = false;
                        for (let node of nodes) if (node === this) foundSelf = true; else if (foundSelf) {
                            this.parent.insertAfter(bookmark, node);
                            bookmark = node;
                        } else this.parent.insertBefore(bookmark, node);
                        if (!foundSelf) this.remove();
                    }
                    return this;
                }
                root() {
                    let result = this;
                    while (result.parent && result.parent.type !== "document") result = result.parent;
                    return result;
                }
                toJSON(_, inputs) {
                    let fixed = {};
                    let emitInputs = inputs == null;
                    inputs = inputs || new Map;
                    let inputsNextIndex = 0;
                    for (let name in this) {
                        if (!Object.prototype.hasOwnProperty.call(this, name)) continue;
                        if (name === "parent" || name === "proxyCache") continue;
                        let value = this[name];
                        if (Array.isArray(value)) fixed[name] = value.map((i => {
                            if (typeof i === "object" && i.toJSON) return i.toJSON(null, inputs); else return i;
                        })); else if (typeof value === "object" && value.toJSON) fixed[name] = value.toJSON(null, inputs); else if (name === "source") {
                            let inputId = inputs.get(value.input);
                            if (inputId == null) {
                                inputId = inputsNextIndex;
                                inputs.set(value.input, inputsNextIndex);
                                inputsNextIndex++;
                            }
                            fixed[name] = {
                                end: value.end,
                                inputId,
                                start: value.start
                            };
                        } else fixed[name] = value;
                    }
                    if (emitInputs) fixed.inputs = [ ...inputs.keys() ].map((input => input.toJSON()));
                    return fixed;
                }
                toProxy() {
                    if (!this.proxyCache) this.proxyCache = new Proxy(this, this.getProxyProcessor());
                    return this.proxyCache;
                }
                toString(stringifier = stringify) {
                    if (stringifier.stringify) stringifier = stringifier.stringify;
                    let result = "";
                    stringifier(this, (i => {
                        result += i;
                    }));
                    return result;
                }
                warn(result, text, opts) {
                    let data = {
                        node: this
                    };
                    for (let i in opts) data[i] = opts[i];
                    return result.warn(text, data);
                }
                get proxyOf() {
                    return this;
                }
            }
            module.exports = Node;
            Node.default = Node;
        },
        577: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Container = __webpack_require__(793);
            let Input = __webpack_require__(106);
            let Parser = __webpack_require__(339);
            function parse(css, opts) {
                let input = new Input(css, opts);
                let parser = new Parser(input);
                try {
                    parser.parse();
                } catch (e) {
                    if (false) ;
                    throw e;
                }
                return parser.root;
            }
            module.exports = parse;
            parse.default = parse;
            Container.registerParse(parse);
        },
        339: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let AtRule = __webpack_require__(396);
            let Comment = __webpack_require__(371);
            let Declaration = __webpack_require__(238);
            let Root = __webpack_require__(644);
            let Rule = __webpack_require__(534);
            let tokenizer = __webpack_require__(781);
            const SAFE_COMMENT_NEIGHBOR = {
                empty: true,
                space: true
            };
            function findLastWithPosition(tokens) {
                for (let i = tokens.length - 1; i >= 0; i--) {
                    let token = tokens[i];
                    let pos = token[3] || token[2];
                    if (pos) return pos;
                }
            }
            class Parser {
                constructor(input) {
                    this.input = input;
                    this.root = new Root;
                    this.current = this.root;
                    this.spaces = "";
                    this.semicolon = false;
                    this.createTokenizer();
                    this.root.source = {
                        input,
                        start: {
                            column: 1,
                            line: 1,
                            offset: 0
                        }
                    };
                }
                atrule(token) {
                    let node = new AtRule;
                    node.name = token[1].slice(1);
                    if (node.name === "") this.unnamedAtrule(node, token);
                    this.init(node, token[2]);
                    let type;
                    let prev;
                    let shift;
                    let last = false;
                    let open = false;
                    let params = [];
                    let brackets = [];
                    while (!this.tokenizer.endOfFile()) {
                        token = this.tokenizer.nextToken();
                        type = token[0];
                        if (type === "(" || type === "[") brackets.push(type === "(" ? ")" : "]"); else if (type === "{" && brackets.length > 0) brackets.push("}"); else if (type === brackets[brackets.length - 1]) brackets.pop();
                        if (brackets.length === 0) if (type === ";") {
                            node.source.end = this.getPosition(token[2]);
                            node.source.end.offset++;
                            this.semicolon = true;
                            break;
                        } else if (type === "{") {
                            open = true;
                            break;
                        } else if (type === "}") {
                            if (params.length > 0) {
                                shift = params.length - 1;
                                prev = params[shift];
                                while (prev && prev[0] === "space") prev = params[--shift];
                                if (prev) {
                                    node.source.end = this.getPosition(prev[3] || prev[2]);
                                    node.source.end.offset++;
                                }
                            }
                            this.end(token);
                            break;
                        } else params.push(token); else params.push(token);
                        if (this.tokenizer.endOfFile()) {
                            last = true;
                            break;
                        }
                    }
                    node.raws.between = this.spacesAndCommentsFromEnd(params);
                    if (params.length) {
                        node.raws.afterName = this.spacesAndCommentsFromStart(params);
                        this.raw(node, "params", params);
                        if (last) {
                            token = params[params.length - 1];
                            node.source.end = this.getPosition(token[3] || token[2]);
                            node.source.end.offset++;
                            this.spaces = node.raws.between;
                            node.raws.between = "";
                        }
                    } else {
                        node.raws.afterName = "";
                        node.params = "";
                    }
                    if (open) {
                        node.nodes = [];
                        this.current = node;
                    }
                }
                checkMissedSemicolon(tokens) {
                    let colon = this.colon(tokens);
                    if (colon === false) return;
                    let founded = 0;
                    let token;
                    for (let j = colon - 1; j >= 0; j--) {
                        token = tokens[j];
                        if (token[0] !== "space") {
                            founded += 1;
                            if (founded === 2) break;
                        }
                    }
                    throw this.input.error("Missed semicolon", token[0] === "word" ? token[3] + 1 : token[2]);
                }
                colon(tokens) {
                    let brackets = 0;
                    let prev, token, type;
                    for (let [i, element] of tokens.entries()) {
                        token = element;
                        type = token[0];
                        if (type === "(") brackets += 1;
                        if (type === ")") brackets -= 1;
                        if (brackets === 0 && type === ":") if (!prev) this.doubleColon(token); else if (prev[0] === "word" && prev[1] === "progid") continue; else return i;
                        prev = token;
                    }
                    return false;
                }
                comment(token) {
                    let node = new Comment;
                    this.init(node, token[2]);
                    node.source.end = this.getPosition(token[3] || token[2]);
                    node.source.end.offset++;
                    let text = token[1].slice(2, -2);
                    if (/^\s*$/.test(text)) {
                        node.text = "";
                        node.raws.left = text;
                        node.raws.right = "";
                    } else {
                        let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
                        node.text = match[2];
                        node.raws.left = match[1];
                        node.raws.right = match[3];
                    }
                }
                createTokenizer() {
                    this.tokenizer = tokenizer(this.input);
                }
                decl(tokens, customProperty) {
                    let node = new Declaration;
                    this.init(node, tokens[0][2]);
                    let last = tokens[tokens.length - 1];
                    if (last[0] === ";") {
                        this.semicolon = true;
                        tokens.pop();
                    }
                    node.source.end = this.getPosition(last[3] || last[2] || findLastWithPosition(tokens));
                    node.source.end.offset++;
                    while (tokens[0][0] !== "word") {
                        if (tokens.length === 1) this.unknownWord(tokens);
                        node.raws.before += tokens.shift()[1];
                    }
                    node.source.start = this.getPosition(tokens[0][2]);
                    node.prop = "";
                    while (tokens.length) {
                        let type = tokens[0][0];
                        if (type === ":" || type === "space" || type === "comment") break;
                        node.prop += tokens.shift()[1];
                    }
                    node.raws.between = "";
                    let token;
                    while (tokens.length) {
                        token = tokens.shift();
                        if (token[0] === ":") {
                            node.raws.between += token[1];
                            break;
                        } else {
                            if (token[0] === "word" && /\w/.test(token[1])) this.unknownWord([ token ]);
                            node.raws.between += token[1];
                        }
                    }
                    if (node.prop[0] === "_" || node.prop[0] === "*") {
                        node.raws.before += node.prop[0];
                        node.prop = node.prop.slice(1);
                    }
                    let firstSpaces = [];
                    let next;
                    while (tokens.length) {
                        next = tokens[0][0];
                        if (next !== "space" && next !== "comment") break;
                        firstSpaces.push(tokens.shift());
                    }
                    this.precheckMissedSemicolon(tokens);
                    for (let i = tokens.length - 1; i >= 0; i--) {
                        token = tokens[i];
                        if (token[1].toLowerCase() === "!important") {
                            node.important = true;
                            let string = this.stringFrom(tokens, i);
                            string = this.spacesFromEnd(tokens) + string;
                            if (string !== " !important") node.raws.important = string;
                            break;
                        } else if (token[1].toLowerCase() === "important") {
                            let cache = tokens.slice(0);
                            let str = "";
                            for (let j = i; j > 0; j--) {
                                let type = cache[j][0];
                                if (str.trim().startsWith("!") && type !== "space") break;
                                str = cache.pop()[1] + str;
                            }
                            if (str.trim().startsWith("!")) {
                                node.important = true;
                                node.raws.important = str;
                                tokens = cache;
                            }
                        }
                        if (token[0] !== "space" && token[0] !== "comment") break;
                    }
                    let hasWord = tokens.some((i => i[0] !== "space" && i[0] !== "comment"));
                    if (hasWord) {
                        node.raws.between += firstSpaces.map((i => i[1])).join("");
                        firstSpaces = [];
                    }
                    this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
                    if (node.value.includes(":") && !customProperty) this.checkMissedSemicolon(tokens);
                }
                doubleColon(token) {
                    throw this.input.error("Double colon", {
                        offset: token[2]
                    }, {
                        offset: token[2] + token[1].length
                    });
                }
                emptyRule(token) {
                    let node = new Rule;
                    this.init(node, token[2]);
                    node.selector = "";
                    node.raws.between = "";
                    this.current = node;
                }
                end(token) {
                    if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
                    this.semicolon = false;
                    this.current.raws.after = (this.current.raws.after || "") + this.spaces;
                    this.spaces = "";
                    if (this.current.parent) {
                        this.current.source.end = this.getPosition(token[2]);
                        this.current.source.end.offset++;
                        this.current = this.current.parent;
                    } else this.unexpectedClose(token);
                }
                endFile() {
                    if (this.current.parent) this.unclosedBlock();
                    if (this.current.nodes && this.current.nodes.length) this.current.raws.semicolon = this.semicolon;
                    this.current.raws.after = (this.current.raws.after || "") + this.spaces;
                    this.root.source.end = this.getPosition(this.tokenizer.position());
                }
                freeSemicolon(token) {
                    this.spaces += token[1];
                    if (this.current.nodes) {
                        let prev = this.current.nodes[this.current.nodes.length - 1];
                        if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
                            prev.raws.ownSemicolon = this.spaces;
                            this.spaces = "";
                        }
                    }
                }
                getPosition(offset) {
                    let pos = this.input.fromOffset(offset);
                    return {
                        column: pos.col,
                        line: pos.line,
                        offset
                    };
                }
                init(node, offset) {
                    this.current.push(node);
                    node.source = {
                        input: this.input,
                        start: this.getPosition(offset)
                    };
                    node.raws.before = this.spaces;
                    this.spaces = "";
                    if (node.type !== "comment") this.semicolon = false;
                }
                other(start) {
                    let end = false;
                    let type = null;
                    let colon = false;
                    let bracket = null;
                    let brackets = [];
                    let customProperty = start[1].startsWith("--");
                    let tokens = [];
                    let token = start;
                    while (token) {
                        type = token[0];
                        tokens.push(token);
                        if (type === "(" || type === "[") {
                            if (!bracket) bracket = token;
                            brackets.push(type === "(" ? ")" : "]");
                        } else if (customProperty && colon && type === "{") {
                            if (!bracket) bracket = token;
                            brackets.push("}");
                        } else if (brackets.length === 0) {
                            if (type === ";") if (colon) {
                                this.decl(tokens, customProperty);
                                return;
                            } else break; else if (type === "{") {
                                this.rule(tokens);
                                return;
                            } else if (type === "}") {
                                this.tokenizer.back(tokens.pop());
                                end = true;
                                break;
                            } else if (type === ":") colon = true;
                        } else if (type === brackets[brackets.length - 1]) {
                            brackets.pop();
                            if (brackets.length === 0) bracket = null;
                        }
                        token = this.tokenizer.nextToken();
                    }
                    if (this.tokenizer.endOfFile()) end = true;
                    if (brackets.length > 0) this.unclosedBracket(bracket);
                    if (end && colon) {
                        if (!customProperty) while (tokens.length) {
                            token = tokens[tokens.length - 1][0];
                            if (token !== "space" && token !== "comment") break;
                            this.tokenizer.back(tokens.pop());
                        }
                        this.decl(tokens, customProperty);
                    } else this.unknownWord(tokens);
                }
                parse() {
                    let token;
                    while (!this.tokenizer.endOfFile()) {
                        token = this.tokenizer.nextToken();
                        switch (token[0]) {
                          case "space":
                            this.spaces += token[1];
                            break;

                          case ";":
                            this.freeSemicolon(token);
                            break;

                          case "}":
                            this.end(token);
                            break;

                          case "comment":
                            this.comment(token);
                            break;

                          case "at-word":
                            this.atrule(token);
                            break;

                          case "{":
                            this.emptyRule(token);
                            break;

                          default:
                            this.other(token);
                            break;
                        }
                    }
                    this.endFile();
                }
                precheckMissedSemicolon() {}
                raw(node, prop, tokens, customProperty) {
                    let token, type;
                    let length = tokens.length;
                    let value = "";
                    let clean = true;
                    let next, prev;
                    for (let i = 0; i < length; i += 1) {
                        token = tokens[i];
                        type = token[0];
                        if (type === "space" && i === length - 1 && !customProperty) clean = false; else if (type === "comment") {
                            prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
                            next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
                            if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) if (value.slice(-1) === ",") clean = false; else value += token[1]; else clean = false;
                        } else value += token[1];
                    }
                    if (!clean) {
                        let raw = tokens.reduce(((all, i) => all + i[1]), "");
                        node.raws[prop] = {
                            raw,
                            value
                        };
                    }
                    node[prop] = value;
                }
                rule(tokens) {
                    tokens.pop();
                    let node = new Rule;
                    this.init(node, tokens[0][2]);
                    node.raws.between = this.spacesAndCommentsFromEnd(tokens);
                    this.raw(node, "selector", tokens);
                    this.current = node;
                }
                spacesAndCommentsFromEnd(tokens) {
                    let lastTokenType;
                    let spaces = "";
                    while (tokens.length) {
                        lastTokenType = tokens[tokens.length - 1][0];
                        if (lastTokenType !== "space" && lastTokenType !== "comment") break;
                        spaces = tokens.pop()[1] + spaces;
                    }
                    return spaces;
                }
                spacesAndCommentsFromStart(tokens) {
                    let next;
                    let spaces = "";
                    while (tokens.length) {
                        next = tokens[0][0];
                        if (next !== "space" && next !== "comment") break;
                        spaces += tokens.shift()[1];
                    }
                    return spaces;
                }
                spacesFromEnd(tokens) {
                    let lastTokenType;
                    let spaces = "";
                    while (tokens.length) {
                        lastTokenType = tokens[tokens.length - 1][0];
                        if (lastTokenType !== "space") break;
                        spaces = tokens.pop()[1] + spaces;
                    }
                    return spaces;
                }
                stringFrom(tokens, from) {
                    let result = "";
                    for (let i = from; i < tokens.length; i++) result += tokens[i][1];
                    tokens.splice(from, tokens.length - from);
                    return result;
                }
                unclosedBlock() {
                    let pos = this.current.source.start;
                    throw this.input.error("Unclosed block", pos.line, pos.column);
                }
                unclosedBracket(bracket) {
                    throw this.input.error("Unclosed bracket", {
                        offset: bracket[2]
                    }, {
                        offset: bracket[2] + 1
                    });
                }
                unexpectedClose(token) {
                    throw this.input.error("Unexpected }", {
                        offset: token[2]
                    }, {
                        offset: token[2] + 1
                    });
                }
                unknownWord(tokens) {
                    throw this.input.error("Unknown word", {
                        offset: tokens[0][2]
                    }, {
                        offset: tokens[0][2] + tokens[0][1].length
                    });
                }
                unnamedAtrule(node, token) {
                    throw this.input.error("At-rule without name", {
                        offset: token[2]
                    }, {
                        offset: token[2] + token[1].length
                    });
                }
            }
            module.exports = Parser;
        },
        895: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let AtRule = __webpack_require__(396);
            let Comment = __webpack_require__(371);
            let Container = __webpack_require__(793);
            let CssSyntaxError = __webpack_require__(614);
            let Declaration = __webpack_require__(238);
            let Document = __webpack_require__(145);
            let fromJSON = __webpack_require__(438);
            let Input = __webpack_require__(106);
            let LazyResult = __webpack_require__(966);
            let list = __webpack_require__(752);
            let Node = __webpack_require__(152);
            let parse = __webpack_require__(577);
            let Processor = __webpack_require__(846);
            let Result = __webpack_require__(717);
            let Root = __webpack_require__(644);
            let Rule = __webpack_require__(534);
            let stringify = __webpack_require__(303);
            let Warning = __webpack_require__(38);
            function postcss(...plugins) {
                if (plugins.length === 1 && Array.isArray(plugins[0])) plugins = plugins[0];
                return new Processor(plugins);
            }
            postcss.plugin = function plugin(name, initializer) {
                let warningPrinted = false;
                function creator(...args) {
                    if (console && console.warn && !warningPrinted) {
                        warningPrinted = true;
                        console.warn(name + ": postcss.plugin was deprecated. Migration guide:\n" + "https://evilmartians.com/chronicles/postcss-8-plugin-migration");
                        if (process.env.LANG && process.env.LANG.startsWith("cn")) console.warn(name + ": 里面 postcss.plugin 被弃用. 迁移指南:\n" + "https://www.w3ctech.com/topic/2226");
                    }
                    let transformer = initializer(...args);
                    transformer.postcssPlugin = name;
                    transformer.postcssVersion = (new Processor).version;
                    return transformer;
                }
                let cache;
                Object.defineProperty(creator, "postcss", {
                    get() {
                        if (!cache) cache = creator();
                        return cache;
                    }
                });
                creator.process = function(css, processOpts, pluginOpts) {
                    return postcss([ creator(pluginOpts) ]).process(css, processOpts);
                };
                return creator;
            };
            postcss.stringify = stringify;
            postcss.parse = parse;
            postcss.fromJSON = fromJSON;
            postcss.list = list;
            postcss.comment = defaults => new Comment(defaults);
            postcss.atRule = defaults => new AtRule(defaults);
            postcss.decl = defaults => new Declaration(defaults);
            postcss.rule = defaults => new Rule(defaults);
            postcss.root = defaults => new Root(defaults);
            postcss.document = defaults => new Document(defaults);
            postcss.CssSyntaxError = CssSyntaxError;
            postcss.Declaration = Declaration;
            postcss.Container = Container;
            postcss.Processor = Processor;
            postcss.Document = Document;
            postcss.Comment = Comment;
            postcss.Warning = Warning;
            postcss.AtRule = AtRule;
            postcss.Result = Result;
            postcss.Input = Input;
            postcss.Rule = Rule;
            postcss.Root = Root;
            postcss.Node = Node;
            LazyResult.registerPostcss(postcss);
            module.exports = postcss;
            postcss.default = postcss;
        },
        878: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let {existsSync, readFileSync} = __webpack_require__(977);
            let {dirname, join} = __webpack_require__(197);
            let {SourceMapConsumer, SourceMapGenerator} = __webpack_require__(866);
            function fromBase64(str) {
                if (Buffer) return Buffer.from(str, "base64").toString(); else return window.atob(str);
            }
            class PreviousMap {
                constructor(css, opts) {
                    if (opts.map === false) return;
                    this.loadAnnotation(css);
                    this.inline = this.startWith(this.annotation, "data:");
                    let prev = opts.map ? opts.map.prev : void 0;
                    let text = this.loadMap(opts.from, prev);
                    if (!this.mapFile && opts.from) this.mapFile = opts.from;
                    if (this.mapFile) this.root = dirname(this.mapFile);
                    if (text) this.text = text;
                }
                consumer() {
                    if (!this.consumerCache) this.consumerCache = new SourceMapConsumer(this.text);
                    return this.consumerCache;
                }
                decodeInline(text) {
                    let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
                    let baseUri = /^data:application\/json;base64,/;
                    let charsetUri = /^data:application\/json;charset=utf-?8,/;
                    let uri = /^data:application\/json,/;
                    let uriMatch = text.match(charsetUri) || text.match(uri);
                    if (uriMatch) return decodeURIComponent(text.substr(uriMatch[0].length));
                    let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
                    if (baseUriMatch) return fromBase64(text.substr(baseUriMatch[0].length));
                    let encoding = text.match(/data:application\/json;([^,]+),/)[1];
                    throw new Error("Unsupported source map encoding " + encoding);
                }
                getAnnotationURL(sourceMapString) {
                    return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
                }
                isMap(map) {
                    if (typeof map !== "object") return false;
                    return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
                }
                loadAnnotation(css) {
                    let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
                    if (!comments) return;
                    let start = css.lastIndexOf(comments.pop());
                    let end = css.indexOf("*/", start);
                    if (start > -1 && end > -1) this.annotation = this.getAnnotationURL(css.substring(start, end));
                }
                loadFile(path) {
                    this.root = dirname(path);
                    if (existsSync(path)) {
                        this.mapFile = path;
                        return readFileSync(path, "utf-8").toString().trim();
                    }
                }
                loadMap(file, prev) {
                    if (prev === false) return false;
                    if (prev) if (typeof prev === "string") return prev; else if (typeof prev === "function") {
                        let prevPath = prev(file);
                        if (prevPath) {
                            let map = this.loadFile(prevPath);
                            if (!map) throw new Error("Unable to load previous source map: " + prevPath.toString());
                            return map;
                        }
                    } else if (prev instanceof SourceMapConsumer) return SourceMapGenerator.fromSourceMap(prev).toString(); else if (prev instanceof SourceMapGenerator) return prev.toString(); else if (this.isMap(prev)) return JSON.stringify(prev); else throw new Error("Unsupported previous source map format: " + prev.toString()); else if (this.inline) return this.decodeInline(this.annotation); else if (this.annotation) {
                        let map = this.annotation;
                        if (file) map = join(dirname(file), map);
                        return this.loadFile(map);
                    }
                }
                startWith(string, start) {
                    if (!string) return false;
                    return string.substr(0, start.length) === start;
                }
                withContent() {
                    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
                }
            }
            module.exports = PreviousMap;
            PreviousMap.default = PreviousMap;
        },
        846: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Document = __webpack_require__(145);
            let LazyResult = __webpack_require__(966);
            let NoWorkResult = __webpack_require__(211);
            let Root = __webpack_require__(644);
            class Processor {
                constructor(plugins = []) {
                    this.version = "8.4.44";
                    this.plugins = this.normalize(plugins);
                }
                normalize(plugins) {
                    let normalized = [];
                    for (let i of plugins) {
                        if (i.postcss === true) i = i(); else if (i.postcss) i = i.postcss;
                        if (typeof i === "object" && Array.isArray(i.plugins)) normalized = normalized.concat(i.plugins); else if (typeof i === "object" && i.postcssPlugin) normalized.push(i); else if (typeof i === "function") normalized.push(i); else if (typeof i === "object" && (i.parse || i.stringify)) {
                            if (false) ;
                        } else throw new Error(i + " is not a PostCSS plugin");
                    }
                    return normalized;
                }
                process(css, opts = {}) {
                    if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) return new NoWorkResult(this, css, opts); else return new LazyResult(this, css, opts);
                }
                use(plugin) {
                    this.plugins = this.plugins.concat(this.normalize([ plugin ]));
                    return this;
                }
            }
            module.exports = Processor;
            Processor.default = Processor;
            Root.registerProcessor(Processor);
            Document.registerProcessor(Processor);
        },
        717: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Warning = __webpack_require__(38);
            class Result {
                constructor(processor, root, opts) {
                    this.processor = processor;
                    this.messages = [];
                    this.root = root;
                    this.opts = opts;
                    this.css = void 0;
                    this.map = void 0;
                }
                toString() {
                    return this.css;
                }
                warn(text, opts = {}) {
                    if (!opts.plugin) if (this.lastPlugin && this.lastPlugin.postcssPlugin) opts.plugin = this.lastPlugin.postcssPlugin;
                    let warning = new Warning(text, opts);
                    this.messages.push(warning);
                    return warning;
                }
                warnings() {
                    return this.messages.filter((i => i.type === "warning"));
                }
                get content() {
                    return this.css;
                }
            }
            module.exports = Result;
            Result.default = Result;
        },
        644: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Container = __webpack_require__(793);
            let LazyResult, Processor;
            class Root extends Container {
                constructor(defaults) {
                    super(defaults);
                    this.type = "root";
                    if (!this.nodes) this.nodes = [];
                }
                normalize(child, sample, type) {
                    let nodes = super.normalize(child);
                    if (sample) if (type === "prepend") if (this.nodes.length > 1) sample.raws.before = this.nodes[1].raws.before; else delete sample.raws.before; else if (this.first !== sample) for (let node of nodes) node.raws.before = sample.raws.before;
                    return nodes;
                }
                removeChild(child, ignore) {
                    let index = this.index(child);
                    if (!ignore && index === 0 && this.nodes.length > 1) this.nodes[1].raws.before = this.nodes[index].raws.before;
                    return super.removeChild(child);
                }
                toResult(opts = {}) {
                    let lazy = new LazyResult(new Processor, this, opts);
                    return lazy.stringify();
                }
            }
            Root.registerLazyResult = dependant => {
                LazyResult = dependant;
            };
            Root.registerProcessor = dependant => {
                Processor = dependant;
            };
            module.exports = Root;
            Root.default = Root;
            Container.registerRoot(Root);
        },
        534: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Container = __webpack_require__(793);
            let list = __webpack_require__(752);
            class Rule extends Container {
                constructor(defaults) {
                    super(defaults);
                    this.type = "rule";
                    if (!this.nodes) this.nodes = [];
                }
                get selectors() {
                    return list.comma(this.selector);
                }
                set selectors(values) {
                    let match = this.selector ? this.selector.match(/,\s*/) : null;
                    let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
                    this.selector = values.join(sep);
                }
            }
            module.exports = Rule;
            Rule.default = Rule;
            Container.registerRule(Rule);
        },
        668: module => {
            "use strict";
            const DEFAULT_RAW = {
                after: "\n",
                beforeClose: "\n",
                beforeComment: "\n",
                beforeDecl: "\n",
                beforeOpen: " ",
                beforeRule: "\n",
                colon: ": ",
                commentLeft: " ",
                commentRight: " ",
                emptyBody: "",
                indent: "    ",
                semicolon: false
            };
            function capitalize(str) {
                return str[0].toUpperCase() + str.slice(1);
            }
            class Stringifier {
                constructor(builder) {
                    this.builder = builder;
                }
                atrule(node, semicolon) {
                    let name = "@" + node.name;
                    let params = node.params ? this.rawValue(node, "params") : "";
                    if (typeof node.raws.afterName !== "undefined") name += node.raws.afterName; else if (params) name += " ";
                    if (node.nodes) this.block(node, name + params); else {
                        let end = (node.raws.between || "") + (semicolon ? ";" : "");
                        this.builder(name + params + end, node);
                    }
                }
                beforeAfter(node, detect) {
                    let value;
                    if (node.type === "decl") value = this.raw(node, null, "beforeDecl"); else if (node.type === "comment") value = this.raw(node, null, "beforeComment"); else if (detect === "before") value = this.raw(node, null, "beforeRule"); else value = this.raw(node, null, "beforeClose");
                    let buf = node.parent;
                    let depth = 0;
                    while (buf && buf.type !== "root") {
                        depth += 1;
                        buf = buf.parent;
                    }
                    if (value.includes("\n")) {
                        let indent = this.raw(node, null, "indent");
                        if (indent.length) for (let step = 0; step < depth; step++) value += indent;
                    }
                    return value;
                }
                block(node, start) {
                    let between = this.raw(node, "between", "beforeOpen");
                    this.builder(start + between + "{", node, "start");
                    let after;
                    if (node.nodes && node.nodes.length) {
                        this.body(node);
                        after = this.raw(node, "after");
                    } else after = this.raw(node, "after", "emptyBody");
                    if (after) this.builder(after);
                    this.builder("}", node, "end");
                }
                body(node) {
                    let last = node.nodes.length - 1;
                    while (last > 0) {
                        if (node.nodes[last].type !== "comment") break;
                        last -= 1;
                    }
                    let semicolon = this.raw(node, "semicolon");
                    for (let i = 0; i < node.nodes.length; i++) {
                        let child = node.nodes[i];
                        let before = this.raw(child, "before");
                        if (before) this.builder(before);
                        this.stringify(child, last !== i || semicolon);
                    }
                }
                comment(node) {
                    let left = this.raw(node, "left", "commentLeft");
                    let right = this.raw(node, "right", "commentRight");
                    this.builder("/*" + left + node.text + right + "*/", node);
                }
                decl(node, semicolon) {
                    let between = this.raw(node, "between", "colon");
                    let string = node.prop + between + this.rawValue(node, "value");
                    if (node.important) string += node.raws.important || " !important";
                    if (semicolon) string += ";";
                    this.builder(string, node);
                }
                document(node) {
                    this.body(node);
                }
                raw(node, own, detect) {
                    let value;
                    if (!detect) detect = own;
                    if (own) {
                        value = node.raws[own];
                        if (typeof value !== "undefined") return value;
                    }
                    let parent = node.parent;
                    if (detect === "before") {
                        if (!parent || parent.type === "root" && parent.first === node) return "";
                        if (parent && parent.type === "document") return "";
                    }
                    if (!parent) return DEFAULT_RAW[detect];
                    let root = node.root();
                    if (!root.rawCache) root.rawCache = {};
                    if (typeof root.rawCache[detect] !== "undefined") return root.rawCache[detect];
                    if (detect === "before" || detect === "after") return this.beforeAfter(node, detect); else {
                        let method = "raw" + capitalize(detect);
                        if (this[method]) value = this[method](root, node); else root.walk((i => {
                            value = i.raws[own];
                            if (typeof value !== "undefined") return false;
                        }));
                    }
                    if (typeof value === "undefined") value = DEFAULT_RAW[detect];
                    root.rawCache[detect] = value;
                    return value;
                }
                rawBeforeClose(root) {
                    let value;
                    root.walk((i => {
                        if (i.nodes && i.nodes.length > 0) if (typeof i.raws.after !== "undefined") {
                            value = i.raws.after;
                            if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
                            return false;
                        }
                    }));
                    if (value) value = value.replace(/\S/g, "");
                    return value;
                }
                rawBeforeComment(root, node) {
                    let value;
                    root.walkComments((i => {
                        if (typeof i.raws.before !== "undefined") {
                            value = i.raws.before;
                            if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
                            return false;
                        }
                    }));
                    if (typeof value === "undefined") value = this.raw(node, null, "beforeDecl"); else if (value) value = value.replace(/\S/g, "");
                    return value;
                }
                rawBeforeDecl(root, node) {
                    let value;
                    root.walkDecls((i => {
                        if (typeof i.raws.before !== "undefined") {
                            value = i.raws.before;
                            if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
                            return false;
                        }
                    }));
                    if (typeof value === "undefined") value = this.raw(node, null, "beforeRule"); else if (value) value = value.replace(/\S/g, "");
                    return value;
                }
                rawBeforeOpen(root) {
                    let value;
                    root.walk((i => {
                        if (i.type !== "decl") {
                            value = i.raws.between;
                            if (typeof value !== "undefined") return false;
                        }
                    }));
                    return value;
                }
                rawBeforeRule(root) {
                    let value;
                    root.walk((i => {
                        if (i.nodes && (i.parent !== root || root.first !== i)) if (typeof i.raws.before !== "undefined") {
                            value = i.raws.before;
                            if (value.includes("\n")) value = value.replace(/[^\n]+$/, "");
                            return false;
                        }
                    }));
                    if (value) value = value.replace(/\S/g, "");
                    return value;
                }
                rawColon(root) {
                    let value;
                    root.walkDecls((i => {
                        if (typeof i.raws.between !== "undefined") {
                            value = i.raws.between.replace(/[^\s:]/g, "");
                            return false;
                        }
                    }));
                    return value;
                }
                rawEmptyBody(root) {
                    let value;
                    root.walk((i => {
                        if (i.nodes && i.nodes.length === 0) {
                            value = i.raws.after;
                            if (typeof value !== "undefined") return false;
                        }
                    }));
                    return value;
                }
                rawIndent(root) {
                    if (root.raws.indent) return root.raws.indent;
                    let value;
                    root.walk((i => {
                        let p = i.parent;
                        if (p && p !== root && p.parent && p.parent === root) if (typeof i.raws.before !== "undefined") {
                            let parts = i.raws.before.split("\n");
                            value = parts[parts.length - 1];
                            value = value.replace(/\S/g, "");
                            return false;
                        }
                    }));
                    return value;
                }
                rawSemicolon(root) {
                    let value;
                    root.walk((i => {
                        if (i.nodes && i.nodes.length && i.last.type === "decl") {
                            value = i.raws.semicolon;
                            if (typeof value !== "undefined") return false;
                        }
                    }));
                    return value;
                }
                rawValue(node, prop) {
                    let value = node[prop];
                    let raw = node.raws[prop];
                    if (raw && raw.value === value) return raw.raw;
                    return value;
                }
                root(node) {
                    this.body(node);
                    if (node.raws.after) this.builder(node.raws.after);
                }
                rule(node) {
                    this.block(node, this.rawValue(node, "selector"));
                    if (node.raws.ownSemicolon) this.builder(node.raws.ownSemicolon, node, "end");
                }
                stringify(node, semicolon) {
                    if (!this[node.type]) throw new Error("Unknown AST node type " + node.type + ". " + "Maybe you need to change PostCSS stringifier.");
                    this[node.type](node, semicolon);
                }
            }
            module.exports = Stringifier;
            Stringifier.default = Stringifier;
        },
        303: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            let Stringifier = __webpack_require__(668);
            function stringify(node, builder) {
                let str = new Stringifier(builder);
                str.stringify(node);
            }
            module.exports = stringify;
            stringify.default = stringify;
        },
        151: module => {
            "use strict";
            module.exports.isClean = Symbol("isClean");
            module.exports.my = Symbol("my");
        },
        781: module => {
            "use strict";
            const SINGLE_QUOTE = "'".charCodeAt(0);
            const DOUBLE_QUOTE = '"'.charCodeAt(0);
            const BACKSLASH = "\\".charCodeAt(0);
            const SLASH = "/".charCodeAt(0);
            const NEWLINE = "\n".charCodeAt(0);
            const SPACE = " ".charCodeAt(0);
            const FEED = "\f".charCodeAt(0);
            const TAB = "\t".charCodeAt(0);
            const CR = "\r".charCodeAt(0);
            const OPEN_SQUARE = "[".charCodeAt(0);
            const CLOSE_SQUARE = "]".charCodeAt(0);
            const OPEN_PARENTHESES = "(".charCodeAt(0);
            const CLOSE_PARENTHESES = ")".charCodeAt(0);
            const OPEN_CURLY = "{".charCodeAt(0);
            const CLOSE_CURLY = "}".charCodeAt(0);
            const SEMICOLON = ";".charCodeAt(0);
            const ASTERISK = "*".charCodeAt(0);
            const COLON = ":".charCodeAt(0);
            const AT = "@".charCodeAt(0);
            const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
            const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
            const RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
            const RE_HEX_ESCAPE = /[\da-f]/i;
            module.exports = function tokenizer(input, options = {}) {
                let css = input.css.valueOf();
                let ignore = options.ignoreErrors;
                let code, content, escape, next, quote;
                let currentToken, escaped, escapePos, n, prev;
                let length = css.length;
                let pos = 0;
                let buffer = [];
                let returned = [];
                function position() {
                    return pos;
                }
                function unclosed(what) {
                    throw input.error("Unclosed " + what, pos);
                }
                function endOfFile() {
                    return returned.length === 0 && pos >= length;
                }
                function nextToken(opts) {
                    if (returned.length) return returned.pop();
                    if (pos >= length) return;
                    let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
                    code = css.charCodeAt(pos);
                    switch (code) {
                      case NEWLINE:
                      case SPACE:
                      case TAB:
                      case CR:
                      case FEED:
                        next = pos;
                        do {
                            next += 1;
                            code = css.charCodeAt(next);
                        } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
                        currentToken = [ "space", css.slice(pos, next) ];
                        pos = next - 1;
                        break;

                      case OPEN_SQUARE:
                      case CLOSE_SQUARE:
                      case OPEN_CURLY:
                      case CLOSE_CURLY:
                      case COLON:
                      case SEMICOLON:
                      case CLOSE_PARENTHESES:
                        {
                            let controlChar = String.fromCharCode(code);
                            currentToken = [ controlChar, controlChar, pos ];
                            break;
                        }

                      case OPEN_PARENTHESES:
                        prev = buffer.length ? buffer.pop()[1] : "";
                        n = css.charCodeAt(pos + 1);
                        if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
                            next = pos;
                            do {
                                escaped = false;
                                next = css.indexOf(")", next + 1);
                                if (next === -1) if (ignore || ignoreUnclosed) {
                                    next = pos;
                                    break;
                                } else unclosed("bracket");
                                escapePos = next;
                                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                                    escapePos -= 1;
                                    escaped = !escaped;
                                }
                            } while (escaped);
                            currentToken = [ "brackets", css.slice(pos, next + 1), pos, next ];
                            pos = next;
                        } else {
                            next = css.indexOf(")", pos + 1);
                            content = css.slice(pos, next + 1);
                            if (next === -1 || RE_BAD_BRACKET.test(content)) currentToken = [ "(", "(", pos ]; else {
                                currentToken = [ "brackets", content, pos, next ];
                                pos = next;
                            }
                        }
                        break;

                      case SINGLE_QUOTE:
                      case DOUBLE_QUOTE:
                        quote = code === SINGLE_QUOTE ? "'" : '"';
                        next = pos;
                        do {
                            escaped = false;
                            next = css.indexOf(quote, next + 1);
                            if (next === -1) if (ignore || ignoreUnclosed) {
                                next = pos + 1;
                                break;
                            } else unclosed("string");
                            escapePos = next;
                            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                                escapePos -= 1;
                                escaped = !escaped;
                            }
                        } while (escaped);
                        currentToken = [ "string", css.slice(pos, next + 1), pos, next ];
                        pos = next;
                        break;

                      case AT:
                        RE_AT_END.lastIndex = pos + 1;
                        RE_AT_END.test(css);
                        if (RE_AT_END.lastIndex === 0) next = css.length - 1; else next = RE_AT_END.lastIndex - 2;
                        currentToken = [ "at-word", css.slice(pos, next + 1), pos, next ];
                        pos = next;
                        break;

                      case BACKSLASH:
                        next = pos;
                        escape = true;
                        while (css.charCodeAt(next + 1) === BACKSLASH) {
                            next += 1;
                            escape = !escape;
                        }
                        code = css.charCodeAt(next + 1);
                        if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
                            next += 1;
                            if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) next += 1;
                                if (css.charCodeAt(next + 1) === SPACE) next += 1;
                            }
                        }
                        currentToken = [ "word", css.slice(pos, next + 1), pos, next ];
                        pos = next;
                        break;

                      default:
                        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
                            next = css.indexOf("*/", pos + 2) + 1;
                            if (next === 0) if (ignore || ignoreUnclosed) next = css.length; else unclosed("comment");
                            currentToken = [ "comment", css.slice(pos, next + 1), pos, next ];
                            pos = next;
                        } else {
                            RE_WORD_END.lastIndex = pos + 1;
                            RE_WORD_END.test(css);
                            if (RE_WORD_END.lastIndex === 0) next = css.length - 1; else next = RE_WORD_END.lastIndex - 2;
                            currentToken = [ "word", css.slice(pos, next + 1), pos, next ];
                            buffer.push(currentToken);
                            pos = next;
                        }
                        break;
                    }
                    pos++;
                    return currentToken;
                }
                function back(token) {
                    returned.push(token);
                }
                return {
                    back,
                    endOfFile,
                    nextToken,
                    position
                };
            };
        },
        156: module => {
            "use strict";
            let printed = {};
            module.exports = function warnOnce(message) {
                if (printed[message]) return;
                printed[message] = true;
                if (typeof console !== "undefined" && console.warn) console.warn(message);
            };
        },
        38: module => {
            "use strict";
            class Warning {
                constructor(text, opts = {}) {
                    this.type = "warning";
                    this.text = text;
                    if (opts.node && opts.node.source) {
                        let range = opts.node.rangeBy(opts);
                        this.line = range.start.line;
                        this.column = range.start.column;
                        this.endLine = range.end.line;
                        this.endColumn = range.end.column;
                    }
                    for (let opt in opts) this[opt] = opts[opt];
                }
                toString() {
                    if (this.node) return this.node.error(this.text, {
                        index: this.index,
                        plugin: this.plugin,
                        word: this.word
                    }).message;
                    if (this.plugin) return this.plugin + ": " + this.text;
                    return this.text;
                }
            }
            module.exports = Warning;
            Warning.default = Warning;
        },
        746: () => {},
        977: () => {},
        197: () => {},
        866: () => {},
        739: () => {},
        42: module => {
            let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
            let customAlphabet = (alphabet, defaultSize = 21) => (size = defaultSize) => {
                let id = "";
                let i = size;
                while (i--) id += alphabet[Math.random() * alphabet.length | 0];
                return id;
            };
            let nanoid = (size = 21) => {
                let id = "";
                let i = size;
                while (i--) id += urlAlphabet[Math.random() * 64 | 0];
                return id;
            };
            module.exports = {
                nanoid,
                customAlphabet
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        __webpack_require__.r = exports => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    (() => {
        "use strict";
        var common_utils_namespaceObject = {};
        __webpack_require__.r(common_utils_namespaceObject);
        __webpack_require__.d(common_utils_namespaceObject, {
            hasBrowserEnv: () => hasBrowserEnv,
            hasStandardBrowserEnv: () => hasStandardBrowserEnv,
            hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
            navigator: () => _navigator,
            origin: () => origin
        });
        const modules_flsModules = {};
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    lockPaddingElements.forEach((lockPaddingElement => {
                        lockPaddingElement.style.paddingRight = "";
                    }));
                    document.body.style.paddingRight = "";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            if (bodyLockStatus) {
                const lockPaddingElements = document.querySelectorAll("[data-lp]");
                const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = lockPaddingValue;
                }));
                document.body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                    console.log("cliked");
                }
            }));
        }
        function functions_FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if (formRequiredItem.dataset.required === "email") {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (modules_flsModules.select) {
                        let selects = form.querySelectorAll("div.select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            modules_flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        class SelectConstructor {
            constructor(props, data = null) {
                let defaultConfig = {
                    init: true,
                    logging: true,
                    speed: 150
                };
                this.config = Object.assign(defaultConfig, props);
                this.selectClasses = {
                    classSelect: "select",
                    classSelectBody: "select__body",
                    classSelectTitle: "select__title",
                    classSelectValue: "select__value",
                    classSelectLabel: "select__label",
                    classSelectInput: "select__input",
                    classSelectText: "select__text",
                    classSelectLink: "select__link",
                    classSelectOptions: "select__options",
                    classSelectOptionsScroll: "select__scroll",
                    classSelectOption: "select__option",
                    classSelectContent: "select__content",
                    classSelectRow: "select__row",
                    classSelectData: "select__asset",
                    classSelectDisabled: "_select-disabled",
                    classSelectTag: "_select-tag",
                    classSelectOpen: "_select-open",
                    classSelectActive: "_select-active",
                    classSelectFocus: "_select-focus",
                    classSelectMultiple: "_select-multiple",
                    classSelectCheckBox: "_select-checkbox",
                    classSelectOptionSelected: "_select-selected",
                    classSelectPseudoLabel: "_select-pseudo-label"
                };
                this._this = this;
                if (this.config.init) {
                    const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                    if (selectItems.length) {
                        this.selectsInit(selectItems);
                        this.setLogging(`Прокинувся, построїв селектов: (${selectItems.length})`);
                    } else this.setLogging("Сплю, немає жодного select");
                }
            }
            getSelectClass(className) {
                return `.${className}`;
            }
            getSelectElement(selectItem, className) {
                return {
                    originalSelect: selectItem.querySelector("select"),
                    selectElement: selectItem.querySelector(this.getSelectClass(className))
                };
            }
            selectsInit(selectItems) {
                selectItems.forEach(((originalSelect, index) => {
                    this.selectInit(originalSelect, index + 1);
                }));
                document.addEventListener("click", function(e) {
                    this.selectsActions(e);
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    this.selectsActions(e);
                }.bind(this));
                document.addEventListener("focusin", function(e) {
                    this.selectsActions(e);
                }.bind(this));
                document.addEventListener("focusout", function(e) {
                    this.selectsActions(e);
                }.bind(this));
            }
            selectInit(originalSelect, index) {
                const _this = this;
                let selectItem = document.createElement("div");
                selectItem.classList.add(this.selectClasses.classSelect);
                originalSelect.parentNode.insertBefore(selectItem, originalSelect);
                selectItem.appendChild(originalSelect);
                originalSelect.hidden = true;
                index ? originalSelect.dataset.id = index : null;
                if (this.getSelectPlaceholder(originalSelect)) {
                    originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                    if (this.getSelectPlaceholder(originalSelect).label.show) {
                        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                        selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                    }
                }
                selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
                this.selectBuild(originalSelect);
                originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
                this.config.speed = +originalSelect.dataset.speed;
                originalSelect.addEventListener("change", (function(e) {
                    _this.selectChange(e);
                }));
            }
            selectBuild(originalSelect) {
                const selectItem = originalSelect.parentElement;
                selectItem.dataset.id = originalSelect.dataset.id;
                originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
                originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
                originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setOptions(selectItem, originalSelect);
                originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
                originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
                this.selectDisabled(selectItem, originalSelect);
            }
            selectsActions(e) {
                const targetElement = e.target;
                const targetType = e.type;
                if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                    const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                    const originalSelect = this.getSelectElement(selectItem).originalSelect;
                    if (targetType === "click") {
                        if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                            this.optionAction(selectItem, originalSelect, optionItem);
                        } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                            this.optionAction(selectItem, originalSelect, optionItem);
                        }
                    } else if (targetType === "focusin" || targetType === "focusout") {
                        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) targetType === "focusin" ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                    } else if (targetType === "keydown" && e.code === "Escape") this.selectsСlose();
                } else this.selectsСlose();
            }
            selectsСlose(selectOneGroup) {
                const selectsGroup = selectOneGroup ? selectOneGroup : document;
                const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
                if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                    this.selectСlose(selectActiveItem);
                }));
            }
            selectСlose(selectItem) {
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.remove(this.selectClasses.classSelectOpen);
                    _slideUp(selectOptions, originalSelect.dataset.speed);
                    setTimeout((() => {
                        selectItem.style.zIndex = "";
                    }), originalSelect.dataset.speed);
                }
            }
            selectAction(selectItem) {
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
                this.setOptionsPosition(selectItem);
                if (originalSelect.closest("[data-one-select]")) {
                    const selectOneGroup = originalSelect.closest("[data-one-select]");
                    this.selectsСlose(selectOneGroup);
                }
                setTimeout((() => {
                    if (!selectOptions.classList.contains("_slide")) {
                        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                        _slideToggle(selectOptions, originalSelect.dataset.speed);
                        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) selectItem.style.zIndex = selectOpenzIndex; else setTimeout((() => {
                            selectItem.style.zIndex = "";
                        }), originalSelect.dataset.speed);
                    }
                }), 0);
            }
            setSelectTitleValue(selectItem, originalSelect) {
                const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
                const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                if (selectItemTitle) selectItemTitle.remove();
                selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
                originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            }
            getSelectTitleValue(selectItem, originalSelect) {
                let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
                if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                    selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                    if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                        if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                    }
                }
                selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
                let pseudoAttribute = "";
                let pseudoAttributeClass = "";
                if (originalSelect.hasAttribute("data-pseudo-label")) {
                    pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                    pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
                }
                this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
                if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                    const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                    return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
                }
            }
            getSelectElementContent(selectOption) {
                const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
                const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
                let selectOptionContentHTML = ``;
                selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
                selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
                selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
                selectOptionContentHTML += selectOptionData ? `</span>` : "";
                selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
                selectOptionContentHTML += selectOption.textContent;
                selectOptionContentHTML += selectOptionData ? `</span>` : "";
                selectOptionContentHTML += selectOptionData ? `</span>` : "";
                return selectOptionContentHTML;
            }
            getSelectPlaceholder(originalSelect) {
                const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
                if (selectPlaceholder) return {
                    value: selectPlaceholder.textContent,
                    show: selectPlaceholder.hasAttribute("data-show"),
                    label: {
                        show: selectPlaceholder.hasAttribute("data-label"),
                        text: selectPlaceholder.dataset.label
                    }
                };
            }
            getSelectedOptionsData(originalSelect, type) {
                let selectedOptions = [];
                if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
                return {
                    elements: selectedOptions.map((option => option)),
                    values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                    html: selectedOptions.map((option => this.getSelectElementContent(option)))
                };
            }
            getOptions(originalSelect) {
                const selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
                const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
                let selectOptions = Array.from(originalSelect.options);
                if (selectOptions.length > 0) {
                    let selectOptionsHTML = ``;
                    if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                    selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ""} class="${this.selectClasses.classSelectOptionsScroll}">`;
                    selectOptions.forEach((selectOption => {
                        selectOptionsHTML += this.getOption(selectOption, originalSelect);
                    }));
                    selectOptionsHTML += `</div>`;
                    return selectOptionsHTML;
                }
            }
            getOption(selectOption, originalSelect) {
                const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
                const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
                const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
                const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
                const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
                let selectOptionHTML = ``;
                selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
                selectOptionHTML += this.getSelectElementContent(selectOption);
                selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
                return selectOptionHTML;
            }
            setOptions(selectItem, originalSelect) {
                const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                selectItemOptions.innerHTML = this.getOptions(originalSelect);
            }
            setOptionsPosition(selectItem) {
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
                const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
                const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;
                if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
                    selectOptions.hidden = false;
                    const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue("max-height"));
                    const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
                    const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
                    selectOptions.hidden = true;
                    const selectItemHeight = selectItem.offsetHeight;
                    const selectItemPos = selectItem.getBoundingClientRect().top;
                    const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
                    const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);
                    if (selectItemResult < 0) {
                        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
                        if (newMaxHeightValue < 100) {
                            selectItem.classList.add("select--show-top");
                            selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
                        } else {
                            selectItem.classList.remove("select--show-top");
                            selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
                        }
                    }
                } else setTimeout((() => {
                    selectItem.classList.remove("select--show-top");
                    selectItemScroll.style.maxHeight = customMaxHeightValue;
                }), +originalSelect.dataset.speed);
            }
            optionAction(selectItem, originalSelect, optionItem) {
                const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
                if (!selectOptions.classList.contains("_slide")) {
                    if (originalSelect.multiple) {
                        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                        originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                            originalSelectSelectedItem.removeAttribute("selected");
                        }));
                        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                        selectSelectedItems.forEach((selectSelectedItems => {
                            originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                        }));
                    } else {
                        if (!originalSelect.hasAttribute("data-show-selected")) setTimeout((() => {
                            if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                            optionItem.hidden = true;
                        }), this.config.speed);
                        originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                        this.selectAction(selectItem);
                    }
                    this.setSelectTitleValue(selectItem, originalSelect);
                    this.setSelectChange(originalSelect);
                }
            }
            selectChange(e) {
                const originalSelect = e.target;
                this.selectBuild(originalSelect);
                this.setSelectChange(originalSelect);
            }
            setSelectChange(originalSelect) {
                if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
                if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                    let tempButton = document.createElement("button");
                    tempButton.type = "submit";
                    originalSelect.closest("form").append(tempButton);
                    tempButton.click();
                    tempButton.remove();
                }
                const selectItem = originalSelect.parentElement;
                this.selectCallback(selectItem, originalSelect);
            }
            selectDisabled(selectItem, originalSelect) {
                if (originalSelect.disabled) {
                    selectItem.classList.add(this.selectClasses.classSelectDisabled);
                    this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
                } else {
                    selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                    this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
                }
            }
            searchActions(selectItem) {
                this.getSelectElement(selectItem).originalSelect;
                const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
                const _this = this;
                selectInput.addEventListener("input", (function() {
                    selectOptionsItems.forEach((selectOptionsItem => {
                        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                    }));
                    selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
                }));
            }
            selectCallback(selectItem, originalSelect) {
                document.dispatchEvent(new CustomEvent("selectCallback", {
                    detail: {
                        select: originalSelect
                    }
                }));
            }
            setLogging(message) {
                this.config.logging ? functions_FLS(`[select]: ${message} `) : null;
            }
        }
        modules_flsModules.select = new SelectConstructor({});
        function ssr_window_esm_isObject(obj) {
            return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target, src) {
            if (target === void 0) target = {};
            if (src === void 0) src = {};
            Object.keys(src).forEach((key => {
                if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = typeof document !== "undefined" ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if (typeof setTimeout === "undefined") {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if (typeof setTimeout === "undefined") return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = typeof window !== "undefined" ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function utils_classesToTokens(classes) {
            if (classes === void 0) classes = "";
            return classes.trim().split(" ").filter((c => !!c.trim()));
        }
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay) {
            if (delay === void 0) delay = 0;
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis) {
            if (axis === void 0) axis = "x";
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
        }
        function isNode(node) {
            if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
            return node && (node.nodeType === 1 || node.nodeType === 11);
        }
        function utils_extend() {
            const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < arguments.length; i += 1) {
                const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll(_ref) {
            let {swiper, targetPosition, side} = _ref;
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (startTime === null) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        function utils_elementChildren(element, selector) {
            if (selector === void 0) selector = "";
            const children = [ ...element.children ];
            if (element instanceof HTMLSlotElement) children.push(...element.assignedElements());
            if (!selector) return children;
            return children.filter((el => el.matches(selector)));
        }
        function elementIsChildOf(el, parent) {
            const isChild = parent.contains(el);
            if (!isChild && parent instanceof HTMLSlotElement) {
                const children = [ ...parent.assignedElements() ];
                return children.includes(el);
            }
            return isChild;
        }
        function showWarning(text) {
            try {
                console.warn(text);
                return;
            } catch (err) {}
        }
        function utils_createElement(tag, classes) {
            if (classes === void 0) classes = [];
            const el = document.createElement(tag);
            el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
            return el;
        }
        function elementPrevAll(el, selector) {
            const prevEls = [];
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (prev.matches(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return prevEls;
        }
        function elementNextAll(el, selector) {
            const nextEls = [];
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (next.matches(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return nextEls;
        }
        function elementStyle(el, prop) {
            const window = ssr_window_esm_getWindow();
            return window.getComputedStyle(el, null).getPropertyValue(prop);
        }
        function utils_elementIndex(el) {
            let child = el;
            let i;
            if (child) {
                i = 0;
                while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
                return i;
            }
            return;
        }
        function utils_elementParents(el, selector) {
            const parents = [];
            let parent = el.parentElement;
            while (parent) {
                if (selector) {
                    if (parent.matches(selector)) parents.push(parent);
                } else parents.push(parent);
                parent = parent.parentElement;
            }
            return parents;
        }
        function utils_elementOuterSize(el, size, includeMargins) {
            const window = ssr_window_esm_getWindow();
            if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
            return el.offsetWidth;
        }
        function utils_makeElementsArray(el) {
            return (Array.isArray(el) ? el : [ el ]).filter((e => !!e));
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice(_temp) {
            let {userAgent} = _temp === void 0 ? {} : _temp;
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = platform === "Win32";
            let macos = platform === "MacIntel";
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides) {
            if (overrides === void 0) overrides = {};
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            const device = getDevice();
            let needPerspectiveFix = false;
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            if (isSafari()) {
                const ua = String(window.navigator.userAgent);
                if (ua.includes("Version/")) {
                    const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num => Number(num)));
                    needPerspectiveFix = major < 16 || major === 16 && minor < 2;
                }
            }
            const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
            const isSafariBrowser = isSafari();
            const need3dFix = isSafariBrowser || isWebView && device.ios;
            return {
                isSafari: needPerspectiveFix || isSafariBrowser,
                needPerspectiveFix,
                need3dFix,
                isWebView
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize(_ref) {
            let {swiper, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((_ref2 => {
                            let {contentBoxSize, contentRect, target} = _ref2;
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = function(target, options) {
                if (options === void 0) options = {};
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (swiper.__preventObserver__) return;
                    if (mutations.length === 1) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                    childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
                    characterData: typeof options.characterData === "undefined" ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = utils_elementParents(swiper.hostEl);
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.hostEl, {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.wrapperEl, {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        var eventsEmitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (typeof handler !== "function") return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (typeof handler !== "function") return self;
                function onceHandler() {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (typeof handler !== "function") return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit() {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                if (typeof args[0] === "string" || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const el = swiper.el;
            if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
            if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
            if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
            width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
            height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {wrapperEl, slidesEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if (typeof swiperSize === "undefined") return;
            if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
            swiper.virtualSize = -spaceBetween;
            slides.forEach((slideEl => {
                if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
                slideEl.style.marginBottom = "";
                slideEl.style.marginTop = "";
            }));
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
            let slideSize;
            const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key => typeof params.breakpoints[key].slidesPerView !== "undefined")).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                let slide;
                if (slides[i]) slide = slides[i];
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
                if (slides[i] && elementStyle(slide, "display") === "none") continue;
                if (params.slidesPerView === "auto") {
                    if (shouldResetSlideSize) slides[i].style[swiper.getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide);
                    const currentTransform = slide.style.transform;
                    const currentWebKitTransform = slide.style.webkitTransform;
                    if (currentTransform) slide.style.transform = "none";
                    if (currentWebKitTransform) slide.style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? utils_elementOuterSize(slide, "width", true) : utils_elementOuterSize(slide, "height", true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide;
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide.style.transform = currentTransform;
                    if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
            if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (isVirtual && params.loop) {
                const size = slidesSizesGrid[0] + spaceBetween;
                if (params.slidesPerGroup > 1) {
                    const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                    const groupSize = size * params.slidesPerGroup;
                    for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
                }
                for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                    if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                    slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                    swiper.virtualSize += size;
                }
            }
            if (snapGrid.length === 0) snapGrid = [ 0 ];
            if (spaceBetween !== 0) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode || params.loop) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).forEach((slideEl => {
                    slideEl.style[key] = `${spaceBetween}px`;
                }));
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (spaceBetween || 0);
                }));
                allSlidesSize -= spaceBetween;
                const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
                snapGrid = snapGrid.map((snap => {
                    if (snap <= 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (spaceBetween || 0);
                }));
                allSlidesSize -= spaceBetween;
                const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
                if (allSlidesSize + offsetSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            swiper.emit("slidesUpdated");
            if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
                return swiper.slides[index];
            };
            if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
        }
        const toggleSlideClasses$1 = (slideEl, condition, className) => {
            if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
        };
        function updateSlidesProgress(translate) {
            if (translate === void 0) translate = this && this.translate || 0;
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (slides.length === 0) return;
            if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            let spaceBetween = params.spaceBetween;
            if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                }
                toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
                toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
        }
        function updateProgress(translate) {
            const swiper = this;
            if (typeof translate === "undefined") {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd, progressLoop} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (translatesDiff === 0) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
                const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
                isBeginning = isBeginningRounded || progress <= 0;
                isEnd = isEndRounded || progress >= 1;
                if (isBeginningRounded) progress = 0;
                if (isEndRounded) progress = 1;
            }
            if (params.loop) {
                const firstSlideIndex = swiper.getSlideIndexByData(0);
                const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
                const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
                const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
                const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
                const translateAbs = Math.abs(translate);
                if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
                if (progressLoop > 1) progressLoop -= 1;
            }
            Object.assign(swiper, {
                progress,
                progressLoop,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        const toggleSlideClasses = (slideEl, condition, className) => {
            if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
        };
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, slidesEl, activeIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
            let activeSlide;
            let prevSlide;
            let nextSlide;
            if (isVirtual) if (params.loop) {
                let slideIndex = activeIndex - swiper.virtual.slidesBefore;
                if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
                if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
                activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
            } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
                activeSlide = slides.filter((slideEl => slideEl.column === activeIndex))[0];
                nextSlide = slides.filter((slideEl => slideEl.column === activeIndex + 1))[0];
                prevSlide = slides.filter((slideEl => slideEl.column === activeIndex - 1))[0];
            } else activeSlide = slides[activeIndex];
            if (activeSlide) if (!gridEnabled) {
                nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !nextSlide) nextSlide = slides[0];
                prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
                if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
            }
            slides.forEach((slideEl => {
                toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
                toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
                toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
            }));
            swiper.emitSlidesClasses();
        }
        const processLazyPreloader = (swiper, imageEl) => {
            if (!swiper || swiper.destroyed || !swiper.params) return;
            const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
            const slideEl = imageEl.closest(slideSelector());
            if (slideEl) {
                let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame((() => {
                    if (slideEl.shadowRoot) {
                        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                        if (lazyEl) lazyEl.remove();
                    }
                }));
                if (lazyEl) lazyEl.remove();
            }
        };
        const unlazy = (swiper, index) => {
            if (!swiper.slides[index]) return;
            const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
            if (imageEl) imageEl.removeAttribute("loading");
        };
        const preload = swiper => {
            if (!swiper || swiper.destroyed || !swiper.params) return;
            let amount = swiper.params.lazyPreloadPrevNext;
            const len = swiper.slides.length;
            if (!len || !amount || amount < 0) return;
            amount = Math.min(amount, len);
            const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
            const activeIndex = swiper.activeIndex;
            if (swiper.params.grid && swiper.params.grid.rows > 1) {
                const activeColumn = activeIndex;
                const preloadColumns = [ activeColumn - amount ];
                preloadColumns.push(...Array.from({
                    length: amount
                }).map(((_, i) => activeColumn + slidesPerView + i)));
                swiper.slides.forEach(((slideEl, i) => {
                    if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
                }));
                return;
            }
            const slideIndexLastInView = activeIndex + slidesPerView - 1;
            if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
                const realIndex = (i % len + len) % len;
                if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
            } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
        };
        function getActiveIndexByTranslate(swiper) {
            const {slidesGrid, params} = swiper;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            let activeIndex;
            for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
            } else if (translate >= slidesGrid[i]) activeIndex = i;
            if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
            return activeIndex;
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            const getVirtualRealIndex = aIndex => {
                let realIndex = aIndex - swiper.virtual.slidesBefore;
                if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
                if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
                return realIndex;
            };
            if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex && !swiper.params.loop) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
                swiper.realIndex = getVirtualRealIndex(activeIndex);
                return;
            }
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            let realIndex;
            if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
                const firstSlideInColumn = swiper.slides.filter((slideEl => slideEl.column === activeIndex))[0];
                let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
                if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
                realIndex = Math.floor(activeSlideIndex / params.grid.rows);
            } else if (swiper.slides[activeIndex]) {
                const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
                if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
            } else realIndex = activeIndex;
            Object.assign(swiper, {
                previousSnapIndex,
                snapIndex,
                previousRealIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            if (swiper.initialized) preload(swiper);
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) {
                if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
                swiper.emit("slideChange");
            }
        }
        function updateClickedSlide(el, path) {
            const swiper = this;
            const params = swiper.params;
            let slide = el.closest(`.${params.slideClass}, swiper-slide`);
            if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach((pathEl => {
                if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
            }));
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        var update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis) {
            if (axis === void 0) axis = this.isHorizontal() ? "x" : "y";
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate(wrapperEl, axis);
            currentTranslate += swiper.cssOverflowAdjustment();
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
                if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
                wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            }
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
            if (translate === void 0) translate = 0;
            if (speed === void 0) speed = this.params.speed;
            if (runCallbacks === void 0) runCallbacks = true;
            if (translateBounds === void 0) translateBounds = true;
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (speed === 0) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        swiper.animating = false;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        var translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) {
                swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
                swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
            }
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit(_ref) {
            let {swiper, runCallbacks, direction, step} = _ref;
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if (dir === "reset") {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks, direction) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd(runCallbacks, direction) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        var transition = {
            setTransition,
            transitionStart,
            transitionEnd
        };
        function slideTo(index, speed, runCallbacks, internal, initial) {
            if (index === void 0) index = 0;
            if (runCallbacks === void 0) runCallbacks = true;
            if (typeof index === "string") index = parseInt(index, 10);
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) return false;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            const translate = -snapGrid[snapIndex];
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(translate * 100);
                const normalizedGrid = Math.floor(slidesGrid[i] * 100);
                const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
                if (typeof slidesGrid[i + 1] !== "undefined") {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            swiper.updateProgress(translate);
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            const isInitialVirtual = isVirtual && initial;
            if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if (params.effect !== "slide") swiper.setTranslate(translate);
                if (direction !== "reset") {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (speed === 0) {
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                        swiper._cssModeVirtualInitialSet = true;
                        requestAnimationFrame((() => {
                            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                        }));
                    } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._immediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index, speed, runCallbacks, internal) {
            if (index === void 0) index = 0;
            if (runCallbacks === void 0) runCallbacks = true;
            if (typeof index === "string") {
                const indexAsNumber = parseInt(index, 10);
                index = indexAsNumber;
            }
            const swiper = this;
            if (swiper.destroyed) return;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
            let newIndex = index;
            if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
                let targetSlideIndex;
                if (gridEnabled) {
                    const slideIndex = newIndex * swiper.params.grid.rows;
                    targetSlideIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
                } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
                const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
                const {centeredSlides} = swiper.params;
                let slidesPerView = swiper.params.slidesPerView;
                if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                    slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                    if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
                }
                let needLoopFix = cols - targetSlideIndex < slidesPerView;
                if (centeredSlides) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
                if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) needLoopFix = false;
                if (needLoopFix) {
                    const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                    swiper.loopFix({
                        direction,
                        slideTo: true,
                        activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                        slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                    });
                }
                if (gridEnabled) {
                    const slideIndex = newIndex * swiper.params.grid.rows;
                    newIndex = swiper.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex))[0].column;
                } else newIndex = swiper.getSlideIndexByData(newIndex);
            }
            requestAnimationFrame((() => {
                swiper.slideTo(newIndex, speed, runCallbacks, internal);
            }));
            return swiper;
        }
        function slideNext(speed, runCallbacks, internal) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {enabled, params, animating} = swiper;
            if (!enabled || swiper.destroyed) return swiper;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            let perGroup = params.slidesPerGroup;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            if (params.loop) {
                if (animating && !isVirtual && params.loopPreventsSliding) return false;
                swiper.loopFix({
                    direction: "next"
                });
                swiper._clientLeft = swiper.wrapperEl.clientLeft;
                if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                    requestAnimationFrame((() => {
                        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                    }));
                    return true;
                }
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed, runCallbacks, internal) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
            if (!enabled || swiper.destroyed) return swiper;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            if (params.loop) {
                if (animating && !isVirtual && params.loopPreventsSliding) return false;
                swiper.loopFix({
                    direction: "prev"
                });
                swiper._clientLeft = swiper.wrapperEl.clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if (typeof prevSnap === "undefined" && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if (typeof prevSnapIndex !== "undefined") prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if (typeof prevSnap !== "undefined") {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
                requestAnimationFrame((() => {
                    swiper.slideTo(prevIndex, speed, runCallbacks, internal);
                }));
                return true;
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed, runCallbacks, internal) {
            if (runCallbacks === void 0) runCallbacks = true;
            const swiper = this;
            if (swiper.destroyed) return;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed, runCallbacks, internal, threshold) {
            if (runCallbacks === void 0) runCallbacks = true;
            if (threshold === void 0) threshold = .5;
            const swiper = this;
            if (swiper.destroyed) return;
            if (typeof speed === "undefined") speed = swiper.params.speed;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            if (swiper.destroyed) return;
            const {params, slidesEl} = swiper;
            const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        var slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate(slideRealIndex) {
            const swiper = this;
            const {params, slidesEl} = swiper;
            if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
            const initSlides = () => {
                const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
                slides.forEach(((el, index) => {
                    el.setAttribute("data-swiper-slide-index", index);
                }));
            };
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
            const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
            const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
            const addBlankSlides = amountOfSlides => {
                for (let i = 0; i < amountOfSlides; i += 1) {
                    const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                    swiper.slidesEl.append(slideEl);
                }
            };
            if (shouldFillGroup) {
                if (params.loopAddBlankSlides) {
                    const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                    addBlankSlides(slidesToAdd);
                    swiper.recalcSlides();
                    swiper.updateSlides();
                } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                initSlides();
            } else if (shouldFillGrid) {
                if (params.loopAddBlankSlides) {
                    const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                    addBlankSlides(slidesToAdd);
                    swiper.recalcSlides();
                    swiper.updateSlides();
                } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                initSlides();
            } else initSlides();
            swiper.loopFix({
                slideRealIndex,
                direction: params.centeredSlides ? void 0 : "next"
            });
        }
        function loopFix(_temp) {
            let {slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, byController, byMousewheel} = _temp === void 0 ? {} : _temp;
            const swiper = this;
            if (!swiper.params.loop) return;
            swiper.emit("beforeLoopFix");
            const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
            const {centeredSlides} = params;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            if (swiper.virtual && params.virtual.enabled) {
                if (slideTo) if (!params.centeredSlides && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
                swiper.allowSlidePrev = allowSlidePrev;
                swiper.allowSlideNext = allowSlideNext;
                swiper.emit("loopFix");
                return;
            }
            let slidesPerView = params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
                if (centeredSlides && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
            let loopedSlides = slidesPerGroup;
            if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
            loopedSlides += params.loopAdditionalSlides;
            swiper.loopedSlides = loopedSlides;
            const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
            if (slides.length < slidesPerView + loopedSlides) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const prependSlidesIndexes = [];
            const appendSlidesIndexes = [];
            let activeIndex = swiper.activeIndex;
            if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.filter((el => el.classList.contains(params.slideActiveClass)))[0]); else activeIndex = activeSlideIndex;
            const isNext = direction === "next" || !direction;
            const isPrev = direction === "prev" || !direction;
            let slidesPrepended = 0;
            let slidesAppended = 0;
            const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
            const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
            const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
            if (activeColIndexWithShift < loopedSlides) {
                slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
                for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                    const index = i - Math.floor(i / cols) * cols;
                    if (gridEnabled) {
                        const colIndexToPrepend = cols - index - 1;
                        for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                    } else prependSlidesIndexes.push(cols - index - 1);
                }
            } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
                slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
                for (let i = 0; i < slidesAppended; i += 1) {
                    const index = i - Math.floor(i / cols) * cols;
                    if (gridEnabled) slides.forEach(((slide, slideIndex) => {
                        if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                    })); else appendSlidesIndexes.push(index);
                }
            }
            swiper.__preventObserver__ = true;
            requestAnimationFrame((() => {
                swiper.__preventObserver__ = false;
            }));
            if (isPrev) prependSlidesIndexes.forEach((index => {
                slides[index].swiperLoopMoveDOM = true;
                slidesEl.prepend(slides[index]);
                slides[index].swiperLoopMoveDOM = false;
            }));
            if (isNext) appendSlidesIndexes.forEach((index => {
                slides[index].swiperLoopMoveDOM = true;
                slidesEl.append(slides[index]);
                slides[index].swiperLoopMoveDOM = false;
            }));
            swiper.recalcSlides();
            if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach(((slide, slideIndex) => {
                swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
            }));
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
                if (typeof slideRealIndex === "undefined") {
                    const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                    const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                    const diff = newSlideTranslate - currentSlideTranslate;
                    if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                        swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
                        if (setTranslate) {
                            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                        }
                    }
                } else if (setTranslate) {
                    const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                    swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                    swiper.touchEventsData.currentTranslate = swiper.translate;
                }
            } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else {
                const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.controller && swiper.controller.control && !byController) {
                const loopParams = {
                    slideRealIndex,
                    direction,
                    setTranslate,
                    activeSlideIndex,
                    byController: true
                };
                if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c => {
                    if (!c.destroyed && c.params.loop) c.loopFix({
                        ...loopParams,
                        slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                    });
                })); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                    ...loopParams,
                    slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            }
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {params, slidesEl} = swiper;
            if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
            swiper.recalcSlides();
            const newSlidesOrder = [];
            swiper.slides.forEach((slideEl => {
                const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
                newSlidesOrder[index] = slideEl;
            }));
            swiper.slides.forEach((slideEl => {
                slideEl.removeAttribute("data-swiper-slide-index");
            }));
            newSlidesOrder.forEach((slideEl => {
                slidesEl.append(slideEl);
            }));
            swiper.recalcSlides();
            swiper.slideTo(swiper.realIndex, 0);
        }
        var loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
            if (swiper.isElement) swiper.__preventObserver__ = true;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
            if (swiper.isElement) requestAnimationFrame((() => {
                swiper.__preventObserver__ = false;
            }));
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            if (swiper.isElement) swiper.__preventObserver__ = true;
            swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
            if (swiper.isElement) requestAnimationFrame((() => {
                swiper.__preventObserver__ = false;
            }));
        }
        var grabCursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base) {
            if (base === void 0) base = this;
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                if (!found && !el.getRootNode) return null;
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function preventEdgeSwipe(swiper, event, startX) {
            const window = ssr_window_esm_getWindow();
            const {params} = swiper;
            const edgeSwipeDetection = params.edgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
                if (edgeSwipeDetection === "prevent") {
                    event.preventDefault();
                    return true;
                }
                return false;
            }
            return true;
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            const data = swiper.touchEventsData;
            if (e.type === "pointerdown") {
                if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
                data.pointerId = e.pointerId;
            } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
            if (e.type === "touchstart") {
                preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
                return;
            }
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (!params.simulateTouch && e.pointerType === "mouse") return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let targetEl = e.target;
            if (params.touchEventsTarget === "wrapper") if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
            if ("which" in e && e.which === 3) return;
            if ("button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
            const eventPath = e.composedPath ? e.composedPath() : e.path;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
            touches.currentX = e.pageX;
            touches.currentY = e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            if (!preventEdgeSwipe(swiper, e, startX)) return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            let preventDefault = true;
            if (targetEl.matches(data.focusableElements)) {
                preventDefault = false;
                if (targetEl.nodeName === "SELECT") data.isTouched = false;
            }
            if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) document.activeElement.blur();
            const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
            if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            if (!params.simulateTouch && event.pointerType === "mouse") return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (e.type === "pointermove") {
                if (data.touchId !== null) return;
                const id = e.pointerId;
                if (id !== data.pointerId) return;
            }
            let targetTouch;
            if (e.type === "touchmove") {
                targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
                if (!targetTouch || targetTouch.identifier !== data.touchId) return;
            } else targetTouch = e;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            const pageX = targetTouch.pageX;
            const pageY = targetTouch.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            touches.previousX = touches.currentX;
            touches.previousY = touches.currentY;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if (typeof data.isScrolling === "undefined") {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            let diff = swiper.isHorizontal() ? diffX : diffY;
            let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
            if (params.oneWayMovement) {
                diff = Math.abs(diff) * (rtl ? 1 : -1);
                touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
            }
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) {
                diff = -diff;
                touchesDiff = -touchesDiff;
            }
            const prevTouchesDirection = swiper.touchesDirection;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
            const isLoop = swiper.params.loop && !params.cssMode;
            const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
            if (!data.isMoved) {
                if (isLoop && allowLoopFix) swiper.loopFix({
                    direction: swiper.swipeDirection
                });
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) {
                    const evt = new window.CustomEvent("transitionend", {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            bySwiperTouchMove: true
                        }
                    });
                    swiper.wrapperEl.dispatchEvent(evt);
                }
                data.allowMomentumBounce = false;
                if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            let loopFixed;
            (new Date).getTime();
            if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY,
                    startTranslate: data.currentTranslate
                });
                data.loopSwapReset = true;
                data.startTranslate = data.currentTranslate;
                return;
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0) {
                if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) swiper.loopFix({
                    direction: "prev",
                    setTranslate: true,
                    activeSlideIndex: 0
                });
                if (data.currentTranslate > swiper.minTranslate()) {
                    disableParentSwiper = false;
                    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
                }
            } else if (diff < 0) {
                if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) swiper.loopFix({
                    direction: "next",
                    setTranslate: true,
                    activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
                });
                if (data.currentTranslate < swiper.maxTranslate()) {
                    disableParentSwiper = false;
                    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
                }
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let targetTouch;
            const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
            if (!isTouchEvent) {
                if (data.touchId !== null) return;
                if (e.pointerId !== data.pointerId) return;
                targetTouch = e;
            } else {
                targetTouch = [ ...e.changedTouches ].filter((t => t.identifier === data.touchId))[0];
                if (!targetTouch || targetTouch.identifier !== data.touchId) return;
            }
            if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
                const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
                if (!proceed) return;
            }
            data.pointerId = null;
            data.touchId = null;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            if (!params.simulateTouch && e.pointerType === "mouse") return;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if (typeof slidesGrid[i + increment] !== "undefined") {
                    if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                    if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && el.offsetWidth === 0) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            const isVirtualLoop = isVirtual && params.loop;
            if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
                clearTimeout(swiper.autoplay.resizeTimeout);
                swiper.autoplay.resizeTimeout = setTimeout((() => {
                    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
                }), 500);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (swiper.translate === 0) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        function onLoad(e) {
            const swiper = this;
            processLazyPreloader(swiper, e.target);
            if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
            swiper.update();
        }
        function onDocumentTouchStart() {
            const swiper = this;
            if (swiper.documentTouchHandlerProceeded) return;
            swiper.documentTouchHandlerProceeded = true;
            if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
        }
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, el, wrapperEl, device} = swiper;
            const capture = !!params.nested;
            const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!el || typeof el === "string") return;
            document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
                passive: false,
                capture
            });
            el[domMethod]("touchstart", swiper.onTouchStart, {
                passive: false
            });
            el[domMethod]("pointerdown", swiper.onTouchStart, {
                passive: false
            });
            document[domMethod]("touchmove", swiper.onTouchMove, {
                passive: false,
                capture
            });
            document[domMethod]("pointermove", swiper.onTouchMove, {
                passive: false,
                capture
            });
            document[domMethod]("touchend", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointerup", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointercancel", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("touchcancel", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointerout", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("pointerleave", swiper.onTouchEnd, {
                passive: true
            });
            document[domMethod]("contextmenu", swiper.onTouchEnd, {
                passive: true
            });
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
            el[domMethod]("load", swiper.onLoad, {
                capture: true
            });
        };
        function attachEvents() {
            const swiper = this;
            const {params} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            swiper.onLoad = onLoad.bind(swiper);
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        var events$1 = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {realIndex, initialized, params, el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasGrabCursor = swiper.params.grabCursor;
            const isGrabCursor = breakpointParams.grabCursor;
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                el.classList.add(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            if (wasGrabCursor && !isGrabCursor) swiper.unsetGrabCursor(); else if (!wasGrabCursor && isGrabCursor) swiper.setGrabCursor();
            [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
                if (typeof breakpointParams[prop] === "undefined") return;
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            }));
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            const wasLoop = params.loop;
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            const hasLoop = swiper.params.loop;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (initialized) if (needsReLoop) {
                swiper.loopDestroy();
                swiper.loopCreate(realIndex);
                swiper.updateSlides();
            } else if (!wasLoop && hasLoop) {
                swiper.loopCreate(realIndex);
                swiper.updateSlides();
            } else if (wasLoop && !hasLoop) swiper.loopDestroy();
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base, containerEl) {
            if (base === void 0) base = "window";
            if (!breakpoints || base === "container" && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if (typeof point === "string" && point.indexOf("@") === 0) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if (base === "window") {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        var breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if (typeof item === "object") Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if (typeof item === "string") resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, el, device} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            el.classList.add(...classNames);
            swiper.emitContainerClasses();
        }
        function swiper_core_removeClasses() {
            const swiper = this;
            const {el, classNames} = swiper;
            if (!el || typeof el === "string") return;
            el.classList.remove(...classNames);
            swiper.emitContainerClasses();
        }
        var classes = {
            addClasses,
            removeClasses: swiper_core_removeClasses
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = swiper.snapGrid.length === 1;
            if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
            if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        var checkOverflow$1 = {
            checkOverflow
        };
        var defaults = {
            init: true,
            direction: "horizontal",
            oneWayMovement: false,
            swiperElementNodeName: "SWIPER-CONTAINER",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            eventsPrefix: "swiper",
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 5,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            loop: false,
            loopAddBlankSlides: true,
            loopAdditionalSlides: 0,
            loopPreventsSliding: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-blank",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideFullyVisibleClass: "swiper-slide-fully-visible",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            lazyPreloaderClass: "swiper-lazy-preloader",
            lazyPreloadPrevNext: 0,
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj) {
                if (obj === void 0) obj = {};
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if (typeof moduleParams !== "object" || moduleParams === null) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (params[moduleParamName] === true) params[moduleParamName] = {
                    enabled: true
                };
                if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
                if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter,
            update,
            translate,
            transition,
            slide,
            loop,
            grabCursor,
            events: events$1,
            breakpoints,
            checkOverflow: checkOverflow$1,
            classes
        };
        const extendedDefaults = {};
        class swiper_core_Swiper {
            constructor() {
                let el;
                let params;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                const document = ssr_window_esm_getDocument();
                if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                    const swipers = [];
                    document.querySelectorAll(params.el).forEach((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new swiper_core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        params,
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: [],
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return swiper.params.direction === "horizontal";
                    },
                    isVertical() {
                        return swiper.params.direction === "vertical";
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    cssOverflowAdjustment() {
                        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                    },
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: 0,
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        startMoving: void 0,
                        pointerId: null,
                        touchId: null
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            getDirectionLabel(property) {
                if (this.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            getSlideIndex(slideEl) {
                const {slidesEl, params} = this;
                const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
                const firstSlideIndex = utils_elementIndex(slides[0]);
                return utils_elementIndex(slideEl) - firstSlideIndex;
            }
            getSlideIndexByData(index) {
                return this.getSlideIndex(this.slides.filter((slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index))[0]);
            }
            recalcSlides() {
                const swiper = this;
                const {slidesEl, params} = swiper;
                swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0)).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.forEach((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view, exact) {
                if (view === void 0) view = "current";
                if (exact === void 0) exact = false;
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (typeof params.slidesPerView === "number") return params.slidesPerView;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += Math.ceil(slides[i].swiperSlideSize);
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach((imageEl => {
                    if (imageEl.complete) processLazyPreloader(swiper, imageEl);
                }));
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                    setTranslate();
                    if (params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                        translated = swiper.slideTo(slides.length - 1, 0, false, true);
                    } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate) {
                if (needUpdate === void 0) needUpdate = true;
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
                if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
                swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.forEach((slideEl => {
                    if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            changeLanguageDirection(direction) {
                const swiper = this;
                if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
                swiper.rtl = direction === "rtl";
                swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
                if (swiper.rtl) {
                    swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "rtl";
                } else {
                    swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "ltr";
                }
                swiper.update();
            }
            mount(element) {
                const swiper = this;
                if (swiper.mounted) return true;
                let el = element || swiper.params.el;
                if (typeof el === "string") el = document.querySelector(el);
                if (!el) return false;
                el.swiper = swiper;
                if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) swiper.isElement = true;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = el.shadowRoot.querySelector(getWrapperSelector());
                        return res;
                    }
                    return utils_elementChildren(el, getWrapperSelector())[0];
                };
                let wrapperEl = getWrapper();
                if (!wrapperEl && swiper.params.createElements) {
                    wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                    el.append(wrapperEl);
                    utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl => {
                        wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    el,
                    wrapperEl,
                    slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                    hostEl: swiper.isElement ? el.parentNode.host : el,
                    mounted: true,
                    rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                    rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                    wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (mounted === false) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                if (swiper.params.loop) swiper.loopCreate();
                swiper.attachEvents();
                const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
                if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
                lazyElements.forEach((imageEl => {
                    if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", (e => {
                        processLazyPreloader(swiper, e.target);
                    }));
                }));
                preload(swiper);
                swiper.initialized = true;
                preload(swiper);
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance, cleanStyles) {
                if (deleteInstance === void 0) deleteInstance = true;
                if (cleanStyles === void 0) cleanStyles = true;
                const swiper = this;
                const {params, el, wrapperEl, slides} = swiper;
                if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    if (el && typeof el !== "string") el.removeAttribute("style");
                    if (wrapperEl) wrapperEl.removeAttribute("style");
                    if (slides && slides.length) slides.forEach((slideEl => {
                        slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                        slideEl.removeAttribute("style");
                        slideEl.removeAttribute("data-swiper-slide-index");
                    }));
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (deleteInstance !== false) {
                    if (swiper.el && typeof swiper.el !== "string") swiper.el.swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!swiper_core_Swiper.prototype.__modules__) swiper_core_Swiper.prototype.__modules__ = [];
                const modules = swiper_core_Swiper.prototype.__modules__;
                if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => swiper_core_Swiper.installModule(m)));
                    return swiper_core_Swiper;
                }
                swiper_core_Swiper.installModule(module);
                return swiper_core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                swiper_core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        swiper_core_Swiper.use([ Resize, Observer ]);
        function Mousewheel(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            extendParams({
                mousewheel: {
                    enabled: false,
                    releaseOnEdges: false,
                    invert: false,
                    forceToAxis: false,
                    sensitivity: 1,
                    eventsTarget: "container",
                    thresholdDelta: null,
                    thresholdTime: null,
                    noMousewheelClass: "swiper-no-mousewheel"
                }
            });
            swiper.mousewheel = {
                enabled: false
            };
            let timeout;
            let lastScrollTime = utils_now();
            let lastEventBeforeSnap;
            const recentWheelEvents = [];
            function normalize(e) {
                const PIXEL_STEP = 10;
                const LINE_HEIGHT = 40;
                const PAGE_HEIGHT = 800;
                let sX = 0;
                let sY = 0;
                let pX = 0;
                let pY = 0;
                if ("detail" in e) sY = e.detail;
                if ("wheelDelta" in e) sY = -e.wheelDelta / 120;
                if ("wheelDeltaY" in e) sY = -e.wheelDeltaY / 120;
                if ("wheelDeltaX" in e) sX = -e.wheelDeltaX / 120;
                if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
                    sX = sY;
                    sY = 0;
                }
                pX = sX * PIXEL_STEP;
                pY = sY * PIXEL_STEP;
                if ("deltaY" in e) pY = e.deltaY;
                if ("deltaX" in e) pX = e.deltaX;
                if (e.shiftKey && !pX) {
                    pX = pY;
                    pY = 0;
                }
                if ((pX || pY) && e.deltaMode) if (e.deltaMode === 1) {
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
                if (pX && !sX) sX = pX < 1 ? -1 : 1;
                if (pY && !sY) sY = pY < 1 ? -1 : 1;
                return {
                    spinX: sX,
                    spinY: sY,
                    pixelX: pX,
                    pixelY: pY
                };
            }
            function handleMouseEnter() {
                if (!swiper.enabled) return;
                swiper.mouseEntered = true;
            }
            function handleMouseLeave() {
                if (!swiper.enabled) return;
                swiper.mouseEntered = false;
            }
            function animateSlider(newEvent) {
                if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) return false;
                if (swiper.params.mousewheel.thresholdTime && utils_now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) return false;
                if (newEvent.delta >= 6 && utils_now() - lastScrollTime < 60) return true;
                if (newEvent.direction < 0) {
                    if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                        swiper.slideNext();
                        emit("scroll", newEvent.raw);
                    }
                } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
                    swiper.slidePrev();
                    emit("scroll", newEvent.raw);
                }
                lastScrollTime = (new window.Date).getTime();
                return false;
            }
            function releaseScroll(newEvent) {
                const params = swiper.params.mousewheel;
                if (newEvent.direction < 0) {
                    if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) return true;
                } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) return true;
                return false;
            }
            function handle(event) {
                let e = event;
                let disableParentSwiper = true;
                if (!swiper.enabled) return;
                if (event.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`)) return;
                const params = swiper.params.mousewheel;
                if (swiper.params.cssMode) e.preventDefault();
                let targetEl = swiper.el;
                if (swiper.params.mousewheel.eventsTarget !== "container") targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
                const targetElContainsTarget = targetEl && targetEl.contains(e.target);
                if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
                if (e.originalEvent) e = e.originalEvent;
                let delta = 0;
                const rtlFactor = swiper.rtlTranslate ? -1 : 1;
                const data = normalize(e);
                if (params.forceToAxis) if (swiper.isHorizontal()) if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor; else return true; else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY; else return true; else delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
                if (delta === 0) return true;
                if (params.invert) delta = -delta;
                let positions = swiper.getTranslate() + delta * params.sensitivity;
                if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
                if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();
                disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
                if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
                if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
                    const newEvent = {
                        time: utils_now(),
                        delta: Math.abs(delta),
                        direction: Math.sign(delta),
                        raw: event
                    };
                    if (recentWheelEvents.length >= 2) recentWheelEvents.shift();
                    const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                    recentWheelEvents.push(newEvent);
                    if (prevEvent) {
                        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) animateSlider(newEvent);
                    } else animateSlider(newEvent);
                    if (releaseScroll(newEvent)) return true;
                } else {
                    const newEvent = {
                        time: utils_now(),
                        delta: Math.abs(delta),
                        direction: Math.sign(delta)
                    };
                    const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
                    if (!ignoreWheelEvents) {
                        lastEventBeforeSnap = void 0;
                        let position = swiper.getTranslate() + delta * params.sensitivity;
                        const wasBeginning = swiper.isBeginning;
                        const wasEnd = swiper.isEnd;
                        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
                        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
                        swiper.setTransition(0);
                        swiper.setTranslate(position);
                        swiper.updateProgress();
                        swiper.updateActiveIndex();
                        swiper.updateSlidesClasses();
                        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) swiper.updateSlidesClasses();
                        if (swiper.params.loop) swiper.loopFix({
                            direction: newEvent.direction < 0 ? "next" : "prev",
                            byMousewheel: true
                        });
                        if (swiper.params.freeMode.sticky) {
                            clearTimeout(timeout);
                            timeout = void 0;
                            if (recentWheelEvents.length >= 15) recentWheelEvents.shift();
                            const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
                            const firstEvent = recentWheelEvents[0];
                            recentWheelEvents.push(newEvent);
                            if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) recentWheelEvents.splice(0); else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
                                const snapToThreshold = delta > 0 ? .8 : .2;
                                lastEventBeforeSnap = newEvent;
                                recentWheelEvents.splice(0);
                                timeout = utils_nextTick((() => {
                                    if (swiper.destroyed || !swiper.params) return;
                                    swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                                }), 0);
                            }
                            if (!timeout) timeout = utils_nextTick((() => {
                                if (swiper.destroyed || !swiper.params) return;
                                const snapToThreshold = .5;
                                lastEventBeforeSnap = newEvent;
                                recentWheelEvents.splice(0);
                                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
                            }), 500);
                        }
                        if (!ignoreWheelEvents) emit("scroll", e);
                        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
                        if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) return true;
                    }
                }
                if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
                return false;
            }
            function events(method) {
                let targetEl = swiper.el;
                if (swiper.params.mousewheel.eventsTarget !== "container") targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
                targetEl[method]("mouseenter", handleMouseEnter);
                targetEl[method]("mouseleave", handleMouseLeave);
                targetEl[method]("wheel", handle);
            }
            function enable() {
                if (swiper.params.cssMode) {
                    swiper.wrapperEl.removeEventListener("wheel", handle);
                    return true;
                }
                if (swiper.mousewheel.enabled) return false;
                events("addEventListener");
                swiper.mousewheel.enabled = true;
                return true;
            }
            function disable() {
                if (swiper.params.cssMode) {
                    swiper.wrapperEl.addEventListener(event, handle);
                    return true;
                }
                if (!swiper.mousewheel.enabled) return false;
                events("removeEventListener");
                swiper.mousewheel.enabled = false;
                return true;
            }
            on("init", (() => {
                if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) disable();
                if (swiper.params.mousewheel.enabled) enable();
            }));
            on("destroy", (() => {
                if (swiper.params.cssMode) enable();
                if (swiper.mousewheel.enabled) disable();
            }));
            Object.assign(swiper.mousewheel, {
                enable,
                disable
            });
        }
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && params.auto === true) {
                    let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                    if (!element) {
                        element = utils_createElement("div", checkProps[key]);
                        element.className = checkProps[key];
                        swiper.el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled"
                }
            });
            swiper.navigation = {
                nextEl: null,
                prevEl: null
            };
            function getEl(el) {
                let res;
                if (el && typeof el === "string" && swiper.isElement) {
                    res = swiper.el.querySelector(el);
                    if (res) return res;
                }
                if (el) {
                    if (typeof el === "string") res = [ ...document.querySelectorAll(el) ];
                    if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el); else if (res && res.length === 1) res = res[0];
                }
                if (el && !res) return el;
                return res;
            }
            function toggleEl(el, disabled) {
                const params = swiper.params.navigation;
                el = utils_makeElementsArray(el);
                el.forEach((subEl => {
                    if (subEl) {
                        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
                        if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
                        if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
                    }
                }));
            }
            function update() {
                const {nextEl, prevEl} = swiper.navigation;
                if (swiper.params.loop) {
                    toggleEl(prevEl, false);
                    toggleEl(nextEl, false);
                    return;
                }
                toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
                emit("navigationPrev");
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
                emit("navigationNext");
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                let nextEl = getEl(params.nextEl);
                let prevEl = getEl(params.prevEl);
                Object.assign(swiper.navigation, {
                    nextEl,
                    prevEl
                });
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                const initButton = (el, dir) => {
                    if (el) el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                    if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
                };
                nextEl.forEach((el => initButton(el, "next")));
                prevEl.forEach((el => initButton(el, "prev")));
            }
            function destroy() {
                let {nextEl, prevEl} = swiper.navigation;
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                const destroyButton = (el, dir) => {
                    el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
                    el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
                };
                nextEl.forEach((el => destroyButton(el, "next")));
                prevEl.forEach((el => destroyButton(el, "prev")));
            }
            on("init", (() => {
                if (swiper.params.navigation.enabled === false) disable(); else {
                    init();
                    update();
                }
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                let {nextEl, prevEl} = swiper.navigation;
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                if (swiper.enabled) {
                    update();
                    return;
                }
                [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.add(swiper.params.navigation.lockClass)));
            }));
            on("click", ((_s, e) => {
                let {nextEl, prevEl} = swiper.navigation;
                nextEl = utils_makeElementsArray(nextEl);
                prevEl = utils_makeElementsArray(prevEl);
                const targetEl = e.target;
                let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
                if (swiper.isElement && !targetIsButton) {
                    const path = e.path || e.composedPath && e.composedPath();
                    if (path) targetIsButton = path.find((pathEl => nextEl.includes(pathEl) || prevEl.includes(pathEl)));
                }
                if (swiper.params.navigation.hideOnClick && !targetIsButton) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass); else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
                    if (isHidden === true) emit("navigationShow"); else emit("navigationHide");
                    [ ...nextEl, ...prevEl ].filter((el => !!el)).forEach((el => el.classList.toggle(swiper.params.navigation.hiddenClass)));
                }
            }));
            const enable = () => {
                swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
                init();
                update();
            };
            const disable = () => {
                swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
                destroy();
            };
            Object.assign(swiper.navigation, {
                enable,
                disable,
                update,
                init,
                destroy
            });
        }
        function Autoplay(_ref) {
            let {swiper, extendParams, on, emit, params} = _ref;
            swiper.autoplay = {
                running: false,
                paused: false,
                timeLeft: 0
            };
            extendParams({
                autoplay: {
                    enabled: false,
                    delay: 3e3,
                    waitForTransition: true,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                    pauseOnMouseEnter: false
                }
            });
            let timeout;
            let raf;
            let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
            let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
            let autoplayTimeLeft;
            let autoplayStartTime = (new Date).getTime();
            let wasPaused;
            let isTouched;
            let pausedByTouch;
            let touchStartTimeout;
            let slideChanged;
            let pausedByInteraction;
            let pausedByPointerEnter;
            function onTransitionEnd(e) {
                if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
                if (e.target !== swiper.wrapperEl) return;
                swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
                if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) return;
                resume();
            }
            const calcTimeLeft = () => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (swiper.autoplay.paused) wasPaused = true; else if (wasPaused) {
                    autoplayDelayCurrent = autoplayTimeLeft;
                    wasPaused = false;
                }
                const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (new Date).getTime();
                swiper.autoplay.timeLeft = timeLeft;
                emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
                raf = requestAnimationFrame((() => {
                    calcTimeLeft();
                }));
            };
            const getSlideDelay = () => {
                let activeSlideEl;
                if (swiper.virtual && swiper.params.virtual.enabled) activeSlideEl = swiper.slides.filter((slideEl => slideEl.classList.contains("swiper-slide-active")))[0]; else activeSlideEl = swiper.slides[swiper.activeIndex];
                if (!activeSlideEl) return;
                const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
                return currentSlideDelay;
            };
            const run = delayForce => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                cancelAnimationFrame(raf);
                calcTimeLeft();
                let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
                autoplayDelayTotal = swiper.params.autoplay.delay;
                autoplayDelayCurrent = swiper.params.autoplay.delay;
                const currentSlideDelay = getSlideDelay();
                if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
                    delay = currentSlideDelay;
                    autoplayDelayTotal = currentSlideDelay;
                    autoplayDelayCurrent = currentSlideDelay;
                }
                autoplayTimeLeft = delay;
                const speed = swiper.params.speed;
                const proceed = () => {
                    if (!swiper || swiper.destroyed) return;
                    if (swiper.params.autoplay.reverseDirection) {
                        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                            swiper.slidePrev(speed, true, true);
                            emit("autoplay");
                        } else if (!swiper.params.autoplay.stopOnLastSlide) {
                            swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                            emit("autoplay");
                        }
                    } else if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                        swiper.slideNext(speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(0, speed, true, true);
                        emit("autoplay");
                    }
                    if (swiper.params.cssMode) {
                        autoplayStartTime = (new Date).getTime();
                        requestAnimationFrame((() => {
                            run();
                        }));
                    }
                };
                if (delay > 0) {
                    clearTimeout(timeout);
                    timeout = setTimeout((() => {
                        proceed();
                    }), delay);
                } else requestAnimationFrame((() => {
                    proceed();
                }));
                return delay;
            };
            const start = () => {
                autoplayStartTime = (new Date).getTime();
                swiper.autoplay.running = true;
                run();
                emit("autoplayStart");
            };
            const stop = () => {
                swiper.autoplay.running = false;
                clearTimeout(timeout);
                cancelAnimationFrame(raf);
                emit("autoplayStop");
            };
            const pause = (internal, reset) => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                clearTimeout(timeout);
                if (!internal) pausedByInteraction = true;
                const proceed = () => {
                    emit("autoplayPause");
                    if (swiper.params.autoplay.waitForTransition) swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd); else resume();
                };
                swiper.autoplay.paused = true;
                if (reset) {
                    if (slideChanged) autoplayTimeLeft = swiper.params.autoplay.delay;
                    slideChanged = false;
                    proceed();
                    return;
                }
                const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
                autoplayTimeLeft = delay - ((new Date).getTime() - autoplayStartTime);
                if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
                if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
                proceed();
            };
            const resume = () => {
                if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
                autoplayStartTime = (new Date).getTime();
                if (pausedByInteraction) {
                    pausedByInteraction = false;
                    run(autoplayTimeLeft);
                } else run();
                swiper.autoplay.paused = false;
                emit("autoplayResume");
            };
            const onVisibilityChange = () => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                const document = ssr_window_esm_getDocument();
                if (document.visibilityState === "hidden") {
                    pausedByInteraction = true;
                    pause(true);
                }
                if (document.visibilityState === "visible") resume();
            };
            const onPointerEnter = e => {
                if (e.pointerType !== "mouse") return;
                pausedByInteraction = true;
                pausedByPointerEnter = true;
                if (swiper.animating || swiper.autoplay.paused) return;
                pause(true);
            };
            const onPointerLeave = e => {
                if (e.pointerType !== "mouse") return;
                pausedByPointerEnter = false;
                if (swiper.autoplay.paused) resume();
            };
            const attachMouseEvents = () => {
                if (swiper.params.autoplay.pauseOnMouseEnter) {
                    swiper.el.addEventListener("pointerenter", onPointerEnter);
                    swiper.el.addEventListener("pointerleave", onPointerLeave);
                }
            };
            const detachMouseEvents = () => {
                if (swiper.el && typeof swiper.el !== "string") {
                    swiper.el.removeEventListener("pointerenter", onPointerEnter);
                    swiper.el.removeEventListener("pointerleave", onPointerLeave);
                }
            };
            const attachDocumentEvents = () => {
                const document = ssr_window_esm_getDocument();
                document.addEventListener("visibilitychange", onVisibilityChange);
            };
            const detachDocumentEvents = () => {
                const document = ssr_window_esm_getDocument();
                document.removeEventListener("visibilitychange", onVisibilityChange);
            };
            on("init", (() => {
                if (swiper.params.autoplay.enabled) {
                    attachMouseEvents();
                    attachDocumentEvents();
                    start();
                }
            }));
            on("destroy", (() => {
                detachMouseEvents();
                detachDocumentEvents();
                if (swiper.autoplay.running) stop();
            }));
            on("_freeModeStaticRelease", (() => {
                if (pausedByTouch || pausedByInteraction) resume();
            }));
            on("_freeModeNoMomentumRelease", (() => {
                if (!swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
            }));
            on("beforeTransitionStart", ((_s, speed, internal) => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (internal || !swiper.params.autoplay.disableOnInteraction) pause(true, true); else stop();
            }));
            on("sliderFirstMove", (() => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                if (swiper.params.autoplay.disableOnInteraction) {
                    stop();
                    return;
                }
                isTouched = true;
                pausedByTouch = false;
                pausedByInteraction = false;
                touchStartTimeout = setTimeout((() => {
                    pausedByInteraction = true;
                    pausedByTouch = true;
                    pause(true);
                }), 200);
            }));
            on("touchEnd", (() => {
                if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
                clearTimeout(touchStartTimeout);
                clearTimeout(timeout);
                if (swiper.params.autoplay.disableOnInteraction) {
                    pausedByTouch = false;
                    isTouched = false;
                    return;
                }
                if (pausedByTouch && swiper.params.cssMode) resume();
                pausedByTouch = false;
                isTouched = false;
            }));
            on("slideChange", (() => {
                if (swiper.destroyed || !swiper.autoplay.running) return;
                slideChanged = true;
            }));
            Object.assign(swiper.autoplay, {
                start,
                stop,
                pause,
                resume
            });
        }
        function initSliders() {
            if (document.querySelector(".swiper")) new swiper_core_Swiper(".swiper", {
                modules: [ Navigation, Autoplay, Mousewheel ],
                slidesPerGroup: 1,
                spaceBetween: 50,
                autoHeight: true,
                speed: 1400,
                direction: "vertical",
                loop: true,
                centeredSlides: true,
                mousewheel: {
                    sensivity: 4
                },
                autoplay: {
                    delay: 3e3,
                    disableOnInteraction: false
                },
                breakpoints: {
                    200: {
                        slidesPerView: 2.6,
                        spaceBetween: 120,
                        autoHeight: true
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 100
                    },
                    992: {
                        slidesPerView: 2.5,
                        spaceBetween: 120
                    },
                    1268: {
                        slidesPerView: 2.5,
                        spaceBetween: 120
                    }
                },
                on: {}
            });
        }
        function initInner() {
            if (document.querySelector(".inner")) new swiper_core_Swiper(".inner", {
                modules: [ Navigation, Autoplay ],
                slidesPerView: 3,
                spaceBetween: 5,
                speed: 800,
                simulateTouch: true,
                loop: true,
                autoplay: {
                    delay: 3e3,
                    disableOnInteraction: true
                },
                on: {}
            });
        }
        document.addEventListener("DOMContentLoaded", (function(e) {
            initSliders();
            initInner();
        }));
        document.querySelectorAll(".basket-checkbox").forEach((checkbox => {
            checkbox.addEventListener("change", (function() {
                const targetId = this.getAttribute("data-target");
                const targetBlock = document.querySelector(`.quantity[data-target="${targetId}"]`);
                if (this.checked) targetBlock.style.display = "flex"; else {
                    targetBlock.style.display = "none";
                    const quantityInput = targetBlock.querySelector("input[data-quantity-value]");
                    quantityInput.value = "0";
                }
            }));
        }));
        document.querySelectorAll(".quantity__input input[data-quantity-value]").forEach((input => {
            input.addEventListener("input", (function() {
                const value = this.value;
                const targetId = this.closest(".quantity").getAttribute("data-target");
                const targetCheckbox = document.querySelector(`.basket-checkbox[data-target="${targetId}"]`);
                if (value === "0") {
                    targetCheckbox.checked = false;
                    this.closest(".quantity").style.display = "none";
                }
            }));
        }));
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        var lib_postcss = __webpack_require__(895);
        null && postcss;
        lib_postcss.stringify;
        lib_postcss.fromJSON;
        lib_postcss.plugin;
        lib_postcss.parse;
        lib_postcss.list;
        lib_postcss.document;
        lib_postcss.comment;
        lib_postcss.atRule;
        lib_postcss.rule;
        lib_postcss.decl;
        lib_postcss.root;
        lib_postcss.CssSyntaxError;
        lib_postcss.Declaration;
        lib_postcss.Container;
        lib_postcss.Processor;
        lib_postcss.Document;
        lib_postcss.Comment;
        lib_postcss.Warning;
        lib_postcss.AtRule;
        lib_postcss.Result;
        lib_postcss.Input;
        lib_postcss.Rule;
        lib_postcss.Root;
        lib_postcss.Node;
        const dishesData = [ {
            id: 24,
            name: null,
            caption: "М'ясні страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 11,
            name: "first_dishes",
            caption: "Перші страви",
            imageUrl: "https://tuca.com.ua/wp-content/uploads/2020/03/recept_7678_p0nh.jpg",
            order: 10,
            dishes: [ {
                id: 1,
                name: "borsch",
                caption: "Борщ червоний",
                description: "На свинячих реберцях\n Калорійність - на всі гроші",
                imageUrl: "https://gurman.com.ua/wp-content/uploads/2023/03/IMG_7073.webp",
                price: 70,
                order: 10
            }, {
                id: 2,
                name: "green_borsch",
                caption: "Борщ зелений",
                description: "Дуже смачний\n Калорійність - так собі",
                imageUrl: "https://klopotenko.com/wp-content/uploads/2022/04/zelenyy-borshch-zi-shpynatom-img-1000x600.jpg",
                price: 64.99,
                order: 20
            }, {
                id: 3,
                name: "fish_soup",
                caption: "Рибна юшка",
                description: "На форелі\n Калорійність - лайт",
                imageUrl: "https://images.unian.net/photos/2021_04/1617620232-2719.jpg",
                price: 80.5,
                order: 30
            }, {
                id: 4,
                name: "mushroom_soup",
                caption: "Грибна юшка",
                description: "З білих карпатських грибів Калорійність - ",
                imageUrl: "https://tuca.com.ua/wp-content/uploads/2020/03/recept_7678_p0nh.jpg",
                price: 70,
                order: 40
            }, {
                id: 5,
                name: "borsch",
                caption: "Борщ",
                description: "100 видів м'яса\n Калорійність - смерть на місці",
                imageUrl: "https://bazylik.com.ua/wp-content/uploads/2024/01/image11_retsept-solianka-zbirna-miasna.webp",
                price: 100,
                order: 50
            } ]
        }, {
            id: 12,
            name: null,
            caption: "рибові страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 25,
            name: null,
            caption: "пташині страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 17,
            name: null,
            caption: "десерторві страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 22,
            name: null,
            caption: "несмачні страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 122,
            name: "first_dishes",
            caption: "треті страви",
            imageUrl: "https://tuca.com.ua/wp-content/uploads/2020/03/recept_7678_p0nh.jpg",
            order: 10,
            dishes: [ {
                id: 1,
                name: "borsch",
                caption: "Борщ червоний",
                description: "На свинячих реберцях\n Калорійність - на всі гроші",
                imageUrl: "https://gurman.com.ua/wp-content/uploads/2023/03/IMG_7073.webp",
                price: 70,
                order: 10
            }, {
                id: 2,
                name: "green_borsch",
                caption: "Борщ зелений",
                description: "Дуже смачний\n Калорійність - так собі",
                imageUrl: "https://klopotenko.com/wp-content/uploads/2022/04/zelenyy-borshch-zi-shpynatom-img-1000x600.jpg",
                price: 64.99,
                order: 20
            }, {
                id: 3,
                name: "fish_soup",
                caption: "Рибна юшка",
                description: "На форелі\n Калорійність - лайт",
                imageUrl: "https://images.unian.net/photos/2021_04/1617620232-2719.jpg",
                price: 80.5,
                order: 30
            }, {
                id: 4,
                name: "mushroom_soup",
                caption: "Грибна юшка",
                description: "З білих карпатських грибів Калорійність - ",
                imageUrl: "https://tuca.com.ua/wp-content/uploads/2020/03/recept_7678_p0nh.jpg",
                price: 70,
                order: 40
            }, {
                id: 5,
                name: "borsch",
                caption: "Борщ",
                description: "100 видів м'яса\n Калорійність - смерть на місці",
                imageUrl: "https://bazylik.com.ua/wp-content/uploads/2024/01/image11_retsept-solianka-zbirna-miasna.webp",
                price: 100,
                order: 50
            } ]
        }, {
            id: 9,
            name: null,
            caption: "восьмі страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 8,
            name: null,
            caption: "десяті страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 12,
            name: null,
            caption: "дитячі страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 0,
            name: null,
            caption: "М'ясні страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 1,
            name: "first_dishes",
            caption: "Перші страви",
            imageUrl: "https://tuca.com.ua/wp-content/uploads/2020/03/recept_7678_p0nh.jpg",
            order: 10,
            dishes: [ {
                id: 1,
                name: "borsch",
                caption: "Борщ червоний",
                description: "На свинячих реберцях\n Калорійність - на всі гроші",
                imageUrl: "https://gurman.com.ua/wp-content/uploads/2023/03/IMG_7073.webp",
                price: 70,
                order: 10
            }, {
                id: 2,
                name: "green_borsch",
                caption: "Борщ зелений",
                description: "Дуже смачний\n Калорійність - так собі",
                imageUrl: "https://klopotenko.com/wp-content/uploads/2022/04/zelenyy-borshch-zi-shpynatom-img-1000x600.jpg",
                price: 64.99,
                order: 20
            }, {
                id: 3,
                name: "fish_soup",
                caption: "Рибна юшка",
                description: "На форелі\n Калорійність - лайт",
                imageUrl: "https://images.unian.net/photos/2021_04/1617620232-2719.jpg",
                price: 80.5,
                order: 30
            }, {
                id: 4,
                name: "mushroom_soup",
                caption: "Грибна юшка",
                description: "З білих карпатських грибів Калорійність - ",
                imageUrl: "https://tuca.com.ua/wp-content/uploads/2020/03/recept_7678_p0nh.jpg",
                price: 70,
                order: 40
            }, {
                id: 5,
                name: "borsch",
                caption: "Борщ",
                description: "100 видів м'яса\n Калорійність - смерть на місці",
                imageUrl: "https://bazylik.com.ua/wp-content/uploads/2024/01/image11_retsept-solianka-zbirna-miasna.webp",
                price: 100,
                order: 50
            } ]
        }, {
            id: 2,
            name: null,
            caption: "М'ясні страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 5,
            name: null,
            caption: "М'ясні страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        }, {
            id: 7,
            name: null,
            caption: "М'ясні страви",
            imageUrl: "https://vikna.tv/wp-content/uploads/2023/01/04/kachka-1800x1200.jpeg",
            order: 20,
            dishes: [ {
                id: 6,
                name: "kyiv_style_meat_ball",
                caption: "Котлета по-київськи",
                description: "Курятина, масло вершкове, кляр",
                imageUrl: "https://bigkyiv.com.ua/wp-content/uploads/2022/01/kotlety-po-kievski-800x600.jpg",
                price: 110,
                order: 10
            }, {
                id: 7,
                name: "home_style_meat_boal",
                caption: "Котлета по-домашньому",
                description: "Смакує з пюрехою",
                imageUrl: "https://img.fozzyshop.com.ua/157472-thickbox_default/kotlety-domashnie.jpg",
                price: 65.99,
                order: 20
            }, {
                id: 8,
                name: "pork_ribs",
                caption: "Свинячі реберця",
                description: "З журавлиновим соусом",
                imageUrl: "https://images.unian.net/photos/2020_07/1593714242-3350.jpg",
                price: 200,
                order: 30
            }, {
                id: 9,
                name: "chicken_chop",
                caption: "Куряча відбивна",
                description: "Куряча відбивна в клярі\n Топ за свої гроші",
                imageUrl: "https://kuldim.com/wa-data/public/shop/products/89/21/2189/images/54555/54555.970.jpg",
                price: 70,
                order: 40
            }, {
                id: 10,
                name: "beef_steak",
                caption: "Борщ",
                description: "З мармурової яловичини, відчуй себе мажором",
                imageUrl: "https://shashlyk-master.com.ua/wp-content/uploads/2018/02/stejk-govyazhij.png",
                price: 700,
                order: 50
            } ]
        } ];
        localStorage.setItem("category", JSON.stringify(dishesData));
        document.addEventListener("DOMContentLoaded", (function() {
            localStorage.getItem("category");
            const slideContainer = document.querySelector(".wrapper__wrapper");
            if (slideContainer) {
                dishesData.forEach((category => {
                    const categoryItem = document.createElement("div");
                    if (categoryItem) {
                        categoryItem.classList.add("wrapper__slide", "swiper-slide");
                        categoryItem.setAttribute("data-id", category.id);
                        categoryItem.innerHTML = `\n            <a href="secondLayout.html"><img src="${category.imageUrl}" alt="" /></a>\n            <h4>${category.caption}</h4>\n        `;
                        slideContainer.appendChild(categoryItem);
                        console.log(`атрибут першого леєра== ${categoryItem.getAttribute("data-id")}`);
                    }
                }));
                slideContainer.addEventListener("click", (function(event) {
                    const clickedCategory = event.target.closest(".wrapper__slide");
                    if (clickedCategory) {
                        const clickedId = clickedCategory.getAttribute("data-id");
                        localStorage.setItem("chosedID", clickedId);
                        console.log(`Selected category ID: ${clickedId}`);
                    } else console.log("Категорію не знайдено");
                }));
                let chosedDataID = localStorage.getItem("chosedID");
                console.log(chosedDataID);
                localStorage.removeItem("selectedDishes");
            }
        }));
        document.addEventListener("DOMContentLoaded", (function() {
            menuInit();
        }));
        function navigateToaprovePage() {
            window.location.href = "aprooveOrderPage.html";
        }
        document.addEventListener("DOMContentLoaded", (function() {
            const basketBtn = document.querySelector(".page__bigbasket-btn");
            if (basketBtn) basketBtn.addEventListener("click", navigateToaprovePage);
        }));
        document.addEventListener("DOMContentLoaded", (function() {
            let storedDishData = JSON.parse(localStorage.getItem("selectedDishes")) || [];
            if (storedDishData.length > 0) {
                console.log(" дані з localStorage:", storedDishData);
                const dishContainer = document.querySelector(".orders__wrapp");
                if (dishContainer) storedDishData.forEach((dish => {
                    const dishItem = document.createElement("div");
                    dishItem.classList.add("dishes__item");
                    dishItem.innerHTML = `\n          <div class="order__item" data-price="${(dish.price * dish.quantity).toFixed(2)}">\n            <div class="order__quantity-total">\n              <h4 class="quantity-total__title">${dish.quantity} X</h4>\n            </div>\n            <div class="order__describe">\n              <h3 class="order__title">${dish.caption}</h3>\n              <p class="order__caption">${dish.description || "Опис відсутній"}</p>\n              <h4 class="order__mass">${dish.price} грн за порцію</h4>\n              <div class="order__price">${(dish.price * dish.quantity).toFixed(2)} грн</div>\n            </div>\n            <div class="order__button-box">\n              <div class="order__navigate ">\n                <div class="order__quantity navigation">\n                  <button class="order__minus" id="minus"> - </button>\n                  <input class="order__input" type="text" value="${dish.quantity}" min="1">\n                  <button class="order__plus" id="plus"> + </button>\n                </div>\n                <div class="order__delete-button btn">\n                  <button class="btn__delete">\n                    <img class="btn__image ibg" src="img/deleteBasket.svg" alt="">\n                  </button>\n                </div>\n              </div>\n            </div>\n            <div class="order__img-quantity box">\n              <div class="box__img">\n                <div class="box__image ibg">\n                  <img class="pict__image ibg" src="${dish.imageUrl}" alt="${dish.caption}">\n                </div>\n              </div>\n            </div>\n          </div>\n        `;
                    dishContainer.appendChild(dishItem);
                })); else console.log(" #dishes-container не знайдено");
            } else console.log("Немає даних у localStorage або ");
            const btnDelegate = document.querySelector(".orders__container");
            if (btnDelegate) btnDelegate.addEventListener("click", (function(event) {
                const btnTarget = event.target;
                const itemMenu = btnTarget.closest(".dishes__item");
                const itemQuantity = itemMenu.querySelector(".quantity-total__title");
                if (itemQuantity) if (btnTarget.classList.contains("order__plus")) {
                    const orderInput = btnTarget.closest(".order__quantity").querySelector(".order__input");
                    const checkedOrderInput = parseInt(orderInput.value);
                    orderInput.value = checkedOrderInput + 1;
                    itemQuantity.innerText = orderInput.value + ` X`;
                    updateLocalStorage(itemMenu.querySelector(".order__title").innerText, 1);
                } else if (btnTarget.classList.contains("order__minus")) {
                    const orderInput = btnTarget.closest(".order__quantity").querySelector(".order__input");
                    const checkedOrderInput = parseInt(orderInput.value);
                    if (checkedOrderInput > 1) {
                        orderInput.value = checkedOrderInput - 1;
                        itemQuantity.innerText = orderInput.value + ` X`;
                        updateLocalStorage(itemMenu.querySelector(".order__title").innerText, -1);
                    } else itemQuantity.innerText = 1 + ` X`;
                } else if (btnTarget.classList.contains("btn__delete")) {
                    const itemMenu = btnTarget.closest(".dishes__item");
                    if (itemMenu) {
                        console.log("Видалення:", itemMenu);
                        const captionToDelete = itemMenu.querySelector(".order__title").innerText;
                        const updatedData = storedDishData.filter((dish => dish.caption !== captionToDelete));
                        localStorage.setItem("selectedDishes", JSON.stringify(updatedData));
                        itemMenu.remove();
                        console.log(storedDishData);
                    }
                }
                const pricePerDish = parseFloat(itemMenu.querySelector(".order__mass").innerText);
                let dishAmount = parseInt(itemQuantity.innerText);
                let summPriceOnlyDish = pricePerDish * dishAmount;
                const priceCell = itemMenu.querySelector(".order__price");
                priceCell.innerText = summPriceOnlyDish.toFixed(2) + ` грн`;
                itemMenu.setAttribute("data-price", summPriceOnlyDish.toFixed(2));
                console.log("Оновлене значення data-price:", itemMenu.getAttribute("data-price"));
                summTotalorderAmount();
            }));
            const nextButton = document.querySelector(".dishes__next-page");
            if (nextButton) nextButton.onclick = function() {
                window.location.href = "lastOrderPageDelivery.html";
            }; else console.log("nema takogo");
            function summTotalorderAmount() {
                const totalPrices = document.querySelectorAll(".order__price");
                const finishOrderPrice = document.querySelector(".dishes__total-price");
                if (finishOrderPrice) {
                    let summuryMenuprices = 0;
                    totalPrices.forEach((element => {
                        const price = parseFloat(element.innerText);
                        summuryMenuprices += price;
                    }));
                    finishOrderPrice.innerText = summuryMenuprices.toFixed(2) + ` грн`;
                }
            }
            function updateLocalStorage(caption, step) {
                let storedDishData = JSON.parse(localStorage.getItem("selectedDishes")) || [];
                let updatedData = storedDishData.map((dish => {
                    console.log(JSON.stringify(dish));
                    if (dish.caption === caption) return {
                        ...dish,
                        quantity: parseInt(dish.quantity + step)
                    }; else return {
                        ...dish,
                        quantity: dish.quantity
                    };
                }));
                localStorage.setItem("selectedDishes", JSON.stringify(updatedData));
                storedDishData = updatedData;
                console.log("ce nova data", updatedData);
            }
            summTotalorderAmount();
            const homePageBtn = document.querySelector(".aprove__link");
            if (homePageBtn) homePageBtn.addEventListener("click", (function(event) {
                const trgClick = event.target;
                if (trgClick) window.location.href = "home.html";
            }));
        }));
        document.addEventListener("DOMContentLoaded", (function() {
            const storedDishData = JSON.parse(localStorage.getItem("selectedDishes")) || [];
            if (storedDishData.length > 0) {
                console.log("Отримані дані з localStorage:", storedDishData);
                const dishContainer = document.querySelector(".orders__box");
                if (dishContainer) {
                    let totalSum = 0;
                    storedDishData.forEach((dish => {
                        const dishItem = document.createElement("div");
                        dishItem.classList.add("chosed__item");
                        dishItem.innerHTML = `\n             <div class="aproved-items__item">\n                      <div class="aproved-items__quntity">\n                        <h4 >${dish.quantity} X</h4>\n                      </div>\n                      <div class="aproved-items__caption">\n                        <h3>${dish.caption}</h3>\n                      </div>\n                      <div class="aproved-items__total">\n                        <h4>${(dish.price * dish.quantity).toFixed(2)} грн</h4>\n                      </div>\n              </div> `;
                        dishContainer.appendChild(dishItem);
                        totalSum += dish.price * dish.quantity;
                    }));
                    const sumbOx = document.querySelector(".summ__total");
                    sumbOx.append(totalSum.toFixed(2) + ` грн`);
                    console.log(totalSum);
                } else console.log("Контейнер з ідентифікатором #dishes-container не знайдено");
            } else console.log("Немає даних у localStorage або дані мають неправильний формат");
            document.addEventListener("selectCallback", (function(e) {
                const mapa = document.querySelector(".page__map");
                const currentSelect = e.detail.select.value;
                if (currentSelect === "1") mapa.style.display = "none"; else if (currentSelect === "2") mapa.style.display = "block";
            }));
            const lastbtn = document.querySelector(".aproove__btn");
            if (lastbtn) lastbtn.addEventListener("click", (function(event) {
                const targetPoint = event.target;
                if (targetPoint === lastbtn) [ window.location.href = "thankyouPage.html" ];
            }));
            const homePageBtn = document.querySelector(".aprove__link");
            if (homePageBtn) homePageBtn.addEventListener("click", (function(event) {
                const trgClick = event.target;
                if (trgClick) window.location.href = "home.html";
            }));
        }));
        const newdata = localStorage.getItem("category");
        const showdata = JSON.parse(newdata);
        console.log(showdata);
        document.addEventListener("DOMContentLoaded", (function() {
            const dishContainer = document.querySelector(".page__dishes");
            if (dishContainer) {
                const chosedDataID = localStorage.getItem("chosedID");
                if (chosedDataID) {
                    const dishesData = JSON.parse(localStorage.getItem("category"));
                    console.log("data-id choosed===" + chosedDataID);
                    renderDishes(dishesData, chosedDataID);
                } else console.log("Категорію не знайдено");
                const slidechosID = localStorage.getItem("chosedSlideId");
                console.log("ce nf inshij storinci" + slidechosID);
                function renderDishes(newdata, chosedDataID) {
                    newdata.forEach((category => {
                        if (category.id == chosedDataID) category.dishes.forEach((dish => {
                            const dishItem = document.createElement("div");
                            dishItem.classList.add("dishes__item", "item");
                            dishItem.id = `${dish.id}`;
                            dishItem.innerHTML = `\n              <div class="item__picture" >\n                <img class="item__image ibg" src="${dish.imageUrl}" alt="${dish.caption}">\n              </div>\n              <div class="item__text text" >\n                <div class="text__title">\n                  <h2>${dish.caption}</h2>\n                </div>\n                <div class="text__describe">\n                  <p>${dish.description}</p>\n                </div>\n              </div>\n              <div class="item__navigate navigate">\n                <div class="navigate__price price">\n                  <div class="price__mass">\n                    <h3>280 г</h3>\n                  </div>\n                  <div class="price__amount">\n                    <h4>${dish.price} грн</h4>\n                  </div>\n                </div>\n                <div class="navigate__quantity" style="display: none;">\n                  <button class="navigate__minus" id="minus"> - </button>\n                  <input class="navigate__input" type="text" value="1" min="0">\n                  <button class="navigate__plus" id="plus"> + </button>\n                </div>\n                <div class="navigate__basket basket">\n                  <button class="basket__btn"><img src="img/basketSvg.svg" alt="basket"></button>\n                </div>\n              </div>\n            `;
                            dishContainer.appendChild(dishItem);
                        }));
                    }));
                }
                dishContainer.addEventListener("click", (function(event) {
                    const target = event.target;
                    if (target.closest(".basket__btn")) {
                        const parentCard = target.closest(".item");
                        const quantityBlock = parentCard.querySelector(".navigate__quantity");
                        const basketBtn = parentCard.querySelector(".basket__btn");
                        quantityBlock.style.display = "flex";
                        basketBtn.style.display = "none";
                    }
                    if (target.matches("#minus")) {
                        const parentCard = target.closest(".item");
                        const dishValue = parentCard.querySelector(".navigate__input");
                        const btnMinus = parentCard.querySelector(".navigate__minus");
                        let curentDishValue = parseInt(dishValue.value);
                        if (btnMinus) {
                            btnMinus.style.background = "orange";
                            setTimeout((() => {
                                btnMinus.style.background = "";
                            }), 100);
                        }
                        if (curentDishValue < 0) curentDishValue = 0;
                        if (curentDishValue === 0) {
                            const basketBtn = parentCard.querySelector(".basket__btn");
                            const quantityBlock = parentCard.querySelector(".navigate__quantity");
                            basketBtn.style.display = "block";
                            quantityBlock.style.display = "none";
                        }
                        dishValue.value = curentDishValue;
                    }
                    if (target.matches("#plus")) {
                        const parentCard = target.closest(".item");
                        parentCard.querySelector(".navigate__input");
                        const btnPlus = parentCard.querySelector(".navigate__plus");
                        if (btnPlus) {
                            btnPlus.style.background = "orange";
                            setTimeout((() => {
                                btnPlus.style.background = "";
                            }), 100);
                        }
                    }
                }));
                dishContainer.addEventListener("click", (function(event) {
                    const target = event.target;
                    if (target.closest(".basket__btn")) {
                        const parentCard = target.closest(".item");
                        let dishData = {
                            id: parentCard.id,
                            caption: parentCard.querySelector(".text__title").innerText,
                            price: parseFloat(parentCard.querySelector(".price__amount h4").innerText),
                            quantity: parseInt(parentCard.querySelector(".navigate__input").value),
                            description: parentCard.querySelector(".text__describe").innerText,
                            imageUrl: parentCard.querySelector(".item__image").src
                        };
                        let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes"));
                        if (!Array.isArray(selectedDishes)) selectedDishes = [];
                        selectedDishes.push(dishData);
                        localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
                        console.log(localStorage.getItem("selectedDishes"));
                    }
                    if (target.closest(".navigate__plus")) {
                        const parentCard = target.closest(".item");
                        const quantityInput = parentCard.querySelector(".navigate__input");
                        let quantity = parseInt(quantityInput.value);
                        quantity++;
                        quantityInput.value = quantity;
                        let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes"));
                        if (Array.isArray(selectedDishes)) {
                            const dishIndex = selectedDishes.findIndex((dish => dish.id === parentCard.id));
                            if (dishIndex !== -1) {
                                selectedDishes[dishIndex].quantity = quantity;
                                localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
                            }
                        }
                    }
                    if (target.closest(".navigate__minus")) {
                        const parentCard = target.closest(".item");
                        const quantityInput = parentCard.querySelector(".navigate__input");
                        let quantity = parseInt(quantityInput.value);
                        quantity--;
                        if (quantity < 0) quantity = 0;
                        quantityInput.value = quantity;
                        let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes"));
                        if (Array.isArray(selectedDishes)) {
                            const dishIndex = selectedDishes.findIndex((dish => dish.id === parentCard.id));
                            if (dishIndex !== -1) {
                                selectedDishes[dishIndex].quantity = quantity;
                                localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
                            }
                        }
                        if (quantity === 0) {
                            const basketBtn = parentCard.querySelector(".basket__btn");
                            const quantityBlock = parentCard.querySelector(".navigate__quantity");
                            basketBtn.style.display = "block";
                            quantityBlock.style.display = "none";
                        }
                    }
                    console.log(localStorage);
                }));
            }
        }));
        __webpack_require__(334);
        const wideSlider_newdata = localStorage.getItem("category");
        const wideSlider_showdata = JSON.parse(wideSlider_newdata);
        const wideSlide = document.querySelector(".inner__wrapper");
        if (wideSlide) wideSlider_showdata.forEach((slide => {
            const newWideslide = document.createElement("div");
            newWideslide.classList.add("inner__slide", "swiper-slide");
            newWideslide.setAttribute("slide-id", slide.id);
            newWideslide.innerHTML = `\n            <a href="secondLayout.html"><p class="inner__first">${slide.caption}</p></a>\n        `;
            wideSlide.appendChild(newWideslide);
            newWideslide.addEventListener("click", (() => {
                localStorage.setItem("chosedSlideId", slide.id);
                console.log("перехід в меню з id == " + slide.id);
            }));
        }));
        const savedSlideId = localStorage.getItem("chosedSlideId");
        if (savedSlideId) {
            const slideToHighlight = document.querySelector(`[slide-id="${savedSlideId}"]`);
            if (slideToHighlight) slideToHighlight.style.background = "#FF831D";
        }
        const needIdSlide = localStorage.getItem("chosedSlideId");
        console.log(needIdSlide + "=id pidmenu slida");
        document.addEventListener("DOMContentLoaded", (function() {
            function renderMenuFromTinySlider(showdata, needIdSlide) {
                const dishContainer = document.querySelector(".page__dishes");
                if (dishContainer) {
                    dishContainer.innerHTML = "";
                    showdata.forEach((category => {
                        if (category.id == needIdSlide) category.dishes.forEach((dish => {
                            const dishItem = document.createElement("div");
                            dishItem.classList.add("dishes__item", "item");
                            dishItem.id = `${dish.id}`;
                            dishItem.innerHTML = `\n              <div class="item__picture" >\n                <img class="item__image ibg" src="${dish.imageUrl}" alt="${dish.caption}">\n              </div>\n              <div class="item__text text" >\n                <div class="text__title">\n                  <h2>${dish.caption}</h2>\n                </div>\n                <div class="text__describe">\n                  <p>${dish.description}</p>\n                </div>\n              </div>\n              <div class="item__navigate navigate">\n                <div class="navigate__price price">\n                  <div class="price__mass">\n                    <h3>280 г</h3>\n                  </div>\n                  <div class="price__amount">\n                    <h4>${dish.price} грн</h4>\n                  </div>\n                </div>\n                <div class="navigate__quantity" style="display: none;">\n                  <button class="navigate__minus" id="minus"> - </button>\n                  <input class="navigate__input" type="text" value="1" min="0">\n                  <button class="navigate__plus" id="plus"> + </button>\n                </div>\n                <div class="navigate__basket basket">\n                  <button class="basket__btn"><img src="img/basketSvg.svg" alt="basket"></button>\n                </div>\n              </div>\n            `;
                            dishContainer.appendChild(dishItem);
                        }));
                    }));
                }
            }
            renderMenuFromTinySlider(wideSlider_showdata, needIdSlide);
        }));
        const backGroundTinySlider_newdata = localStorage.getItem("chosedSlideId");
        const savedSlideIds = JSON.parse(localStorage.getItem("category")) || [];
        const shoTdata = JSON.parse(backGroundTinySlider_newdata);
        console.log(shoTdata + "==========" + savedSlideIds);
        savedSlideIds.forEach(((slide, shoTdata) => {
            if (shoTdata == slide.id) ;
        }));
        function bind(fn, thisArg) {
            return function wrap() {
                return fn.apply(thisArg, arguments);
            };
        }
        const {toString: utils_toString} = Object.prototype;
        const {getPrototypeOf} = Object;
        const kindOf = (cache => thing => {
            const str = utils_toString.call(thing);
            return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
        })(Object.create(null));
        const kindOfTest = type => {
            type = type.toLowerCase();
            return thing => kindOf(thing) === type;
        };
        const typeOfTest = type => thing => typeof thing === type;
        const {isArray} = Array;
        const isUndefined = typeOfTest("undefined");
        function isBuffer(val) {
            return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
        }
        const isArrayBuffer = kindOfTest("ArrayBuffer");
        function isArrayBufferView(val) {
            let result;
            if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val); else result = val && val.buffer && isArrayBuffer(val.buffer);
            return result;
        }
        const isString = typeOfTest("string");
        const isFunction = typeOfTest("function");
        const isNumber = typeOfTest("number");
        const lib_utils_isObject = thing => thing !== null && typeof thing === "object";
        const isBoolean = thing => thing === true || thing === false;
        const isPlainObject = val => {
            if (kindOf(val) !== "object") return false;
            const prototype = getPrototypeOf(val);
            return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
        };
        const isDate = kindOfTest("Date");
        const isFile = kindOfTest("File");
        const isBlob = kindOfTest("Blob");
        const isFileList = kindOfTest("FileList");
        const isStream = val => lib_utils_isObject(val) && isFunction(val.pipe);
        const isFormData = thing => {
            let kind;
            return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
        };
        const isURLSearchParams = kindOfTest("URLSearchParams");
        const [isReadableStream, isRequest, isResponse, isHeaders] = [ "ReadableStream", "Request", "Response", "Headers" ].map(kindOfTest);
        const trim = str => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        function forEach(obj, fn, {allOwnKeys = false} = {}) {
            if (obj === null || typeof obj === "undefined") return;
            let i;
            let l;
            if (typeof obj !== "object") obj = [ obj ];
            if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj); else {
                const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
                const len = keys.length;
                let key;
                for (i = 0; i < len; i++) {
                    key = keys[i];
                    fn.call(null, obj[key], key, obj);
                }
            }
        }
        function findKey(obj, key) {
            key = key.toLowerCase();
            const keys = Object.keys(obj);
            let i = keys.length;
            let _key;
            while (i-- > 0) {
                _key = keys[i];
                if (key === _key.toLowerCase()) return _key;
            }
            return null;
        }
        const _global = (() => {
            if (typeof globalThis !== "undefined") return globalThis;
            return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
        })();
        const isContextDefined = context => !isUndefined(context) && context !== _global;
        function merge() {
            const {caseless} = isContextDefined(this) && this || {};
            const result = {};
            const assignValue = (val, key) => {
                const targetKey = caseless && findKey(result, key) || key;
                if (isPlainObject(result[targetKey]) && isPlainObject(val)) result[targetKey] = merge(result[targetKey], val); else if (isPlainObject(val)) result[targetKey] = merge({}, val); else if (isArray(val)) result[targetKey] = val.slice(); else result[targetKey] = val;
            };
            for (let i = 0, l = arguments.length; i < l; i++) arguments[i] && forEach(arguments[i], assignValue);
            return result;
        }
        const lib_utils_extend = (a, b, thisArg, {allOwnKeys} = {}) => {
            forEach(b, ((val, key) => {
                if (thisArg && isFunction(val)) a[key] = bind(val, thisArg); else a[key] = val;
            }), {
                allOwnKeys
            });
            return a;
        };
        const stripBOM = content => {
            if (content.charCodeAt(0) === 65279) content = content.slice(1);
            return content;
        };
        const inherits = (constructor, superConstructor, props, descriptors) => {
            constructor.prototype = Object.create(superConstructor.prototype, descriptors);
            constructor.prototype.constructor = constructor;
            Object.defineProperty(constructor, "super", {
                value: superConstructor.prototype
            });
            props && Object.assign(constructor.prototype, props);
        };
        const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
            let props;
            let i;
            let prop;
            const merged = {};
            destObj = destObj || {};
            if (sourceObj == null) return destObj;
            do {
                props = Object.getOwnPropertyNames(sourceObj);
                i = props.length;
                while (i-- > 0) {
                    prop = props[i];
                    if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
                        destObj[prop] = sourceObj[prop];
                        merged[prop] = true;
                    }
                }
                sourceObj = filter !== false && getPrototypeOf(sourceObj);
            } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
            return destObj;
        };
        const endsWith = (str, searchString, position) => {
            str = String(str);
            if (position === void 0 || position > str.length) position = str.length;
            position -= searchString.length;
            const lastIndex = str.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
        const toArray = thing => {
            if (!thing) return null;
            if (isArray(thing)) return thing;
            let i = thing.length;
            if (!isNumber(i)) return null;
            const arr = new Array(i);
            while (i-- > 0) arr[i] = thing[i];
            return arr;
        };
        const isTypedArray = (TypedArray => thing => TypedArray && thing instanceof TypedArray)(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
        const forEachEntry = (obj, fn) => {
            const generator = obj && obj[Symbol.iterator];
            const iterator = generator.call(obj);
            let result;
            while ((result = iterator.next()) && !result.done) {
                const pair = result.value;
                fn.call(obj, pair[0], pair[1]);
            }
        };
        const matchAll = (regExp, str) => {
            let matches;
            const arr = [];
            while ((matches = regExp.exec(str)) !== null) arr.push(matches);
            return arr;
        };
        const isHTMLForm = kindOfTest("HTMLFormElement");
        const toCamelCase = str => str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, (function replacer(m, p1, p2) {
            return p1.toUpperCase() + p2;
        }));
        const utils_hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
        const isRegExp = kindOfTest("RegExp");
        const reduceDescriptors = (obj, reducer) => {
            const descriptors = Object.getOwnPropertyDescriptors(obj);
            const reducedDescriptors = {};
            forEach(descriptors, ((descriptor, name) => {
                let ret;
                if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
            }));
            Object.defineProperties(obj, reducedDescriptors);
        };
        const freezeMethods = obj => {
            reduceDescriptors(obj, ((descriptor, name) => {
                if (isFunction(obj) && [ "arguments", "caller", "callee" ].indexOf(name) !== -1) return false;
                const value = obj[name];
                if (!isFunction(value)) return;
                descriptor.enumerable = false;
                if ("writable" in descriptor) {
                    descriptor.writable = false;
                    return;
                }
                if (!descriptor.set) descriptor.set = () => {
                    throw Error("Can not rewrite read-only method '" + name + "'");
                };
            }));
        };
        const toObjectSet = (arrayOrString, delimiter) => {
            const obj = {};
            const define = arr => {
                arr.forEach((value => {
                    obj[value] = true;
                }));
            };
            isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
            return obj;
        };
        const noop = () => {};
        const toFiniteNumber = (value, defaultValue) => value != null && Number.isFinite(value = +value) ? value : defaultValue;
        const ALPHA = "abcdefghijklmnopqrstuvwxyz";
        const DIGIT = "0123456789";
        const ALPHABET = {
            DIGIT,
            ALPHA,
            ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
        };
        const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
            let str = "";
            const {length} = alphabet;
            while (size--) str += alphabet[Math.random() * length | 0];
            return str;
        };
        function isSpecCompliantForm(thing) {
            return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
        }
        const toJSONObject = obj => {
            const stack = new Array(10);
            const visit = (source, i) => {
                if (lib_utils_isObject(source)) {
                    if (stack.indexOf(source) >= 0) return;
                    if (!("toJSON" in source)) {
                        stack[i] = source;
                        const target = isArray(source) ? [] : {};
                        forEach(source, ((value, key) => {
                            const reducedValue = visit(value, i + 1);
                            !isUndefined(reducedValue) && (target[key] = reducedValue);
                        }));
                        stack[i] = void 0;
                        return target;
                    }
                }
                return source;
            };
            return visit(obj, 0);
        };
        const isAsyncFn = kindOfTest("AsyncFunction");
        const isThenable = thing => thing && (lib_utils_isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
        const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
            if (setImmediateSupported) return setImmediate;
            return postMessageSupported ? ((token, callbacks) => {
                _global.addEventListener("message", (({source, data}) => {
                    if (source === _global && data === token) callbacks.length && callbacks.shift()();
                }), false);
                return cb => {
                    callbacks.push(cb);
                    _global.postMessage(token, "*");
                };
            })(`axios@${Math.random()}`, []) : cb => setTimeout(cb);
        })(typeof setImmediate === "function", isFunction(_global.postMessage));
        const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
        const utils = {
            isArray,
            isArrayBuffer,
            isBuffer,
            isFormData,
            isArrayBufferView,
            isString,
            isNumber,
            isBoolean,
            isObject: lib_utils_isObject,
            isPlainObject,
            isReadableStream,
            isRequest,
            isResponse,
            isHeaders,
            isUndefined,
            isDate,
            isFile,
            isBlob,
            isRegExp,
            isFunction,
            isStream,
            isURLSearchParams,
            isTypedArray,
            isFileList,
            forEach,
            merge,
            extend: lib_utils_extend,
            trim,
            stripBOM,
            inherits,
            toFlatObject,
            kindOf,
            kindOfTest,
            endsWith,
            toArray,
            forEachEntry,
            matchAll,
            isHTMLForm,
            hasOwnProperty: utils_hasOwnProperty,
            hasOwnProp: utils_hasOwnProperty,
            reduceDescriptors,
            freezeMethods,
            toObjectSet,
            toCamelCase,
            noop,
            toFiniteNumber,
            findKey,
            global: _global,
            isContextDefined,
            ALPHABET,
            generateString,
            isSpecCompliantForm,
            toJSONObject,
            isAsyncFn,
            isThenable,
            setImmediate: _setImmediate,
            asap
        };
        function AxiosError(message, code, config, request, response) {
            Error.call(this);
            if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor); else this.stack = (new Error).stack;
            this.message = message;
            this.name = "AxiosError";
            code && (this.code = code);
            config && (this.config = config);
            request && (this.request = request);
            if (response) {
                this.response = response;
                this.status = response.status ? response.status : null;
            }
        }
        utils.inherits(AxiosError, Error, {
            toJSON: function toJSON() {
                return {
                    message: this.message,
                    name: this.name,
                    description: this.description,
                    number: this.number,
                    fileName: this.fileName,
                    lineNumber: this.lineNumber,
                    columnNumber: this.columnNumber,
                    stack: this.stack,
                    config: utils.toJSONObject(this.config),
                    code: this.code,
                    status: this.status
                };
            }
        });
        const AxiosError_prototype = AxiosError.prototype;
        const descriptors = {};
        [ "ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL" ].forEach((code => {
            descriptors[code] = {
                value: code
            };
        }));
        Object.defineProperties(AxiosError, descriptors);
        Object.defineProperty(AxiosError_prototype, "isAxiosError", {
            value: true
        });
        AxiosError.from = (error, code, config, request, response, customProps) => {
            const axiosError = Object.create(AxiosError_prototype);
            utils.toFlatObject(error, axiosError, (function filter(obj) {
                return obj !== Error.prototype;
            }), (prop => prop !== "isAxiosError"));
            AxiosError.call(axiosError, error.message, code, config, request, response);
            axiosError.cause = error;
            axiosError.name = error.name;
            customProps && Object.assign(axiosError, customProps);
            return axiosError;
        };
        const core_AxiosError = AxiosError;
        const helpers_null = null;
        function isVisitable(thing) {
            return utils.isPlainObject(thing) || utils.isArray(thing);
        }
        function removeBrackets(key) {
            return utils.endsWith(key, "[]") ? key.slice(0, -2) : key;
        }
        function renderKey(path, key, dots) {
            if (!path) return key;
            return path.concat(key).map((function each(token, i) {
                token = removeBrackets(token);
                return !dots && i ? "[" + token + "]" : token;
            })).join(dots ? "." : "");
        }
        function isFlatArray(arr) {
            return utils.isArray(arr) && !arr.some(isVisitable);
        }
        const predicates = utils.toFlatObject(utils, {}, null, (function filter(prop) {
            return /^is[A-Z]/.test(prop);
        }));
        function toFormData(obj, formData, options) {
            if (!utils.isObject(obj)) throw new TypeError("target must be an object");
            formData = formData || new (helpers_null || FormData);
            options = utils.toFlatObject(options, {
                metaTokens: true,
                dots: false,
                indexes: false
            }, false, (function defined(option, source) {
                return !utils.isUndefined(source[option]);
            }));
            const metaTokens = options.metaTokens;
            const visitor = options.visitor || defaultVisitor;
            const dots = options.dots;
            const indexes = options.indexes;
            const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
            const useBlob = _Blob && utils.isSpecCompliantForm(formData);
            if (!utils.isFunction(visitor)) throw new TypeError("visitor must be a function");
            function convertValue(value) {
                if (value === null) return "";
                if (utils.isDate(value)) return value.toISOString();
                if (!useBlob && utils.isBlob(value)) throw new core_AxiosError("Blob is not supported. Use a Buffer instead.");
                if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) return useBlob && typeof Blob === "function" ? new Blob([ value ]) : Buffer.from(value);
                return value;
            }
            function defaultVisitor(value, key, path) {
                let arr = value;
                if (value && !path && typeof value === "object") if (utils.endsWith(key, "{}")) {
                    key = metaTokens ? key : key.slice(0, -2);
                    value = JSON.stringify(value);
                } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value))) {
                    key = removeBrackets(key);
                    arr.forEach((function each(el, index) {
                        !(utils.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([ key ], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
                    }));
                    return false;
                }
                if (isVisitable(value)) return true;
                formData.append(renderKey(path, key, dots), convertValue(value));
                return false;
            }
            const stack = [];
            const exposedHelpers = Object.assign(predicates, {
                defaultVisitor,
                convertValue,
                isVisitable
            });
            function build(value, path) {
                if (utils.isUndefined(value)) return;
                if (stack.indexOf(value) !== -1) throw Error("Circular reference detected in " + path.join("."));
                stack.push(value);
                utils.forEach(value, (function each(el, key) {
                    const result = !(utils.isUndefined(el) || el === null) && visitor.call(formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers);
                    if (result === true) build(el, path ? path.concat(key) : [ key ]);
                }));
                stack.pop();
            }
            if (!utils.isObject(obj)) throw new TypeError("data must be an object");
            build(obj);
            return formData;
        }
        const helpers_toFormData = toFormData;
        function encode(str) {
            const charMap = {
                "!": "%21",
                "'": "%27",
                "(": "%28",
                ")": "%29",
                "~": "%7E",
                "%20": "+",
                "%00": "\0"
            };
            return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, (function replacer(match) {
                return charMap[match];
            }));
        }
        function AxiosURLSearchParams(params, options) {
            this._pairs = [];
            params && helpers_toFormData(params, this, options);
        }
        const AxiosURLSearchParams_prototype = AxiosURLSearchParams.prototype;
        AxiosURLSearchParams_prototype.append = function append(name, value) {
            this._pairs.push([ name, value ]);
        };
        AxiosURLSearchParams_prototype.toString = function toString(encoder) {
            const _encode = encoder ? function(value) {
                return encoder.call(this, value, encode);
            } : encode;
            return this._pairs.map((function each(pair) {
                return _encode(pair[0]) + "=" + _encode(pair[1]);
            }), "").join("&");
        };
        const helpers_AxiosURLSearchParams = AxiosURLSearchParams;
        function buildURL_encode(val) {
            return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        function buildURL(url, params, options) {
            if (!params) return url;
            const _encode = options && options.encode || buildURL_encode;
            const serializeFn = options && options.serialize;
            let serializedParams;
            if (serializeFn) serializedParams = serializeFn(params, options); else serializedParams = utils.isURLSearchParams(params) ? params.toString() : new helpers_AxiosURLSearchParams(params, options).toString(_encode);
            if (serializedParams) {
                const hashmarkIndex = url.indexOf("#");
                if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
                url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
            }
            return url;
        }
        class InterceptorManager {
            constructor() {
                this.handlers = [];
            }
            use(fulfilled, rejected, options) {
                this.handlers.push({
                    fulfilled,
                    rejected,
                    synchronous: options ? options.synchronous : false,
                    runWhen: options ? options.runWhen : null
                });
                return this.handlers.length - 1;
            }
            eject(id) {
                if (this.handlers[id]) this.handlers[id] = null;
            }
            clear() {
                if (this.handlers) this.handlers = [];
            }
            forEach(fn) {
                utils.forEach(this.handlers, (function forEachHandler(h) {
                    if (h !== null) fn(h);
                }));
            }
        }
        const core_InterceptorManager = InterceptorManager;
        const defaults_transitional = {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false
        };
        const classes_URLSearchParams = typeof URLSearchParams !== "undefined" ? URLSearchParams : helpers_AxiosURLSearchParams;
        const classes_FormData = typeof FormData !== "undefined" ? FormData : null;
        const classes_Blob = typeof Blob !== "undefined" ? Blob : null;
        const platform_browser = {
            isBrowser: true,
            classes: {
                URLSearchParams: classes_URLSearchParams,
                FormData: classes_FormData,
                Blob: classes_Blob
            },
            protocols: [ "http", "https", "file", "blob", "url", "data" ]
        };
        const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
        const _navigator = typeof navigator === "object" && navigator || void 0;
        const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [ "ReactNative", "NativeScript", "NS" ].indexOf(_navigator.product) < 0);
        const hasStandardBrowserWebWorkerEnv = (() => typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function")();
        const origin = hasBrowserEnv && window.location.href || "http://localhost";
        const platform = {
            ...common_utils_namespaceObject,
            ...platform_browser
        };
        function toURLEncodedForm(data, options) {
            return helpers_toFormData(data, new platform.classes.URLSearchParams, Object.assign({
                visitor: function(value, key, path, helpers) {
                    if (platform.isNode && utils.isBuffer(value)) {
                        this.append(key, value.toString("base64"));
                        return false;
                    }
                    return helpers.defaultVisitor.apply(this, arguments);
                }
            }, options));
        }
        function parsePropPath(name) {
            return utils.matchAll(/\w+|\[(\w*)]/g, name).map((match => match[0] === "[]" ? "" : match[1] || match[0]));
        }
        function arrayToObject(arr) {
            const obj = {};
            const keys = Object.keys(arr);
            let i;
            const len = keys.length;
            let key;
            for (i = 0; i < len; i++) {
                key = keys[i];
                obj[key] = arr[key];
            }
            return obj;
        }
        function formDataToJSON(formData) {
            function buildPath(path, value, target, index) {
                let name = path[index++];
                if (name === "__proto__") return true;
                const isNumericKey = Number.isFinite(+name);
                const isLast = index >= path.length;
                name = !name && utils.isArray(target) ? target.length : name;
                if (isLast) {
                    if (utils.hasOwnProp(target, name)) target[name] = [ target[name], value ]; else target[name] = value;
                    return !isNumericKey;
                }
                if (!target[name] || !utils.isObject(target[name])) target[name] = [];
                const result = buildPath(path, value, target[name], index);
                if (result && utils.isArray(target[name])) target[name] = arrayToObject(target[name]);
                return !isNumericKey;
            }
            if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
                const obj = {};
                utils.forEachEntry(formData, ((name, value) => {
                    buildPath(parsePropPath(name), value, obj, 0);
                }));
                return obj;
            }
            return null;
        }
        const helpers_formDataToJSON = formDataToJSON;
        function stringifySafely(rawValue, parser, encoder) {
            if (utils.isString(rawValue)) try {
                (parser || JSON.parse)(rawValue);
                return utils.trim(rawValue);
            } catch (e) {
                if (e.name !== "SyntaxError") throw e;
            }
            return (encoder || JSON.stringify)(rawValue);
        }
        const defaults_defaults = {
            transitional: defaults_transitional,
            adapter: [ "xhr", "http", "fetch" ],
            transformRequest: [ function transformRequest(data, headers) {
                const contentType = headers.getContentType() || "";
                const hasJSONContentType = contentType.indexOf("application/json") > -1;
                const isObjectPayload = utils.isObject(data);
                if (isObjectPayload && utils.isHTMLForm(data)) data = new FormData(data);
                const isFormData = utils.isFormData(data);
                if (isFormData) return hasJSONContentType ? JSON.stringify(helpers_formDataToJSON(data)) : data;
                if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data) || utils.isReadableStream(data)) return data;
                if (utils.isArrayBufferView(data)) return data.buffer;
                if (utils.isURLSearchParams(data)) {
                    headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
                    return data.toString();
                }
                let isFileList;
                if (isObjectPayload) {
                    if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, this.formSerializer).toString();
                    if ((isFileList = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
                        const _FormData = this.env && this.env.FormData;
                        return helpers_toFormData(isFileList ? {
                            "files[]": data
                        } : data, _FormData && new _FormData, this.formSerializer);
                    }
                }
                if (isObjectPayload || hasJSONContentType) {
                    headers.setContentType("application/json", false);
                    return stringifySafely(data);
                }
                return data;
            } ],
            transformResponse: [ function transformResponse(data) {
                const transitional = this.transitional || defaults_defaults.transitional;
                const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
                const JSONRequested = this.responseType === "json";
                if (utils.isResponse(data) || utils.isReadableStream(data)) return data;
                if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
                    const silentJSONParsing = transitional && transitional.silentJSONParsing;
                    const strictJSONParsing = !silentJSONParsing && JSONRequested;
                    try {
                        return JSON.parse(data);
                    } catch (e) {
                        if (strictJSONParsing) {
                            if (e.name === "SyntaxError") throw core_AxiosError.from(e, core_AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
                            throw e;
                        }
                    }
                }
                return data;
            } ],
            timeout: 0,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            maxContentLength: -1,
            maxBodyLength: -1,
            env: {
                FormData: platform.classes.FormData,
                Blob: platform.classes.Blob
            },
            validateStatus: function validateStatus(status) {
                return status >= 200 && status < 300;
            },
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": void 0
                }
            }
        };
        utils.forEach([ "delete", "get", "head", "post", "put", "patch" ], (method => {
            defaults_defaults.headers[method] = {};
        }));
        const lib_defaults = defaults_defaults;
        const ignoreDuplicateOf = utils.toObjectSet([ "age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent" ]);
        const parseHeaders = rawHeaders => {
            const parsed = {};
            let key;
            let val;
            let i;
            rawHeaders && rawHeaders.split("\n").forEach((function parser(line) {
                i = line.indexOf(":");
                key = line.substring(0, i).trim().toLowerCase();
                val = line.substring(i + 1).trim();
                if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
                if (key === "set-cookie") if (parsed[key]) parsed[key].push(val); else parsed[key] = [ val ]; else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }));
            return parsed;
        };
        const $internals = Symbol("internals");
        function normalizeHeader(header) {
            return header && String(header).trim().toLowerCase();
        }
        function normalizeValue(value) {
            if (value === false || value == null) return value;
            return utils.isArray(value) ? value.map(normalizeValue) : String(value);
        }
        function parseTokens(str) {
            const tokens = Object.create(null);
            const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
            let match;
            while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
            return tokens;
        }
        const isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
        function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
            if (utils.isFunction(filter)) return filter.call(this, value, header);
            if (isHeaderNameFilter) value = header;
            if (!utils.isString(value)) return;
            if (utils.isString(filter)) return value.indexOf(filter) !== -1;
            if (utils.isRegExp(filter)) return filter.test(value);
        }
        function formatHeader(header) {
            return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, ((w, char, str) => char.toUpperCase() + str));
        }
        function buildAccessors(obj, header) {
            const accessorName = utils.toCamelCase(" " + header);
            [ "get", "set", "has" ].forEach((methodName => {
                Object.defineProperty(obj, methodName + accessorName, {
                    value: function(arg1, arg2, arg3) {
                        return this[methodName].call(this, header, arg1, arg2, arg3);
                    },
                    configurable: true
                });
            }));
        }
        class AxiosHeaders {
            constructor(headers) {
                headers && this.set(headers);
            }
            set(header, valueOrRewrite, rewrite) {
                const self = this;
                function setHeader(_value, _header, _rewrite) {
                    const lHeader = normalizeHeader(_header);
                    if (!lHeader) throw new Error("header name must be a non-empty string");
                    const key = utils.findKey(self, lHeader);
                    if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
                }
                const setHeaders = (headers, _rewrite) => utils.forEach(headers, ((_value, _header) => setHeader(_value, _header, _rewrite)));
                if (utils.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite); else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders(header), valueOrRewrite); else if (utils.isHeaders(header)) for (const [key, value] of header.entries()) setHeader(value, key, rewrite); else header != null && setHeader(valueOrRewrite, header, rewrite);
                return this;
            }
            get(header, parser) {
                header = normalizeHeader(header);
                if (header) {
                    const key = utils.findKey(this, header);
                    if (key) {
                        const value = this[key];
                        if (!parser) return value;
                        if (parser === true) return parseTokens(value);
                        if (utils.isFunction(parser)) return parser.call(this, value, key);
                        if (utils.isRegExp(parser)) return parser.exec(value);
                        throw new TypeError("parser must be boolean|regexp|function");
                    }
                }
            }
            has(header, matcher) {
                header = normalizeHeader(header);
                if (header) {
                    const key = utils.findKey(this, header);
                    return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
                }
                return false;
            }
            delete(header, matcher) {
                const self = this;
                let deleted = false;
                function deleteHeader(_header) {
                    _header = normalizeHeader(_header);
                    if (_header) {
                        const key = utils.findKey(self, _header);
                        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                            delete self[key];
                            deleted = true;
                        }
                    }
                }
                if (utils.isArray(header)) header.forEach(deleteHeader); else deleteHeader(header);
                return deleted;
            }
            clear(matcher) {
                const keys = Object.keys(this);
                let i = keys.length;
                let deleted = false;
                while (i--) {
                    const key = keys[i];
                    if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
                        delete this[key];
                        deleted = true;
                    }
                }
                return deleted;
            }
            normalize(format) {
                const self = this;
                const headers = {};
                utils.forEach(this, ((value, header) => {
                    const key = utils.findKey(headers, header);
                    if (key) {
                        self[key] = normalizeValue(value);
                        delete self[header];
                        return;
                    }
                    const normalized = format ? formatHeader(header) : String(header).trim();
                    if (normalized !== header) delete self[header];
                    self[normalized] = normalizeValue(value);
                    headers[normalized] = true;
                }));
                return this;
            }
            concat(...targets) {
                return this.constructor.concat(this, ...targets);
            }
            toJSON(asStrings) {
                const obj = Object.create(null);
                utils.forEach(this, ((value, header) => {
                    value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value);
                }));
                return obj;
            }
            [Symbol.iterator]() {
                return Object.entries(this.toJSON())[Symbol.iterator]();
            }
            toString() {
                return Object.entries(this.toJSON()).map((([header, value]) => header + ": " + value)).join("\n");
            }
            get [Symbol.toStringTag]() {
                return "AxiosHeaders";
            }
            static from(thing) {
                return thing instanceof this ? thing : new this(thing);
            }
            static concat(first, ...targets) {
                const computed = new this(first);
                targets.forEach((target => computed.set(target)));
                return computed;
            }
            static accessor(header) {
                const internals = this[$internals] = this[$internals] = {
                    accessors: {}
                };
                const accessors = internals.accessors;
                const prototype = this.prototype;
                function defineAccessor(_header) {
                    const lHeader = normalizeHeader(_header);
                    if (!accessors[lHeader]) {
                        buildAccessors(prototype, _header);
                        accessors[lHeader] = true;
                    }
                }
                utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
                return this;
            }
        }
        AxiosHeaders.accessor([ "Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization" ]);
        utils.reduceDescriptors(AxiosHeaders.prototype, (({value}, key) => {
            let mapped = key[0].toUpperCase() + key.slice(1);
            return {
                get: () => value,
                set(headerValue) {
                    this[mapped] = headerValue;
                }
            };
        }));
        utils.freezeMethods(AxiosHeaders);
        const core_AxiosHeaders = AxiosHeaders;
        function transformData(fns, response) {
            const config = this || lib_defaults;
            const context = response || config;
            const headers = core_AxiosHeaders.from(context.headers);
            let data = context.data;
            utils.forEach(fns, (function transform(fn) {
                data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
            }));
            headers.normalize();
            return data;
        }
        function isCancel(value) {
            return !!(value && value.__CANCEL__);
        }
        function CanceledError(message, config, request) {
            core_AxiosError.call(this, message == null ? "canceled" : message, core_AxiosError.ERR_CANCELED, config, request);
            this.name = "CanceledError";
        }
        utils.inherits(CanceledError, core_AxiosError, {
            __CANCEL__: true
        });
        const cancel_CanceledError = CanceledError;
        function settle(resolve, reject, response) {
            const validateStatus = response.config.validateStatus;
            if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response); else reject(new core_AxiosError("Request failed with status code " + response.status, [ core_AxiosError.ERR_BAD_REQUEST, core_AxiosError.ERR_BAD_RESPONSE ][Math.floor(response.status / 100) - 4], response.config, response.request, response));
        }
        function parseProtocol(url) {
            const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
            return match && match[1] || "";
        }
        function speedometer(samplesCount, min) {
            samplesCount = samplesCount || 10;
            const bytes = new Array(samplesCount);
            const timestamps = new Array(samplesCount);
            let head = 0;
            let tail = 0;
            let firstSampleTS;
            min = min !== void 0 ? min : 1e3;
            return function push(chunkLength) {
                const now = Date.now();
                const startedAt = timestamps[tail];
                if (!firstSampleTS) firstSampleTS = now;
                bytes[head] = chunkLength;
                timestamps[head] = now;
                let i = tail;
                let bytesCount = 0;
                while (i !== head) {
                    bytesCount += bytes[i++];
                    i %= samplesCount;
                }
                head = (head + 1) % samplesCount;
                if (head === tail) tail = (tail + 1) % samplesCount;
                if (now - firstSampleTS < min) return;
                const passed = startedAt && now - startedAt;
                return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
            };
        }
        const helpers_speedometer = speedometer;
        function throttle(fn, freq) {
            let timestamp = 0;
            let threshold = 1e3 / freq;
            let lastArgs;
            let timer;
            const invoke = (args, now = Date.now()) => {
                timestamp = now;
                lastArgs = null;
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                fn.apply(null, args);
            };
            const throttled = (...args) => {
                const now = Date.now();
                const passed = now - timestamp;
                if (passed >= threshold) invoke(args, now); else {
                    lastArgs = args;
                    if (!timer) timer = setTimeout((() => {
                        timer = null;
                        invoke(lastArgs);
                    }), threshold - passed);
                }
            };
            const flush = () => lastArgs && invoke(lastArgs);
            return [ throttled, flush ];
        }
        const helpers_throttle = throttle;
        const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
            let bytesNotified = 0;
            const _speedometer = helpers_speedometer(50, 250);
            return helpers_throttle((e => {
                const loaded = e.loaded;
                const total = e.lengthComputable ? e.total : void 0;
                const progressBytes = loaded - bytesNotified;
                const rate = _speedometer(progressBytes);
                const inRange = loaded <= total;
                bytesNotified = loaded;
                const data = {
                    loaded,
                    total,
                    progress: total ? loaded / total : void 0,
                    bytes: progressBytes,
                    rate: rate ? rate : void 0,
                    estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
                    event: e,
                    lengthComputable: total != null,
                    [isDownloadStream ? "download" : "upload"]: true
                };
                listener(data);
            }), freq);
        };
        const progressEventDecorator = (total, throttled) => {
            const lengthComputable = total != null;
            return [ loaded => throttled[0]({
                lengthComputable,
                total,
                loaded
            }), throttled[1] ];
        };
        const asyncDecorator = fn => (...args) => utils.asap((() => fn(...args)));
        const isURLSameOrigin = platform.hasStandardBrowserEnv ? function standardBrowserEnv() {
            const msie = platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent);
            const urlParsingNode = document.createElement("a");
            let originURL;
            function resolveURL(url) {
                let href = url;
                if (msie) {
                    urlParsingNode.setAttribute("href", href);
                    href = urlParsingNode.href;
                }
                urlParsingNode.setAttribute("href", href);
                return {
                    href: urlParsingNode.href,
                    protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
                    host: urlParsingNode.host,
                    search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
                    hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
                    hostname: urlParsingNode.hostname,
                    port: urlParsingNode.port,
                    pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
                };
            }
            originURL = resolveURL(window.location.href);
            return function isURLSameOrigin(requestURL) {
                const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
                return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
            };
        }() : function nonStandardBrowserEnv() {
            return function isURLSameOrigin() {
                return true;
            };
        }();
        const cookies = platform.hasStandardBrowserEnv ? {
            write(name, value, expires, path, domain, secure) {
                const cookie = [ name + "=" + encodeURIComponent(value) ];
                utils.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
                utils.isString(path) && cookie.push("path=" + path);
                utils.isString(domain) && cookie.push("domain=" + domain);
                secure === true && cookie.push("secure");
                document.cookie = cookie.join("; ");
            },
            read(name) {
                const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
                return match ? decodeURIComponent(match[3]) : null;
            },
            remove(name) {
                this.write(name, "", Date.now() - 864e5);
            }
        } : {
            write() {},
            read() {
                return null;
            },
            remove() {}
        };
        function isAbsoluteURL(url) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
        }
        function combineURLs(baseURL, relativeURL) {
            return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
        }
        function buildFullPath(baseURL, requestedURL) {
            if (baseURL && !isAbsoluteURL(requestedURL)) return combineURLs(baseURL, requestedURL);
            return requestedURL;
        }
        const headersToObject = thing => thing instanceof core_AxiosHeaders ? {
            ...thing
        } : thing;
        function mergeConfig(config1, config2) {
            config2 = config2 || {};
            const config = {};
            function getMergedValue(target, source, caseless) {
                if (utils.isPlainObject(target) && utils.isPlainObject(source)) return utils.merge.call({
                    caseless
                }, target, source); else if (utils.isPlainObject(source)) return utils.merge({}, source); else if (utils.isArray(source)) return source.slice();
                return source;
            }
            function mergeDeepProperties(a, b, caseless) {
                if (!utils.isUndefined(b)) return getMergedValue(a, b, caseless); else if (!utils.isUndefined(a)) return getMergedValue(void 0, a, caseless);
            }
            function valueFromConfig2(a, b) {
                if (!utils.isUndefined(b)) return getMergedValue(void 0, b);
            }
            function defaultToConfig2(a, b) {
                if (!utils.isUndefined(b)) return getMergedValue(void 0, b); else if (!utils.isUndefined(a)) return getMergedValue(void 0, a);
            }
            function mergeDirectKeys(a, b, prop) {
                if (prop in config2) return getMergedValue(a, b); else if (prop in config1) return getMergedValue(void 0, a);
            }
            const mergeMap = {
                url: valueFromConfig2,
                method: valueFromConfig2,
                data: valueFromConfig2,
                baseURL: defaultToConfig2,
                transformRequest: defaultToConfig2,
                transformResponse: defaultToConfig2,
                paramsSerializer: defaultToConfig2,
                timeout: defaultToConfig2,
                timeoutMessage: defaultToConfig2,
                withCredentials: defaultToConfig2,
                withXSRFToken: defaultToConfig2,
                adapter: defaultToConfig2,
                responseType: defaultToConfig2,
                xsrfCookieName: defaultToConfig2,
                xsrfHeaderName: defaultToConfig2,
                onUploadProgress: defaultToConfig2,
                onDownloadProgress: defaultToConfig2,
                decompress: defaultToConfig2,
                maxContentLength: defaultToConfig2,
                maxBodyLength: defaultToConfig2,
                beforeRedirect: defaultToConfig2,
                transport: defaultToConfig2,
                httpAgent: defaultToConfig2,
                httpsAgent: defaultToConfig2,
                cancelToken: defaultToConfig2,
                socketPath: defaultToConfig2,
                responseEncoding: defaultToConfig2,
                validateStatus: mergeDirectKeys,
                headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
            };
            utils.forEach(Object.keys(Object.assign({}, config1, config2)), (function computeConfigValue(prop) {
                const merge = mergeMap[prop] || mergeDeepProperties;
                const configValue = merge(config1[prop], config2[prop], prop);
                utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
            }));
            return config;
        }
        const resolveConfig = config => {
            const newConfig = mergeConfig({}, config);
            let {data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth} = newConfig;
            newConfig.headers = headers = core_AxiosHeaders.from(headers);
            newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
            if (auth) headers.set("Authorization", "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")));
            let contentType;
            if (utils.isFormData(data)) if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) headers.setContentType(void 0); else if ((contentType = headers.getContentType()) !== false) {
                const [type, ...tokens] = contentType ? contentType.split(";").map((token => token.trim())).filter(Boolean) : [];
                headers.setContentType([ type || "multipart/form-data", ...tokens ].join("; "));
            }
            if (platform.hasStandardBrowserEnv) {
                withXSRFToken && utils.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
                if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
                    const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
                    if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
                }
            }
            return newConfig;
        };
        const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
        const xhr = isXHRAdapterSupported && function(config) {
            return new Promise((function dispatchXhrRequest(resolve, reject) {
                const _config = resolveConfig(config);
                let requestData = _config.data;
                const requestHeaders = core_AxiosHeaders.from(_config.headers).normalize();
                let {responseType, onUploadProgress, onDownloadProgress} = _config;
                let onCanceled;
                let uploadThrottled, downloadThrottled;
                let flushUpload, flushDownload;
                function done() {
                    flushUpload && flushUpload();
                    flushDownload && flushDownload();
                    _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
                    _config.signal && _config.signal.removeEventListener("abort", onCanceled);
                }
                let request = new XMLHttpRequest;
                request.open(_config.method.toUpperCase(), _config.url, true);
                request.timeout = _config.timeout;
                function onloadend() {
                    if (!request) return;
                    const responseHeaders = core_AxiosHeaders.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
                    const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
                    const response = {
                        data: responseData,
                        status: request.status,
                        statusText: request.statusText,
                        headers: responseHeaders,
                        config,
                        request
                    };
                    settle((function _resolve(value) {
                        resolve(value);
                        done();
                    }), (function _reject(err) {
                        reject(err);
                        done();
                    }), response);
                    request = null;
                }
                if ("onloadend" in request) request.onloadend = onloadend; else request.onreadystatechange = function handleLoad() {
                    if (!request || request.readyState !== 4) return;
                    if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) return;
                    setTimeout(onloadend);
                };
                request.onabort = function handleAbort() {
                    if (!request) return;
                    reject(new core_AxiosError("Request aborted", core_AxiosError.ECONNABORTED, config, request));
                    request = null;
                };
                request.onerror = function handleError() {
                    reject(new core_AxiosError("Network Error", core_AxiosError.ERR_NETWORK, config, request));
                    request = null;
                };
                request.ontimeout = function handleTimeout() {
                    let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
                    const transitional = _config.transitional || defaults_transitional;
                    if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
                    reject(new core_AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? core_AxiosError.ETIMEDOUT : core_AxiosError.ECONNABORTED, config, request));
                    request = null;
                };
                requestData === void 0 && requestHeaders.setContentType(null);
                if ("setRequestHeader" in request) utils.forEach(requestHeaders.toJSON(), (function setRequestHeader(val, key) {
                    request.setRequestHeader(key, val);
                }));
                if (!utils.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
                if (responseType && responseType !== "json") request.responseType = _config.responseType;
                if (onDownloadProgress) {
                    [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
                    request.addEventListener("progress", downloadThrottled);
                }
                if (onUploadProgress && request.upload) {
                    [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
                    request.upload.addEventListener("progress", uploadThrottled);
                    request.upload.addEventListener("loadend", flushUpload);
                }
                if (_config.cancelToken || _config.signal) {
                    onCanceled = cancel => {
                        if (!request) return;
                        reject(!cancel || cancel.type ? new cancel_CanceledError(null, config, request) : cancel);
                        request.abort();
                        request = null;
                    };
                    _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
                    if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
                }
                const protocol = parseProtocol(_config.url);
                if (protocol && platform.protocols.indexOf(protocol) === -1) {
                    reject(new core_AxiosError("Unsupported protocol " + protocol + ":", core_AxiosError.ERR_BAD_REQUEST, config));
                    return;
                }
                request.send(requestData || null);
            }));
        };
        const composeSignals = (signals, timeout) => {
            const {length} = signals = signals ? signals.filter(Boolean) : [];
            if (timeout || length) {
                let controller = new AbortController;
                let aborted;
                const onabort = function(reason) {
                    if (!aborted) {
                        aborted = true;
                        unsubscribe();
                        const err = reason instanceof Error ? reason : this.reason;
                        controller.abort(err instanceof core_AxiosError ? err : new cancel_CanceledError(err instanceof Error ? err.message : err));
                    }
                };
                let timer = timeout && setTimeout((() => {
                    timer = null;
                    onabort(new core_AxiosError(`timeout ${timeout} of ms exceeded`, core_AxiosError.ETIMEDOUT));
                }), timeout);
                const unsubscribe = () => {
                    if (signals) {
                        timer && clearTimeout(timer);
                        timer = null;
                        signals.forEach((signal => {
                            signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
                        }));
                        signals = null;
                    }
                };
                signals.forEach((signal => signal.addEventListener("abort", onabort)));
                const {signal} = controller;
                signal.unsubscribe = () => utils.asap(unsubscribe);
                return signal;
            }
        };
        const helpers_composeSignals = composeSignals;
        const streamChunk = function*(chunk, chunkSize) {
            let len = chunk.byteLength;
            if (!chunkSize || len < chunkSize) {
                yield chunk;
                return;
            }
            let pos = 0;
            let end;
            while (pos < len) {
                end = pos + chunkSize;
                yield chunk.slice(pos, end);
                pos = end;
            }
        };
        const readBytes = async function*(iterable, chunkSize) {
            for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
        };
        const readStream = async function*(stream) {
            if (stream[Symbol.asyncIterator]) {
                yield* stream;
                return;
            }
            const reader = stream.getReader();
            try {
                for (;;) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    yield value;
                }
            } finally {
                await reader.cancel();
            }
        };
        const trackStream = (stream, chunkSize, onProgress, onFinish) => {
            const iterator = readBytes(stream, chunkSize);
            let bytes = 0;
            let done;
            let _onFinish = e => {
                if (!done) {
                    done = true;
                    onFinish && onFinish(e);
                }
            };
            return new ReadableStream({
                async pull(controller) {
                    try {
                        const {done, value} = await iterator.next();
                        if (done) {
                            _onFinish();
                            controller.close();
                            return;
                        }
                        let len = value.byteLength;
                        if (onProgress) {
                            let loadedBytes = bytes += len;
                            onProgress(loadedBytes);
                        }
                        controller.enqueue(new Uint8Array(value));
                    } catch (err) {
                        _onFinish(err);
                        throw err;
                    }
                },
                cancel(reason) {
                    _onFinish(reason);
                    return iterator.return();
                }
            }, {
                highWaterMark: 2
            });
        };
        const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
        const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
        const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? (encoder => str => encoder.encode(str))(new TextEncoder) : async str => new Uint8Array(await new Response(str).arrayBuffer()));
        const test = (fn, ...args) => {
            try {
                return !!fn(...args);
            } catch (e) {
                return false;
            }
        };
        const supportsRequestStream = isReadableStreamSupported && test((() => {
            let duplexAccessed = false;
            const hasContentType = new Request(platform.origin, {
                body: new ReadableStream,
                method: "POST",
                get duplex() {
                    duplexAccessed = true;
                    return "half";
                }
            }).headers.has("Content-Type");
            return duplexAccessed && !hasContentType;
        }));
        const DEFAULT_CHUNK_SIZE = 64 * 1024;
        const supportsResponseStream = isReadableStreamSupported && test((() => utils.isReadableStream(new Response("").body)));
        const resolvers = {
            stream: supportsResponseStream && (res => res.body)
        };
        isFetchSupported && (res => {
            [ "text", "arrayBuffer", "blob", "formData", "stream" ].forEach((type => {
                !resolvers[type] && (resolvers[type] = utils.isFunction(res[type]) ? res => res[type]() : (_, config) => {
                    throw new core_AxiosError(`Response type '${type}' is not supported`, core_AxiosError.ERR_NOT_SUPPORT, config);
                });
            }));
        })(new Response);
        const getBodyLength = async body => {
            if (body == null) return 0;
            if (utils.isBlob(body)) return body.size;
            if (utils.isSpecCompliantForm(body)) {
                const _request = new Request(platform.origin, {
                    method: "POST",
                    body
                });
                return (await _request.arrayBuffer()).byteLength;
            }
            if (utils.isArrayBufferView(body) || utils.isArrayBuffer(body)) return body.byteLength;
            if (utils.isURLSearchParams(body)) body += "";
            if (utils.isString(body)) return (await encodeText(body)).byteLength;
        };
        const resolveBodyLength = async (headers, body) => {
            const length = utils.toFiniteNumber(headers.getContentLength());
            return length == null ? getBodyLength(body) : length;
        };
        const adapters_fetch = isFetchSupported && (async config => {
            let {url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions} = resolveConfig(config);
            responseType = responseType ? (responseType + "").toLowerCase() : "text";
            let composedSignal = helpers_composeSignals([ signal, cancelToken && cancelToken.toAbortSignal() ], timeout);
            let request;
            const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
                composedSignal.unsubscribe();
            });
            let requestContentLength;
            try {
                if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
                    let _request = new Request(url, {
                        method: "POST",
                        body: data,
                        duplex: "half"
                    });
                    let contentTypeHeader;
                    if (utils.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
                    if (_request.body) {
                        const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
                        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
                    }
                }
                if (!utils.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
                const isCredentialsSupported = "credentials" in Request.prototype;
                request = new Request(url, {
                    ...fetchOptions,
                    signal: composedSignal,
                    method: method.toUpperCase(),
                    headers: headers.normalize().toJSON(),
                    body: data,
                    duplex: "half",
                    credentials: isCredentialsSupported ? withCredentials : void 0
                });
                let response = await fetch(request);
                const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
                if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
                    const options = {};
                    [ "status", "statusText", "headers" ].forEach((prop => {
                        options[prop] = response[prop];
                    }));
                    const responseContentLength = utils.toFiniteNumber(response.headers.get("content-length"));
                    const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
                    response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, (() => {
                        flush && flush();
                        unsubscribe && unsubscribe();
                    })), options);
                }
                responseType = responseType || "text";
                let responseData = await resolvers[utils.findKey(resolvers, responseType) || "text"](response, config);
                !isStreamResponse && unsubscribe && unsubscribe();
                return await new Promise(((resolve, reject) => {
                    settle(resolve, reject, {
                        data: responseData,
                        headers: core_AxiosHeaders.from(response.headers),
                        status: response.status,
                        statusText: response.statusText,
                        config,
                        request
                    });
                }));
            } catch (err) {
                unsubscribe && unsubscribe();
                if (err && err.name === "TypeError" && /fetch/i.test(err.message)) throw Object.assign(new core_AxiosError("Network Error", core_AxiosError.ERR_NETWORK, config, request), {
                    cause: err.cause || err
                });
                throw core_AxiosError.from(err, err && err.code, config, request);
            }
        });
        const knownAdapters = {
            http: helpers_null,
            xhr,
            fetch: adapters_fetch
        };
        utils.forEach(knownAdapters, ((fn, value) => {
            if (fn) {
                try {
                    Object.defineProperty(fn, "name", {
                        value
                    });
                } catch (e) {}
                Object.defineProperty(fn, "adapterName", {
                    value
                });
            }
        }));
        const renderReason = reason => `- ${reason}`;
        const isResolvedHandle = adapter => utils.isFunction(adapter) || adapter === null || adapter === false;
        const adapters = {
            getAdapter: adapters => {
                adapters = utils.isArray(adapters) ? adapters : [ adapters ];
                const {length} = adapters;
                let nameOrAdapter;
                let adapter;
                const rejectedReasons = {};
                for (let i = 0; i < length; i++) {
                    nameOrAdapter = adapters[i];
                    let id;
                    adapter = nameOrAdapter;
                    if (!isResolvedHandle(nameOrAdapter)) {
                        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
                        if (adapter === void 0) throw new core_AxiosError(`Unknown adapter '${id}'`);
                    }
                    if (adapter) break;
                    rejectedReasons[id || "#" + i] = adapter;
                }
                if (!adapter) {
                    const reasons = Object.entries(rejectedReasons).map((([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")));
                    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
                    throw new core_AxiosError(`There is no suitable adapter to dispatch the request ` + s, "ERR_NOT_SUPPORT");
                }
                return adapter;
            },
            adapters: knownAdapters
        };
        function throwIfCancellationRequested(config) {
            if (config.cancelToken) config.cancelToken.throwIfRequested();
            if (config.signal && config.signal.aborted) throw new cancel_CanceledError(null, config);
        }
        function dispatchRequest(config) {
            throwIfCancellationRequested(config);
            config.headers = core_AxiosHeaders.from(config.headers);
            config.data = transformData.call(config, config.transformRequest);
            if ([ "post", "put", "patch" ].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
            const adapter = adapters.getAdapter(config.adapter || lib_defaults.adapter);
            return adapter(config).then((function onAdapterResolution(response) {
                throwIfCancellationRequested(config);
                response.data = transformData.call(config, config.transformResponse, response);
                response.headers = core_AxiosHeaders.from(response.headers);
                return response;
            }), (function onAdapterRejection(reason) {
                if (!isCancel(reason)) {
                    throwIfCancellationRequested(config);
                    if (reason && reason.response) {
                        reason.response.data = transformData.call(config, config.transformResponse, reason.response);
                        reason.response.headers = core_AxiosHeaders.from(reason.response.headers);
                    }
                }
                return Promise.reject(reason);
            }));
        }
        const VERSION = "1.7.7";
        const validators = {};
        [ "object", "boolean", "number", "function", "string", "symbol" ].forEach(((type, i) => {
            validators[type] = function validator(thing) {
                return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
            };
        }));
        const deprecatedWarnings = {};
        validators.transitional = function transitional(validator, version, message) {
            function formatMessage(opt, desc) {
                return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
            }
            return (value, opt, opts) => {
                if (validator === false) throw new core_AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), core_AxiosError.ERR_DEPRECATED);
                if (version && !deprecatedWarnings[opt]) {
                    deprecatedWarnings[opt] = true;
                    console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
                }
                return validator ? validator(value, opt, opts) : true;
            };
        };
        function assertOptions(options, schema, allowUnknown) {
            if (typeof options !== "object") throw new core_AxiosError("options must be an object", core_AxiosError.ERR_BAD_OPTION_VALUE);
            const keys = Object.keys(options);
            let i = keys.length;
            while (i-- > 0) {
                const opt = keys[i];
                const validator = schema[opt];
                if (validator) {
                    const value = options[opt];
                    const result = value === void 0 || validator(value, opt, options);
                    if (result !== true) throw new core_AxiosError("option " + opt + " must be " + result, core_AxiosError.ERR_BAD_OPTION_VALUE);
                    continue;
                }
                if (allowUnknown !== true) throw new core_AxiosError("Unknown option " + opt, core_AxiosError.ERR_BAD_OPTION);
            }
        }
        const validator = {
            assertOptions,
            validators
        };
        const Axios_validators = validator.validators;
        class Axios {
            constructor(instanceConfig) {
                this.defaults = instanceConfig;
                this.interceptors = {
                    request: new core_InterceptorManager,
                    response: new core_InterceptorManager
                };
            }
            async request(configOrUrl, config) {
                try {
                    return await this._request(configOrUrl, config);
                } catch (err) {
                    if (err instanceof Error) {
                        let dummy;
                        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error;
                        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
                        try {
                            if (!err.stack) err.stack = stack; else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) err.stack += "\n" + stack;
                        } catch (e) {}
                    }
                    throw err;
                }
            }
            _request(configOrUrl, config) {
                if (typeof configOrUrl === "string") {
                    config = config || {};
                    config.url = configOrUrl;
                } else config = configOrUrl || {};
                config = mergeConfig(this.defaults, config);
                const {transitional, paramsSerializer, headers} = config;
                if (transitional !== void 0) validator.assertOptions(transitional, {
                    silentJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
                    forcedJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
                    clarifyTimeoutError: Axios_validators.transitional(Axios_validators.boolean)
                }, false);
                if (paramsSerializer != null) if (utils.isFunction(paramsSerializer)) config.paramsSerializer = {
                    serialize: paramsSerializer
                }; else validator.assertOptions(paramsSerializer, {
                    encode: Axios_validators.function,
                    serialize: Axios_validators.function
                }, true);
                config.method = (config.method || this.defaults.method || "get").toLowerCase();
                let contextHeaders = headers && utils.merge(headers.common, headers[config.method]);
                headers && utils.forEach([ "delete", "get", "head", "post", "put", "patch", "common" ], (method => {
                    delete headers[method];
                }));
                config.headers = core_AxiosHeaders.concat(contextHeaders, headers);
                const requestInterceptorChain = [];
                let synchronousRequestInterceptors = true;
                this.interceptors.request.forEach((function unshiftRequestInterceptors(interceptor) {
                    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
                    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
                    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
                }));
                const responseInterceptorChain = [];
                this.interceptors.response.forEach((function pushResponseInterceptors(interceptor) {
                    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
                }));
                let promise;
                let i = 0;
                let len;
                if (!synchronousRequestInterceptors) {
                    const chain = [ dispatchRequest.bind(this), void 0 ];
                    chain.unshift.apply(chain, requestInterceptorChain);
                    chain.push.apply(chain, responseInterceptorChain);
                    len = chain.length;
                    promise = Promise.resolve(config);
                    while (i < len) promise = promise.then(chain[i++], chain[i++]);
                    return promise;
                }
                len = requestInterceptorChain.length;
                let newConfig = config;
                i = 0;
                while (i < len) {
                    const onFulfilled = requestInterceptorChain[i++];
                    const onRejected = requestInterceptorChain[i++];
                    try {
                        newConfig = onFulfilled(newConfig);
                    } catch (error) {
                        onRejected.call(this, error);
                        break;
                    }
                }
                try {
                    promise = dispatchRequest.call(this, newConfig);
                } catch (error) {
                    return Promise.reject(error);
                }
                i = 0;
                len = responseInterceptorChain.length;
                while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
                return promise;
            }
            getUri(config) {
                config = mergeConfig(this.defaults, config);
                const fullPath = buildFullPath(config.baseURL, config.url);
                return buildURL(fullPath, config.params, config.paramsSerializer);
            }
        }
        utils.forEach([ "delete", "get", "head", "options" ], (function forEachMethodNoData(method) {
            Axios.prototype[method] = function(url, config) {
                return this.request(mergeConfig(config || {}, {
                    method,
                    url,
                    data: (config || {}).data
                }));
            };
        }));
        utils.forEach([ "post", "put", "patch" ], (function forEachMethodWithData(method) {
            function generateHTTPMethod(isForm) {
                return function httpMethod(url, data, config) {
                    return this.request(mergeConfig(config || {}, {
                        method,
                        headers: isForm ? {
                            "Content-Type": "multipart/form-data"
                        } : {},
                        url,
                        data
                    }));
                };
            }
            Axios.prototype[method] = generateHTTPMethod();
            Axios.prototype[method + "Form"] = generateHTTPMethod(true);
        }));
        const core_Axios = Axios;
        class CancelToken {
            constructor(executor) {
                if (typeof executor !== "function") throw new TypeError("executor must be a function.");
                let resolvePromise;
                this.promise = new Promise((function promiseExecutor(resolve) {
                    resolvePromise = resolve;
                }));
                const token = this;
                this.promise.then((cancel => {
                    if (!token._listeners) return;
                    let i = token._listeners.length;
                    while (i-- > 0) token._listeners[i](cancel);
                    token._listeners = null;
                }));
                this.promise.then = onfulfilled => {
                    let _resolve;
                    const promise = new Promise((resolve => {
                        token.subscribe(resolve);
                        _resolve = resolve;
                    })).then(onfulfilled);
                    promise.cancel = function reject() {
                        token.unsubscribe(_resolve);
                    };
                    return promise;
                };
                executor((function cancel(message, config, request) {
                    if (token.reason) return;
                    token.reason = new cancel_CanceledError(message, config, request);
                    resolvePromise(token.reason);
                }));
            }
            throwIfRequested() {
                if (this.reason) throw this.reason;
            }
            subscribe(listener) {
                if (this.reason) {
                    listener(this.reason);
                    return;
                }
                if (this._listeners) this._listeners.push(listener); else this._listeners = [ listener ];
            }
            unsubscribe(listener) {
                if (!this._listeners) return;
                const index = this._listeners.indexOf(listener);
                if (index !== -1) this._listeners.splice(index, 1);
            }
            toAbortSignal() {
                const controller = new AbortController;
                const abort = err => {
                    controller.abort(err);
                };
                this.subscribe(abort);
                controller.signal.unsubscribe = () => this.unsubscribe(abort);
                return controller.signal;
            }
            static source() {
                let cancel;
                const token = new CancelToken((function executor(c) {
                    cancel = c;
                }));
                return {
                    token,
                    cancel
                };
            }
        }
        const cancel_CancelToken = CancelToken;
        function spread(callback) {
            return function wrap(arr) {
                return callback.apply(null, arr);
            };
        }
        function isAxiosError(payload) {
            return utils.isObject(payload) && payload.isAxiosError === true;
        }
        const HttpStatusCode = {
            Continue: 100,
            SwitchingProtocols: 101,
            Processing: 102,
            EarlyHints: 103,
            Ok: 200,
            Created: 201,
            Accepted: 202,
            NonAuthoritativeInformation: 203,
            NoContent: 204,
            ResetContent: 205,
            PartialContent: 206,
            MultiStatus: 207,
            AlreadyReported: 208,
            ImUsed: 226,
            MultipleChoices: 300,
            MovedPermanently: 301,
            Found: 302,
            SeeOther: 303,
            NotModified: 304,
            UseProxy: 305,
            Unused: 306,
            TemporaryRedirect: 307,
            PermanentRedirect: 308,
            BadRequest: 400,
            Unauthorized: 401,
            PaymentRequired: 402,
            Forbidden: 403,
            NotFound: 404,
            MethodNotAllowed: 405,
            NotAcceptable: 406,
            ProxyAuthenticationRequired: 407,
            RequestTimeout: 408,
            Conflict: 409,
            Gone: 410,
            LengthRequired: 411,
            PreconditionFailed: 412,
            PayloadTooLarge: 413,
            UriTooLong: 414,
            UnsupportedMediaType: 415,
            RangeNotSatisfiable: 416,
            ExpectationFailed: 417,
            ImATeapot: 418,
            MisdirectedRequest: 421,
            UnprocessableEntity: 422,
            Locked: 423,
            FailedDependency: 424,
            TooEarly: 425,
            UpgradeRequired: 426,
            PreconditionRequired: 428,
            TooManyRequests: 429,
            RequestHeaderFieldsTooLarge: 431,
            UnavailableForLegalReasons: 451,
            InternalServerError: 500,
            NotImplemented: 501,
            BadGateway: 502,
            ServiceUnavailable: 503,
            GatewayTimeout: 504,
            HttpVersionNotSupported: 505,
            VariantAlsoNegotiates: 506,
            InsufficientStorage: 507,
            LoopDetected: 508,
            NotExtended: 510,
            NetworkAuthenticationRequired: 511
        };
        Object.entries(HttpStatusCode).forEach((([key, value]) => {
            HttpStatusCode[value] = key;
        }));
        const helpers_HttpStatusCode = HttpStatusCode;
        function createInstance(defaultConfig) {
            const context = new core_Axios(defaultConfig);
            const instance = bind(core_Axios.prototype.request, context);
            utils.extend(instance, core_Axios.prototype, context, {
                allOwnKeys: true
            });
            utils.extend(instance, context, null, {
                allOwnKeys: true
            });
            instance.create = function create(instanceConfig) {
                return createInstance(mergeConfig(defaultConfig, instanceConfig));
            };
            return instance;
        }
        const axios = createInstance(lib_defaults);
        axios.Axios = core_Axios;
        axios.CanceledError = cancel_CanceledError;
        axios.CancelToken = cancel_CancelToken;
        axios.isCancel = isCancel;
        axios.VERSION = VERSION;
        axios.toFormData = helpers_toFormData;
        axios.AxiosError = core_AxiosError;
        axios.Cancel = axios.CanceledError;
        axios.all = function all(promises) {
            return Promise.all(promises);
        };
        axios.spread = spread;
        axios.isAxiosError = isAxiosError;
        axios.mergeConfig = mergeConfig;
        axios.AxiosHeaders = core_AxiosHeaders;
        axios.formToJSON = thing => helpers_formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
        axios.getAdapter = adapters.getAdapter;
        axios.HttpStatusCode = helpers_HttpStatusCode;
        axios.default = axios;
        const lib_axios = axios;
        document.addEventListener("DOMContentLoaded", (function() {
            function clientRequest() {
                const clientName = document.querySelector(".input__name").value;
                const clientNumber = parseInt(document.querySelector(".input__number").value);
                if (clientName && clientNumber) console.log("sent data", {
                    name: clientName,
                    number: clientNumber,
                    delivery: 323243
                });
                lib_axios.post("https://jsonplaceholder.typicode.com/todos", {
                    name: clientName,
                    number: clientNumber,
                    delivery: 323243
                }).then((response => {
                    console.log("data send", response.data);
                }));
            }
            const sendRequest = document.getElementById("requestButon");
            if (sendRequest) sendRequest.addEventListener("click", clientRequest);
        }));
        window["FLS"] = true;
        menuInit();
    })();
})();