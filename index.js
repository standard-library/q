"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var toArray = function toArray(list) {
  return [].slice.call(list);
};

// workaround for strip-types issue with arrow functions and generics


var car = function car(xs) {
  return xs[0];
};

var elemError = function elemError(e) {
  throw new Error("\"" + e.toString() + "\" does't exist in the document");
};

var getRoot = function getRoot(e) {
  if (e === document) return e;
  return document.body.contains(e) ? e : elemError(e);
};

var queryChildren = exports.queryChildren = function queryChildren(e, q) {
  var root = getRoot(e);
  return toArray(root.querySelectorAll(q));
};

var queryChild = exports.queryChild = function queryChild(e, q) {
  return car(queryChildren(e, q));
};

var query = exports.query = function query(q) {
  return queryChildren(document, q);
};

var queryOne = exports.queryOne = function queryOne(q) {
  return queryChild(document, q);
};
