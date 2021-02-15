;
(function () {


    let scroll = function (target) {
        let targetTop = target.getBoundingClientRect().top;
        let scrollTop = window.pageYOffset;
        let targetOffsetTop = targetTop + scrollTop;
        let headerOffset = document.querySelector('.header').clientHeight;

        window.scrollTo(0, targetOffsetTop - headerOffset);
    };


    myLib.body.addEventListener('click', function (e) {
        let target = e.target;
        let scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');

        if (scrollToItemClass === null) {
            return;
        }

        e.preventDefault();

        let scrollToItem = document.querySelector('.' + scrollToItemClass);

        if (scrollToItem) {
            scroll(scrollToItem);
        }
    });
})();