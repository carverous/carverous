var navmenuDropdowns = document.querySelectorAll('.navmenu li > a:not(:only-child)');

for(var i = 0; i < navmenuDropdowns.length; i++) {
    var toggle = navmenuDropdowns[i];

    toggle.addEventListener('click', function() {
        // this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('hidden');
        console.log('It works!');
    });
}