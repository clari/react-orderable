module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _Orderable = __webpack_require__(1);

	var _Orderable2 = _interopRequireDefault(_Orderable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Orderable2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _areSetsEqual = __webpack_require__(2);

	var _areSetsEqual2 = _interopRequireDefault(_areSetsEqual);

	var _DraggableItem = __webpack_require__(3);

	var _DraggableItem2 = _interopRequireDefault(_DraggableItem);

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Orderable = function (_React$Component) {
	  _inherits(Orderable, _React$Component);

	  function Orderable(props) {
	    _classCallCheck(this, Orderable);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Orderable).call(this, props));

	    var children = props.children;

	    _this.state = {
	      currentMousePosition: null,
	      draggedId: null,
	      itemIds: _this.getItemIds(children),
	      originalItemPosition: null,
	      startMousePosition: null
	    };

	    _this.handleDragEnd = _this.handleDragEnd.bind(_this);
	    _this.handleDragMove = _this.handleDragMove.bind(_this);
	    _this.handleDragStart = _this.handleDragStart.bind(_this);
	    return _this;
	  }

	  _createClass(Orderable, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.isDragging(this.state)) {
	        var itemIds = new Set(this.getItemIds(this.props.children));
	        var nextItemIds = new Set(this.getItemIds(nextProps.children));
	        (0, _invariant2.default)((0, _areSetsEqual2.default)(itemIds, nextItemIds), 'Cannot change item id set during drag');
	      } else {
	        this.setState({
	          itemIds: this.getItemIds(nextProps.children)
	        });
	      }
	    }
	  }, {
	    key: 'getItemId',
	    value: function getItemId(item) {
	      return item.props.id;
	    }
	  }, {
	    key: 'getItemIds',
	    value: function getItemIds(children) {
	      var _this2 = this;

	      return _react2.default.Children.toArray(children).map(function (item) {
	        return _this2.getItemId(item);
	      });
	    }
	  }, {
	    key: 'getItemIndex',
	    value: function getItemIndex(id) {
	      var itemIds = this.state.itemIds;

	      return itemIds.indexOf(id);
	    }
	  }, {
	    key: 'getItemPositionProperty',
	    value: function getItemPositionProperty() {
	      var horizontal = this.props.horizontal;

	      return horizontal ? 'left' : 'top';
	    }
	  }, {
	    key: 'getItemSizeProperty',
	    value: function getItemSizeProperty() {
	      var horizontal = this.props.horizontal;

	      return horizontal ? 'width' : 'height';
	    }
	  }, {
	    key: 'handleDragEnd',
	    value: function handleDragEnd() {
	      var onChange = this.props.onChange;
	      var itemIds = this.state.itemIds;


	      this.setState({
	        draggedId: null
	      }, function () {
	        onChange(itemIds);
	      });
	    }
	  }, {
	    key: 'handleDragMove',
	    value: function handleDragMove(options) {
	      var itemSize = this.props.itemSize;
	      var _state = this.state;
	      var draggedId = _state.draggedId;
	      var itemIds = _state.itemIds;
	      var originalItemPosition = _state.originalItemPosition;
	      var startMousePosition = _state.startMousePosition;

	      // Compute the dragged item position, constrained by the list bounds

	      var draggedIndex = this.getItemIndex(draggedId);
	      if (options.currentMousePosition !== this.state.currentMousePosition) {
	        // If the dragged item overlaps the previous item, swap the dragged item with the previous
	        // item
	        var newIds = void 0;
	        var itemPosition = originalItemPosition + options.currentMousePosition - startMousePosition;
	        if (draggedIndex !== 0) {
	          var prevIndex = draggedIndex - 1;
	          var prevItemPosition = itemSize * prevIndex;
	          if ((itemPosition - prevItemPosition) / itemSize < 0.5) {
	            newIds = itemIds.slice();
	            newIds[draggedIndex] = itemIds[prevIndex];
	            newIds[prevIndex] = itemIds[draggedIndex];
	          }
	        }

	        // If the dragged item overlaps the next item, swap the dragged item with the next item
	        if (draggedIndex !== itemIds.length - 1) {
	          var nextIndex = draggedIndex + 1;
	          var nextItemPosition = itemSize * nextIndex;
	          if ((nextItemPosition - itemPosition) / itemSize < 0.5) {
	            newIds = itemIds.slice();
	            newIds[draggedIndex] = itemIds[nextIndex];
	            newIds[nextIndex] = itemIds[draggedIndex];
	          }
	        }

	        this.setState(_extends({
	          currentMousePosition: options.currentMousePosition
	        }, newIds ? { itemIds: newIds } : null));
	      }
	    }
	  }, {
	    key: 'handleDragStart',
	    value: function handleDragStart(id, options) {
	      this.setState({
	        currentMousePosition: options.currentMousePosition,
	        draggedId: id,
	        originalItemPosition: options.originalItemPosition,
	        startMousePosition: options.startMousePosition
	      });
	    }
	  }, {
	    key: 'isDragging',
	    value: function isDragging(state) {
	      var draggedId = state.draggedId;

	      return draggedId !== null;
	    }
	  }, {
	    key: 'isDraggedItem',
	    value: function isDraggedItem(id) {
	      var draggedId = this.state.draggedId;

	      return draggedId === id;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this,
	          _extends3;

	      var _props = this.props;
	      var animated = _props.animated;
	      var children = _props.children;
	      var className = _props.className;
	      var ghost = _props.ghost;
	      var horizontal = _props.horizontal;
	      var itemSize = _props.itemSize;
	      var _state2 = this.state;
	      var currentMousePosition = _state2.currentMousePosition;
	      var itemIds = _state2.itemIds;
	      var originalItemPosition = _state2.originalItemPosition;
	      var startMousePosition = _state2.startMousePosition;


	      var childArray = _react2.default.Children.toArray(children);

	      var draggedItem = void 0;
	      var minMousePosition = void 0;
	      var maxMousePosition = void 0;
	      if (this.isDragging(this.state)) {
	        draggedItem = childArray.find(function (item) {
	          return _this3.isDraggedItem(_this3.getItemId(item));
	        });
	        minMousePosition = -(originalItemPosition - startMousePosition);
	        maxMousePosition = minMousePosition + itemSize * (itemIds.length - 1);
	      }

	      return _react2.default.createElement(
	        'div',
	        {
	          className: className,
	          style: _defineProperty({}, this.getItemSizeProperty(), itemSize * _react2.default.Children.count(children))
	        },
	        childArray.map(function (item) {
	          var _extends2;

	          var id = _this3.getItemId(item);
	          var index = _this3.getItemIndex(id);
	          var itemPosition = itemSize * index;
	          return _react2.default.createElement(
	            _DraggableItem2.default,
	            {
	              animated: _this3.isDragging(_this3.state) && animated,
	              dragging: _this3.isDraggedItem(id),
	              ghost: ghost,
	              horizontal: horizontal,
	              itemPosition: itemPosition,
	              key: id,
	              maxMousePosition: maxMousePosition,
	              minMousePosition: minMousePosition,
	              onDragEnd: _this3.handleDragEnd,
	              onDragMove: _this3.handleDragMove,
	              onDragStart: function onDragStart(options) {
	                return _this3.handleDragStart(id, options);
	              }
	            },
	            _react2.default.cloneElement(item, {
	              style: _extends((_extends2 = {}, _defineProperty(_extends2, _this3.getItemSizeProperty(), itemSize), _defineProperty(_extends2, _this3.getItemPositionProperty(), itemPosition), _extends2), item.props.style)
	            })
	          );
	        }),
	        this.isDragging(this.state) && _react2.default.cloneElement(draggedItem, {
	          dragging: true,
	          style: _extends((_extends3 = {}, _defineProperty(_extends3, this.getItemSizeProperty(), itemSize), _defineProperty(_extends3, this.getItemPositionProperty(), originalItemPosition + currentMousePosition - startMousePosition), _extends3), draggedItem.props.style)
	        })
	      );
	    }
	  }]);

	  return Orderable;
	}(_react2.default.Component);

	Orderable.propTypes = {
	  animated: _react2.default.PropTypes.bool,
	  children: _react2.default.PropTypes.node,
	  className: _react2.default.PropTypes.string,
	  ghost: _react2.default.PropTypes.bool,
	  horizontal: _react2.default.PropTypes.bool,
	  itemSize: _react2.default.PropTypes.number.isRequired,
	  onChange: _react2.default.PropTypes.func.isRequired
	};
	exports.default = Orderable;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = areSetsEqual;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function areSetsEqual(set1, set2) {
	  if (set1.size !== set2.size) {
	    return false;
	  }

	  var union = new Set([].concat(_toConsumableArray(set1), _toConsumableArray(set2)));
	  return union.size === set1.size;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _lodash = __webpack_require__(4);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(6);

	var _react2 = _interopRequireDefault(_react);

	var _DraggableItem = __webpack_require__(7);

	var _DraggableItem2 = _interopRequireDefault(_DraggableItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DraggableItem = function (_React$Component) {
	  _inherits(DraggableItem, _React$Component);

	  function DraggableItem(props) {
	    _classCallCheck(this, DraggableItem);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DraggableItem).call(this, props));

	    _this.state = {
	      touchIdentifier: null
	    };

	    _this.handleDragEnd = _this.handleDragEnd.bind(_this);
	    _this.handleDragMove = _this.handleDragMove.bind(_this);
	    _this.handleDragStart = _this.handleDragStart.bind(_this);
	    return _this;
	  }

	  _createClass(DraggableItem, [{
	    key: 'addListeners',
	    value: function addListeners() {
	      if (this.isTouch()) {
	        document.addEventListener('touchmove', this.handleDragMove);
	        document.addEventListener('touchend', this.handleDragEnd);
	      } else {
	        document.addEventListener('mousemove', this.handleDragMove);
	        document.addEventListener('mouseup', this.handleDragEnd);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      // Clean up global event listeners if we unmount in the middle of a drag
	      this.removeListeners();
	    }
	  }, {
	    key: 'getMousePosition',
	    value: function getMousePosition(e) {
	      var horizontal = this.props.horizontal;

	      var position = e.targetTouches ? e.targetTouches[0] : e;
	      return horizontal ? position.clientX : position.clientY;
	    }
	  }, {
	    key: 'getTouchIdentifier',
	    value: function getTouchIdentifier(e) {
	      return e.targetTouches ? e.targetTouches[0].identifier : null;
	    }
	  }, {
	    key: 'handleDragEnd',
	    value: function handleDragEnd(e) {
	      var onDragEnd = this.props.onDragEnd;


	      var touchIdentifier = e.changedTouches ? e.changedTouches[0].identifier : null;
	      if (!this.isCurrentTouch(touchIdentifier)) {
	        return;
	      }

	      onDragEnd();

	      this.removeListeners();
	    }
	  }, {
	    key: 'handleDragMove',
	    value: function handleDragMove(e) {
	      var _props = this.props;
	      var maxMousePosition = _props.maxMousePosition;
	      var minMousePosition = _props.minMousePosition;
	      var onDragMove = _props.onDragMove;


	      if (!this.isCurrentTouch(this.getTouchIdentifier(e))) {
	        return;
	      }

	      var currentMousePosition = (0, _lodash2.default)(this.getMousePosition(e), minMousePosition, maxMousePosition);

	      onDragMove({
	        currentMousePosition: currentMousePosition
	      });
	    }
	  }, {
	    key: 'handleDragStart',
	    value: function handleDragStart(e) {
	      var _this2 = this;

	      var _props2 = this.props;
	      var itemPosition = _props2.itemPosition;
	      var onDragStart = _props2.onDragStart;


	      e.preventDefault(); // Prevent selection

	      var currentMousePosition = this.getMousePosition(e);
	      this.setState({
	        touchIdentifier: this.getTouchIdentifier(e)
	      }, function () {
	        onDragStart({
	          currentMousePosition: currentMousePosition,
	          // The dragged item's position is relative to its original position, not to the position
	          // computed by its current index
	          originalItemPosition: itemPosition,
	          startMousePosition: currentMousePosition
	        });

	        _this2.addListeners();
	      });
	    }
	  }, {
	    key: 'isCurrentTouch',
	    value: function isCurrentTouch(touchIdentifier) {
	      return this.state.touchIdentifier === touchIdentifier;
	    }
	  }, {
	    key: 'isTouch',
	    value: function isTouch() {
	      var touchIdentifier = this.state.touchIdentifier;

	      return touchIdentifier !== null;
	    }
	  }, {
	    key: 'removeListeners',
	    value: function removeListeners() {
	      if (this.isTouch()) {
	        document.removeEventListener('touchmove', this.handleDragMove);
	        document.removeEventListener('touchend', this.handleDragEnd);
	      } else {
	        document.removeEventListener('mousemove', this.handleDragMove);
	        document.removeEventListener('mouseup', this.handleDragEnd);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props3 = this.props;
	      var animated = _props3.animated;
	      var item = _props3.children;
	      var className = _props3.className;
	      var dragging = _props3.dragging;
	      var ghost = _props3.ghost;
	      var horizontal = _props3.horizontal;


	      return _react2.default.cloneElement(item, {
	        className: (0, _classnames2.default)(_DraggableItem2.default.item, horizontal && _DraggableItem2.default['item--horizontal'], animated && _DraggableItem2.default['item--animated'],
	        // Default ghost style
	        // Even if we don't render the ghost item, we need to keep it around for the drag event
	        // handlers.
	        !ghost && dragging && _DraggableItem2.default['item--ghost'], item.props.className, className),
	        ghost: ghost && dragging,
	        onDragStart: this.handleDragStart
	      });
	    }
	  }]);

	  return DraggableItem;
	}(_react2.default.Component);

	DraggableItem.propTypes = {
	  animated: _react2.default.PropTypes.bool,
	  children: _react2.default.PropTypes.node,
	  className: _react2.default.PropTypes.string,
	  dragging: _react2.default.PropTypes.bool,
	  ghost: _react2.default.PropTypes.bool,
	  horizontal: _react2.default.PropTypes.bool,
	  itemPosition: _react2.default.PropTypes.number.isRequired,
	  maxMousePosition: _react2.default.PropTypes.number,
	  minMousePosition: _react2.default.PropTypes.number,
	  onDragEnd: _react2.default.PropTypes.func.isRequired,
	  onDragMove: _react2.default.PropTypes.func.isRequired,
	  onDragStart: _react2.default.PropTypes.func.isRequired
	};
	exports.default = DraggableItem;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * lodash 4.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
	 *
	 * @private
	 * @param {number} number The number to clamp.
	 * @param {number} [lower] The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the clamped number.
	 */
	function baseClamp(number, lower, upper) {
	  if (number === number) {
	    if (upper !== undefined) {
	      number = number <= upper ? number : upper;
	    }
	    if (lower !== undefined) {
	      number = number >= lower ? number : lower;
	    }
	  }
	  return number;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	/**
	 * Clamps `number` within the inclusive `lower` and `upper` bounds.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Number
	 * @param {number} number The number to clamp.
	 * @param {number} [lower] The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the clamped number.
	 * @example
	 *
	 * _.clamp(-10, -5, 5);
	 * // => -5
	 *
	 * _.clamp(10, -5, 5);
	 * // => 5
	 */
	function clamp(number, lower, upper) {
	  if (upper === undefined) {
	    upper = lower;
	    lower = undefined;
	  }
	  if (upper !== undefined) {
	    upper = toNumber(upper);
	    upper = upper === upper ? upper : 0;
	  }
	  if (lower !== undefined) {
	    lower = toNumber(lower);
	    lower = lower === lower ? lower : 0;
	  }
	  return baseClamp(toNumber(number), lower, upper);
	}

	module.exports = clamp;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"item":"react-orderable-DraggableItem-item","item--ghost":"react-orderable-DraggableItem-item--ghost","item--horizontal":"react-orderable-DraggableItem-item--horizontal","item--animated":"react-orderable-DraggableItem-item--animated"};

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	module.exports = require("invariant");

/***/ }
/******/ ]);