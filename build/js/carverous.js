/*!
 * Carverous 0.1.6 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 Ceferino Jose II
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

'use strict';

// Alert
// Use getAttribute() instead of dataset for IE10+
// Use 'this' instead of the array name

function alertClose() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


  var alerts = document.querySelectorAll('.alert');

  var _loop = function _loop(i, n) {

    alerts[i].addEventListener('click', function (event) {

      if (alerts[i].querySelector('[data-close]')) {

        var closer = alerts[i].querySelector('[data-close]');
        var isCloserClicked = closer.contains(event.target);

        if (isCloserClicked && closer.getAttribute('data-close') === 'alert') {

          alerts[i].style.transition = 'all ' + duration + 's';
          alerts[i].style.opacity = '0';

          setTimeout(function () {
            alerts[i].style.display = 'none';
          }, duration * 1000);
        }
      }
    });
  };

  for (var i = 0, n = alerts.length; i < n; i++) {
    _loop(i, n);
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

function button() {
  var buttons = document.querySelectorAll('.btn');

  for (var i = 0, n = buttons.length; i < n; i++) {

    /* See: https://www.w3schools.com/jquery/tryit.asp
     ?filename=tryjquery_event_mouseenter_mouseover */
    buttons[i].addEventListener('mouseenter', unfocus);
    buttons[i].addEventListener('mouseup', unfocus);
    buttons[i].addEventListener('touchend', unfocus);
  }

  function unfocus() {
    this.blur();
  }
}

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