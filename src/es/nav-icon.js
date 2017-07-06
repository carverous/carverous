// Navigation Icon
// Animate the hamburger-looking icons.

function navIcon() {

  let navIcons = document.querySelectorAll('.nav-icon');

  document.addEventListener('click', function (event) {

    for (let i = 0, n = navIcons.length; i < n; i++) {

      let isInsideNavIcon = navIcons[i].contains(event.target);

      if (isInsideNavIcon) {
        navIcons[i].classList.toggle('active');
      }
    }
  });
}
