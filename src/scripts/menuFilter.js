;
(function () {
  let menuSection = document.querySelector('.menu');

  if (menuSection === null) {
    return;
  }

  let removeChildren = function (item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  };

  let updateChildren = function (item, children) {
    removeChildren(item);
    for (let i = 0; i < children.length; i += 1) {
      item.append(children[i]);
    }
  };

  let menu = menuSection.querySelector('.menu__cards');
  let menuNav = menuSection.querySelector('.menu__nav');
  let menuItems = menuSection.querySelectorAll('.menu__card');

  menuNav.addEventListener('click', (e) => {
    let target = e.target;

    let item = myLib.closestItemByClass(target, 'menu__item--button');

    if (item === null || item.classList.contains('active')) {
      return;
    }

    e.preventDefault();
    let filterValue = item.getAttribute('data-filter');
    let previousBtnActive = menuNav.querySelector('.menu__item--button.active');

    previousBtnActive.classList.remove('active');
    item.classList.add('active');

    if (filterValue === 'all') {
      updateChildren(menu, menuItems);
      return;
    }

    let filteredItems = [];
    for (let i = 0; i < menuItems.length; i += 1) {
      let current = menuItems[i];
      if (current.getAttribute('data-category') === filterValue) {
        filteredItems.push(current);
      }
    }

    updateChildren(menu, filteredItems);

  });
})();