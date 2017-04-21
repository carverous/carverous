// Navigation
// The entire navigation works in IE10+

function nav() {

  navIcon();

  let navTogglers = document.querySelectorAll('.nav-toggler');
  let navMenus = document.querySelectorAll('.nav-menu');
  let navDropdowns = document.querySelectorAll('.nav-dropdown > a');

  let lg = 767; // Size of the screen - lg

  document.addEventListener('click', function(event) {
    // console.log(event.target); // debugging

    for (let i = 0, n = navTogglers.length; i < n; i++) {

      let navIcon = navTogglers[i].querySelector('.nav-icon');

      let isInsideNavToggler = navTogglers[i].contains(event.target);
      let isInsideNavMenu = navMenus[i].contains(event.target);

      if (!isInsideNavMenu && !isInsideNavToggler) {
        if (navIcon) {
          navIcon.classList.remove('active');
        }
        navMenus[i].classList.remove('active');
      }

      if (isInsideNavToggler) {
        event.preventDefault();
        if (event.target === navTogglers[i] && navIcon) {
          navIcon.classList.toggle('active');
        }
        navMenus[i].classList.toggle('active');
      }
    }

    for (let i = 0, n = navDropdowns.length; i < n; i++) {

      let navDropdown = navDropdowns[i];
      let isInsideNavDropwon = navDropdown.contains(event.target);

      if (isInsideNavDropwon) {
        event.preventDefault();
        navDropdown.parentElement.classList.toggle('active');
      }

      else {
        // document.body.clientWidth
        if (window.innerWidth >= lg) {
          navDropdown.parentElement.classList.remove('active');
        }
      }
    }

  });
}
