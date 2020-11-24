import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

function toTitleCase(str) {
  return str
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
    .replace(" ", "");
}

function toCamelCase(str) {
  str = str.replace("-", " ");
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
}

function generateCodeFromObject(obj) {
  let str = "<";
  str += toTitleCase(obj.name) + " ";
  if (obj.style !== undefined && Object.keys(obj.style).length > 0) {
    var stypeKeys = Object.keys(obj.style);
    str += "style={{";
    for (var i = 0; i < stypeKeys.length; i++) {
      str += toCamelCase(stypeKeys[i]) + ':"' + obj.style[stypeKeys[i]] + '",';
    }
    str = str.substr(0, str.length - 1) + "}}";
  }

  if (obj.children !== undefined && obj.children.length > 0) {
    str += ">\n";
    for (var i = 0; i < obj.children.length; i++) {
      str += generateCodeFromObject(obj.children[i]);
    }
    str += "</" + toTitleCase(obj.name) + ">";
  } else {
    str += "/>";
  }

  return str;
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
