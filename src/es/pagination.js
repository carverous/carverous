// Pagination
// Experimental
// Inactive at the moment

function pagination(max = 4) {

  let paginations = document.querySelectorAll('.pagination');

  for (let i = 0, n = paginations.length; i < n; i++) {
    
    let pageItems = paginations[i].querySelectorAll('.page-item');
    
    if (pageItems.length - 2 >= max) {
      for (let j = 0, m = pageItems.length; j < m; j++) {

        if (pageItems[j].classList.contains('active') || j === 0 || j === m-1) {
          continue;
          //console.log(pageItems[j]);
        }
        //createEllipsis(pageItems[j]);
        pageItems[j].style.display = 'none';

      }
    }
  }

  function createEllipsis(el) {
    let ellipsisA = document.createElement('a');
    ellipsisA.href = '#';
    ellipsisA.innerHTML = 'of';
    ellipsisA.classList.add('page-link');

    let ellipsisLI = document.createElement('li');
    ellipsisLI.classList.add('page-item');
    ellipsisLI.classList.add('disabled');

    ellipsisLI.appendChild(ellipsisA);

    el.parentNode.insertBefore(ellipsisLI, el.nextElementSibling);
  }
}
