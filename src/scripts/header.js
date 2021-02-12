;
(function () {
    if (window.matchMedia('(max-width: 992px)').matches) {
        return;
    }

    let header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });
})();