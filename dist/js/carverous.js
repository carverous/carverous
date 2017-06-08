/*!
 * Carverous 0.5.5 (https://github.com/carverous/carverous-framework)
 * Copyright (c) 2017 Ceferino C. Jose II
 * Licensed under MIT (https://github.com/carverous/carverous-framework/blob/master/LICENSE)
 */

'use strict';

// Alert
// Allow the users of this framework need to invoke these functions explicitly.
// Use getAttribute('data-close') instead of dataset.close for it to work in IE10+.

function alertHide() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


  var alerts = document.querySelectorAll('.alert');

  for (var i = 0, n = alerts.length; i < n; i++) {

    alerts[i].addEventListener('click', function (event) {
      var _this = this;

      if (this.querySelector('[data-close]')) {

        var closer = this.querySelector('[data-close]');
        var isCloserClicked = closer.contains(event.target);

        if (isCloserClicked && closer.getAttribute('data-close') === 'alert') {

          this.style.transition = 'all ' + duration + 's';
          this.style.opacity = '0';

          setTimeout(function () {
            _this.style.display = 'none';
          }, duration * 1000);
        }
      }
    });
  }
}

function alertShow(el) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


  el.style.transition = 'all ' + duration + 's';
  el.style.opacity = '0';
  el.style.display = 'block';

  setTimeout(function () {
    el.style.opacity = '1';
  }, 250);
}

// Button
// Remove the ugly outlines around the buttons automatically.

function button() {
  var btns = document.querySelectorAll('.btn');

  for (var i = 0, n = btns.length; i < n; i++) {

    /* See: https://www.w3schools.com/jquery/tryit.asp
    ?filename=tryjquery_event_mouseenter_mouseover */

    btns[i].addEventListener('mouseenter', unfocus);
    btns[i].addEventListener('mouseup', unfocus);
    btns[i].addEventListener('touchend', unfocus);
  }

  function unfocus() {
    this.blur();
  }
}

// Navigation Icon
// Animate the hamburger-looking icons.

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
// The entire navigation works in IE10+.

function nav() {

  navIcon();

  var navTogglers = document.querySelectorAll('.nav-toggler');
  var navMenus = document.querySelectorAll('.nav-menu');
  var navDropdowns = document.querySelectorAll('.nav-dropdown > a');

  var lg = 767; // Size of the screen - lg

  document.addEventListener('click', function (event) {
    // console.log(event.target); // debug

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

// Pagination
// Make the pagination items dynamically listed.
// Experimental. Inactive at the moment.

function pagination() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;


  var paginations = document.querySelectorAll('.pagination');

  for (var i = 0, n = paginations.length; i < n; i++) {

    var pageItems = paginations[i].querySelectorAll('.page-item');

    if (pageItems.length - 2 >= max) {
      for (var j = 0, m = pageItems.length; j < m; j++) {

        if (pageItems[j].classList.contains('active') || j === 0 || j === m - 1) {
          continue;
          //console.log(pageItems[j]);
        }
        //createEllipsis(pageItems[j]);
        pageItems[j].style.display = 'none';
      }
    }
  }

  function createEllipsis(el) {
    var ellipsisA = document.createElement('a');
    ellipsisA.href = '#';
    ellipsisA.innerHTML = 'of';
    ellipsisA.classList.add('page-link');

    var ellipsisLI = document.createElement('li');
    ellipsisLI.classList.add('page-item');
    ellipsisLI.classList.add('disabled');

    ellipsisLI.appendChild(ellipsisA);

    el.parentNode.insertBefore(ellipsisLI, el.nextElementSibling);
  }
}

// DOM
// Avoid the users of this framework from having to do these manually.
// Wait for the DOM to load, then call these functions.
// IIFE works but is risky for DOM manipulation.

document.addEventListener('DOMContentLoaded', function () {
  button();
  nav();
});