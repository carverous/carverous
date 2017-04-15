// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3! (Maybe next time?)

let navicons = document.querySelectorAll('.navicon');

for (let i = 0; i < navicons.length; i++) {
  let navicon = navicons[i];

  navicon.addEventListener('click', function() {
    this.classList.toggle('active');
  });
}
