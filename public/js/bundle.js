(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'
/*eslint-env browser */

module.exports = {
  /**
   * Create a <style>...</style> tag and add it to the document head
   * @param {string} cssText
   * @param {object?} options
   * @return {Element}
   */
  createStyle: function (cssText, options) {
    var container = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style')
    options = options || {}
    style.type = 'text/css'
    if (options.href) {
      style.setAttribute('data-href', options.href)
    }
    if (style.sheet) { // for jsdom and IE9+
      style.innerHTML = cssText
      style.sheet.cssText = cssText
    }
    else if (style.styleSheet) { // for IE8 and below
      style.styleSheet.cssText = cssText
    }
    else { // for Chrome, Firefox, and Safari
      style.appendChild(document.createTextNode(cssText))
    }
    if (options.prepend) {
      container.insertBefore(style, container.childNodes[0]);
    } else {
      container.appendChild(style);
    }
    return style
  }
}

},{}],2:[function(require,module,exports){
require('./styles.scss');

module.exports = collection => {
  // main selectors
  this.selector = document.querySelector('[data-omnisearch]');
  this.searchInput = document.createElement("input");
  this.searchResults = document.createElement("ul");
  this.reset = document.createElement("a");

  this.state = {
    results: [],
    value: ""
  };

  const updateSearch = value => {
    return this.state.value = value;
  };

  const filterResults = value => {
    return collection.filter(v => v.includes(value));
  }

  const updateResults = results => {
    return this.state.results = results;
  };

  const resetSearch = () => {
    this.state.value = "";
    this.state.results = []
    this.searchResults.innerHTML = "";
    this.searchInput.value = "";
    this.reset.parentNode.removeChild(this.reset);
    this.searchInput.focus();
  };

  this.searchInput.placeholder = "Search...";

  this.reset.innerHTML = "Reset";
  this.reset.addEventListener("click", resetSearch);

  this.searchInput.addEventListener("keyup", e => {
    const results = updateResults(filterResults(updateSearch(e.target.value)));

    if (this.state.results.length > 0 && this.searchInput.value.length >= 1) {
      this.searchResults.innerHTML = this.state.results.slice(0, 5).map(result => {
        return `<li>${result}</li>`;
      }).join("");
      this.selector.append(this.searchResults);
      this.selector.append(this.reset);
    } else {
      this.searchResults.innerHTML = "";
      this.reset.parentNode.removeChild(this.reset);
    }
  });

  this.selector.append(this.searchInput);
};

},{"./styles.scss":3}],3:[function(require,module,exports){
var css = "[data-omnisearch]{position:fixed;top:1rem;right:1rem;text-align:center;width:15rem}[data-omnisearch] input{border:1px solid #eee;border-radius:5px;color:#75b5aa;font-size:1rem;font-weight:500;outline:0;padding:.5rem;width:100%}[data-omnisearch] input::placeholder{color:#75b5aa}[data-omnisearch] ul{background:#fff;border-radius:5px;box-shadow:0 2px 1px 0 #eee;list-style:none;margin:.5rem 0;padding-left:0}[data-omnisearch] ul li{color:#75b5aa;cursor:pointer;padding:.5rem 0}[data-omnisearch] ul li:hover{background:#75b5aa;color:#fff}[data-omnisearch] a{cursor:pointer;font-size:14px;width:100%}\n"
module.exports = require('scssify').createStyle(css, {})
},{"scssify":1}],4:[function(require,module,exports){
module.exports = {
  el: document.querySelector('.sidebar'),
  init: function() {
    const profileImg = document.createElement("img");
    this.addProfileImage(profileImg);
  },
  imageTilt: "right",
  addProfileImage: function (img) {
    img.setAttribute("src", "https://avatars3.githubusercontent.com/u/1900735?s=460&v=4")
    img.setAttribute("style", `
      border-radius: 50%;
      box-shadow: 0 0 1rem #333;
      right: 2rem;
      position: absolute;
      top: 18rem;
      transition: all 500ms ease-in-out;
      transform: rotateZ(-15deg);
      width: 4rem;
    `);

    let self = this;

    img.addEventListener("mouseenter", function(e) {
      if (self.imageTilt === "right") {
        e.target.style.transform = "rotateZ(15deg)";
        self.imageTilt = "left";
      } else {
        e.target.style.transform = "rotateZ(-360deg)";
        self.imageTilt = "right"
      }
    });

    this.el.append(img)
  }
};

},{}],5:[function(require,module,exports){
const sidenav = require('./sidenav');
const omnisearch = require('./components/omnisearch');

document.addEventListener("DOMContentLoaded", function() {
  sidenav.init();
  omnisearch(["hello", "josh", "byo", "animalo", "orange", "banoana", "grapo"]);
});

},{"./components/omnisearch":2,"./sidenav":4}]},{},[5]);
