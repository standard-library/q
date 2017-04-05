"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var toArray = function toArray(list) {
  return [].concat(_toConsumableArray(list));
};

var first = function first(xs) {
  return xs[0];
};

var elemError = function elemError(e) {
  throw new Error("\"" + String(e) + "\" does't exist in the document");
};

var getRoot = function getRoot(e) {
  return !e ? document : document && document.body && document.body.contains(e) ? e : elemError(e);
};

var query = exports.query = function query(q, e) {
  var root = getRoot(e);
  return root ? toArray(root.querySelectorAll(q)) : [];
};

var queryOne = exports.queryOne = function queryOne(q, e) {
  return first(query(q, e));
};
