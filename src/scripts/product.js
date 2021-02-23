;
(function () {

  let menu = document.querySelector('.menu__cards');

  if (menu === null) {
    return;
  }

  let updateProductPrice = function(product, price) {
    let productPrice = product.querySelector('.menu__price--value');
    productPrice.textContent = price;

  }
  let changeProductSize = function(target) {

    let product = myLib.closestItemByClass(target, 'catalog');
    let previousBtnActive = product.querySelector('.menu__card--button.active');
    let newPrice = target.getAttribute('data-product-size-price');

    previousBtnActive.classList.remove('active');
    target.classList.add('active');
    updateProductPrice(product, newPrice);
  };

  let changeProductOrderInfo = function (target) {
    let product = myLib.closestItemByClass(target, 'catalog');
    let order = document.querySelector('.popup__order');

    let productTitle = product.querySelector('.menu__card--title').textContent;

    let productSize = product.querySelector('.menu__card--button.active').textContent;
    let productPrice = product.querySelector('.menu__price--value').textContent;
    let productImgSrc = product.querySelector('.menu__img').getAttribute('src');

    order.querySelector('.order-info-title').setAttribute('value', productTitle);
    order.querySelector('.order-info-size').setAttribute('value', productSize);
    order.querySelector('.order-info-price').setAttribute('value', productPrice);

    order.querySelector('.popup__data--name').textContent = productTitle;
    order.querySelector('.popup__data--price').textContent = productPrice;
    order.querySelector('.popup__size').textContent = productSize;
    order.querySelector('.popup__img').setAttribute('src', productImgSrc);
  };

  menu.addEventListener('click', (e) => {
    let target = e.target;

    if (target.classList.contains('menu__card--button')) {
      e.preventDefault();
      changeProductSize(target);
    }
    if (target.classList.contains('menu__btn')) {
      e.preventDefault();
      changeProductOrderInfo(target);
    }
  });

})();