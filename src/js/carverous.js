/*!
 * Carverous 0.0.9 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 CEF
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

// Alert
// Functions
// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3!

var navicons = document.querySelectorAll('.navicon');

for(var i = 0; i < navicons.length; i++) {
    var toggle = navicons[i];

    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}



/**
 * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
 *
 * @private
 * @author Todd Motto
 * @link https://github.com/toddmotto/foreach
 * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
 * @callback requestCallback      callback   - Callback function for each iteration.
 * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
 * @returns {}
 */
/*var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};

 var navicons = document.querySelectorAll(".navicon");
 if (navicons.length > 0) {
 forEach(navicons, function(navicon) {
 navicon.addEventListener("click", function() {
 this.classList.toggle("active");
 }, false);
 });
 }*/