// DOM
// Avoid the users of this framework from having to do these manually.
// Wait for the DOM to load, then call these functions.
// IIFE works but is risky for DOM manipulation.

document.addEventListener('DOMContentLoaded', function() {
  button();
  nav();
});
