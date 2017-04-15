/*!
 * Carverous 0.1.0 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 Ceferino Jose II
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

'use strict';

// Alert

// Functions

// Navbar

// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3! (Maybe next time?)

var navicons = document.querySelectorAll('.navicon');

for (var i = 0; i < navicons.length; i++) {
  var navicon = navicons[i];

  navicon.addEventListener('click', function () {
    this.classList.toggle('active');
  });
}