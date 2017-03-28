/*!
 * Carverous 0.0.8 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 CEF
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

// Alert
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