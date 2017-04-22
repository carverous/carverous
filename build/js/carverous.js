/*!
 * Carverous 0.1.5 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 Ceferino Jose II
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

'use strict';

// Alert

// Button

// Navigation Icons

function navIcon() {

  var navIcons = document.querySelectorAll('.nav-icon');

  document.addEventListener('click', function (event) {

    for (var i = 0, n = navIcons.length; i < n; i++) {

      var isInsideNavIcon = navIcons[i].contains(event.target);

      if (isInsideNavIcon) {
        navIcons[i].classList.toggle('active');
      }
    }
  });
}

// Navigation
// The entire navigation works in IE10+

function nav() {

  navIcon();

  var navTogglers = document.querySelectorAll('.nav-toggler');
  var navMenus = document.querySelectorAll('.nav-menu');
  var navDropdowns = document.querySelectorAll('.nav-dropdown > a');

  var lg = 767; // Size of the screen - lg

  document.addEventListener('click', function (event) {
    // console.log(event.target); // debugging

    for (var i = 0, n = navTogglers.length; i < n; i++) {

      var _navIcon = navTogglers[i].querySelector('.nav-icon');

      var isInsideNavToggler = navTogglers[i].contains(event.target);
      var isInsideNavMenu = navMenus[i].contains(event.target);

      if (!isInsideNavMenu && !isInsideNavToggler) {
        if (_navIcon) {
          _navIcon.classList.remove('active');
        }
        navMenus[i].classList.remove('active');
      }

      if (isInsideNavToggler) {
        event.preventDefault();
        if (event.target === navTogglers[i] && _navIcon) {
          _navIcon.classList.toggle('active');
        }
        navMenus[i].classList.toggle('active');
      }
    }

    for (var _i = 0, _n = navDropdowns.length; _i < _n; _i++) {

      var navDropdown = navDropdowns[_i];
      var isInsideNavDropwon = navDropdown.contains(event.target);

      if (isInsideNavDropwon) {
        event.preventDefault();
        navDropdown.parentElement.classList.toggle('active');
      } else {
        // document.body.clientWidth
        if (window.innerWidth >= lg) {
          navDropdown.parentElement.classList.remove('active');
        }
      }
    }
  });
}