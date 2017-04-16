/*!
 * Carverous 0.1.0 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 Ceferino Jose II
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

'use strict';

// Alert

// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3! (Maybe next time?)

var navIcons = document.querySelectorAll('.nav-icon');

for (var i = 0; i < navIcons.length; i++) {
  var navIcon = navIcons[i];

  navIcon.addEventListener('click', function () {
    this.classList.toggle('active');
  });
}

// Nav
// IE10+ for the toggle

var navDropdowns = document.querySelectorAll('.nav-dropdown > a');

document.addEventListener('click', function (event) {
  // console.log(event.target);

  for (var _i = 0; _i < navDropdowns.length; _i++) {

    var navDropdown = navDropdowns[_i];

    if (event.target === navDropdown) {
      event.preventDefault();
      navDropdown.parentElement.classList.toggle('active');
    } else {
      navDropdown.parentElement.classList.remove('active');
    }
  }
});