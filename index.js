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
  if (e === document) return e;
  return document && document.body && document.body.contains(e) ? e : elemError(e);
};

var queryChildren = exports.queryChildren = function queryChildren(e, q) {
  var root = getRoot(e);
  return root ? toArray(root.querySelectorAll(q)) : [];
};

var queryChild = exports.queryChild = function queryChild(e, q) {
  return first(queryChildren(e, q));
};

var query = exports.query = function query(q) {
  return queryChildren(document, q);
};

var queryOne = exports.queryOne = function queryOne(q) {
  return queryChild(document, q);
};
