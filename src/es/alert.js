// Alert
// Use getAttribute() instead of dataset for IE10+

function alertClose(duration = 0) {

  let alerts = document.querySelectorAll('.alert');

  for (let i = 0, n = alerts.length; i < n; i++) {

    alerts[i].addEventListener('click', function(event) {

      if (alerts[i].querySelector('[data-close]')) {

        let closer = alerts[i].querySelector('[data-close]');
        let isCloserClicked = closer.contains(event.target);

        if (isCloserClicked && closer.getAttribute('data-close') === 'alert') {

          alerts[i].style.transition = 'all ' + duration + 's';
          alerts[i].style.opacity = '0';

          setTimeout(function() {
            alerts[i].style.display = 'none';
          }, duration * 1000);
        }
      }
    });
  }
}

function alertShow(el, duration = 0) {

  el.style.transition = 'all ' + duration + 's';
  el.style.opacity = '0';
  el.style.display = 'block';

  setTimeout(function() {
    el.style.opacity = '1';
  }, 250);
}
