'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fetchino = function (_Component) {
  _inherits(Fetchino, _Component);

  function Fetchino() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Fetchino);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Fetchino.__proto__ || Object.getPrototypeOf(Fetchino)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading: true,
      error: null,
      data: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Fetchino, [{
    key: 'componentDidMount',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = this.props.url;

                if (!url) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return this.fetch();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref2.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var url, _state, data, error;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = this.props.url;
                _state = this.state, data = _state.data, error = _state.error;

                if (!(!!url && data === null && error === null)) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 5;
                return this.fetch();

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidUpdate() {
        return _ref3.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'fetch',
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(_asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var _props, url, options, response, data;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _props = this.props, url = _props.url, options = _props.options;
              _context3.next = 4;
              return fetch(url, options);

            case 4:
              response = _context3.sent;
              _context3.next = 7;
              return response.json();

            case 7:
              data = _context3.sent;


              this.setState({
                loading: false,
                data: data
              });

              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](0);


              this.setState({
                loading: false,
                error: _context3.t0
              });

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 11]]);
    })))
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          loading = _state2.loading,
          error = _state2.error,
          data = _state2.data;
      var _props2 = this.props,
          render = _props2.render,
          _props2$children = _props2.children,
          children = _props2$children === undefined ? render : _props2$children;


      if (typeof children === 'function') {
        return children({ loading: loading, error: error, data: data });
      }

      return null;
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.url !== prevState.url || nextProps.options !== prevState.options) {

        return {
          data: null,
          error: null,
          loading: true,
          url: nextProps.url,
          options: nextProps.options
        };
      }

      return null;
    }
  }]);

  return Fetchino;
}(_react.Component);

Fetchino.propTypes = {
  url: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.object,
  render: _propTypes2.default.func
};
Fetchino.defaultProps = {
  options: {}
};
exports.default = Fetchino;