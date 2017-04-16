// Nav
// IE10+ for the toggle

let navDropdowns = document.querySelectorAll('.nav-dropdown > a');

document.addEventListener('click', function(event) {
  // console.log(event.target);

  for (let i = 0; i < navDropdowns.length; i++) {

    let navDropdown = navDropdowns[i];

    if(event.target === navDropdown) {
      event.preventDefault();
      navDropdown.parentElement.classList.toggle('active');
    }

    else {
      navDropdown.parentElement.classList.remove('active');
    }
  }

});
