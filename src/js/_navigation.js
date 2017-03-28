// Navigation Toggler

var navIcon = document.querySelectorAll('.nav-icon');
for(var i = 0; i < navIcon.length; i++) {
    var toggle = navIcon[i];
    toggleSwitch(toggle);
}

function toggleSwitch(toggle) {
    toggle.addEventListener('click', function () {
        if(this.classList.contains('active')) {
            this.classList.remove('active');
        }
        else {
            this.classList.add('active');
        }
    })
}