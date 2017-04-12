/*!
 * Carverous 0.0.9 (https://github.com/cefjoeii/carverous)
 * Copyright (c) 2017 CEF
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

// Alert
// Functions

var parents = document.querySelectorAll('.navbar-menu > .has-children');


document.addEventListener('click', function(event) {
    if(1) {
        for (var i = 0; i < parents.length; i++) {
            var parent = parents[i];

            parent.classList.remove('active');
        }
    }
});


for (var i = 0; i < parents.length; i++) {
    var parent = parents[i];

    parent.querySelector('a').addEventListener('click', function(event) {
        this.parentElement.classList.add('active');
        event.preventDefault();
        event.stopPropagation();
    })

    parent.onfocus = function(event) {
        this.classList.remove('active');
    };
}
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