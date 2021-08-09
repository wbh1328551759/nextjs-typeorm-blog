"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateComments1628526253271 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeorm = require("typeorm");

var CreateComments1628526253271 = /*#__PURE__*/function () {
  function CreateComments1628526253271() {
    (0, _classCallCheck2["default"])(this, CreateComments1628526253271);
  }

  (0, _createClass2["default"])(CreateComments1628526253271, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.createTable(new _typeorm.Table({
                  name: 'comments',
                  columns: [{
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: 'increment'
                  }, {
                    name: 'user_id',
                    type: 'int'
                  }, {
                    name: 'post_id',
                    type: 'int'
                  }, {
                    name: 'content',
                    type: 'text'
                  }]
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function up(_x) {
        return _up.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return queryRunner.dropTable('comments');

              case 3:
                _context2.next = 7;
                break;

              case 5:
                _context2.prev = 5;
                _context2.t0 = _context2["catch"](0);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 5]]);
      }));

      function down(_x2) {
        return _down.apply(this, arguments);
      }

      return down;
    }()
  }]);
  return CreateComments1628526253271;
}();

exports.CreateComments1628526253271 = CreateComments1628526253271;