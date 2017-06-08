// Button
// Remove the ugly outlines around the buttons automatically.

function button() {
  let btns = document.querySelectorAll('.btn');

  for (let i = 0, n = btns.length; i < n; i++) {

    /* See: https://www.w3schools.com/jquery/tryit.asp
    ?filename=tryjquery_event_mouseenter_mouseover */

    btns[i].addEventListener('mouseenter', unfocus);
    btns[i].addEventListener('mouseup', unfocus);
    btns[i].addEventListener('touchend', unfocus);
  }

  function unfocus() {
    this.blur();
  }
}
