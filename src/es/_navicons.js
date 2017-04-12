// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3! (Maybe next time?)

var navicons = document.querySelectorAll('.navicon');

for(var i = 0; i < navicons.length; i++) {
    var navicon = navicons[i];

    navicon.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}