// Navbar

let navDropdowns = document.querySelectorAll('.navbar-menu > .has-children > a');

document.addEventListener('click', function(event) {
  // console.log(event.target);

  for (let i = 0; i < navDropdowns.length; i++) {

    let navDropdown = navDropdowns[i];

    if(event.target === navDropdown) {
      navDropdown.parentElement.classList.toggle('active');
    }
    else {
      navDropdown.parentElement.classList.remove('active');
    }
  }

});


