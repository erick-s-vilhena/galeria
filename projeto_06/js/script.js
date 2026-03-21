var main = document.querySelector('.depoimentos-comp');
var child = document.querySelectorAll('.depoimento-single');

esvSlide(main, child, {
    sliderMargin: 10,
    arrows: true,
    touch: true,
    autoPlay: true
})

document.querySelectorAll('main a').forEach(function(el){
    el.addEventListener('click', function(e){
        e.preventDefault();

        let href = el.getAttribute('href')
        let setTop = document.querySelector(href).offsetTop;

        document.documentElement.style.scrollBehavior = 'smooth';
        document.documentElement.scrollTop = setTop;
    })
})





