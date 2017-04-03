/*!
 * Carverous 0.0.9 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 CEF
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

// Alert
// Functions
var navmenuDropdowns = document.querySelectorAll('.navmenu li > a:not(:only-child)');

for(var i = 0; i < navmenuDropdowns.length; i++) {
    var toggle = navmenuDropdowns[i];

    toggle.addEventListener('click', function() {
        // this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('hidden');
        console.log('it works!' 1++);
    });
}
// Navicons
// This is how simple it is to toggle in JS! (IE9+)
// It is even possible to toggle using just the checkbox in CSS3! (Maybe next time?)

var navicons = document.querySelectorAll('.navicon');

for(var i = 0; i < navicons.length; i++) {
    var toggle = navicons[i];

    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}