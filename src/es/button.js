// Button

(function() {
  let buttons = document.querySelectorAll('.btn');

  for (let i = 0, n = buttons.length; i < n; i++) {

    /* See: https://www.w3schools.com/jquery/tryit.asp
     ?filename=tryjquery_event_mouseenter_mouseover */
    buttons[i].addEventListener('mouseenter', unfocus);
    buttons[i].addEventListener('mouseup', unfocus);
    buttons[i].addEventListener('touchend', unfocus);
  }

  function unfocus() {
    this.blur();
  }
})();
