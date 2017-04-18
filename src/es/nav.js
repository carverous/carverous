// Navigation
// The entire navigation works in IE10+

function nav() {

  navIcon();

  let navTogglers = document.querySelectorAll('.nav-toggler');
  let navMenus = document.querySelectorAll('.nav-menu');
  let navDropdowns = document.querySelectorAll('.nav-dropdown > a');

  let lg = 768;

  document.addEventListener('click', function(event) {
    // console.log(event.target);

    for (let i = 0, n = navTogglers.length; i < n; i++) {

      let navIcon = navTogglers[i].querySelector('.nav-icon');

      let isInsideNavToggler = navTogglers[i].contains(event.target);
      let isInsideNavMenu = navMenus[i].contains(event.target);


      if (!isInsideNavMenu && !isInsideNavToggler) {
        if (navIcon) navIcon.classList.remove('active');
        navMenus[i].classList.remove('active');
      }

      if (isInsideNavToggler) {
        navMenus[i].classList.toggle('active');
      }

    }

    for (let i = 0, n = navDropdowns.length; i < n; i++) {

      let navDropdown = navDropdowns[i];

      if (event.target === navDropdown) {
        event.preventDefault();
        navDropdown.parentElement.classList.toggle('active');
      }

      else {
        if (document.body.clientWidth >= lg) {
          navDropdown.parentElement.classList.remove('active');
        }
      }
    }

  });

}
