// DOM
// Wait for the DOM to load, then call these functions.
// IIFE works but might be risky for DOM manipulation.
// Avoid the users of this framework from having to do these manually.

document.addEventListener('DOMContentLoaded', function() {
  button();
  nav();
});
