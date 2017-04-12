
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