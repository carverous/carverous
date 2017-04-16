// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3! (Maybe next time?)

let navIcons = document.querySelectorAll('.nav-icon');

for (let i = 0; i < navIcons.length; i++) {
  let navIcon = navIcons[i];

  navIcon.addEventListener('click', function() {
    this.classList.toggle('active');
  });
}
