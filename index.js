"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toArray = function toArray(list) {
  return [].slice.call(list);
};

var elemError = function elemError(e) {
  throw new Error("\"" + e + "\" does't exist in the document");
};

var getRoot = function getRoot(e) {
  if (!e) return document;
  return document.body.contains(e) ? e : elemError(e);
};

var car = function car(xs) {
  return xs[0];
};

var query = exports.query = function query(q, e) {
  var root = getRoot(e);
  return toArray(root.querySelectorAll(q));
};

var queryOne = exports.queryOne = function queryOne(q, e) {
  return car(query(q, e));
};
