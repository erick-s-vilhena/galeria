const destaques = document.querySelector('.destaques .carrossel');
const destaquesSingle = document.querySelectorAll('.destaque-single');

const depoimentos = document.querySelector('.servicos-depoimentos .carrossel-2');
const depoimentoSingle = document.querySelectorAll('.depoimento-single');

esvSlide(destaques, destaquesSingle, {
    slidesToShow: 4,
    arrows: false,
    bullets: false,
    sliderMargin: '20',
    responsive:[{
        point: 780,
        seg: {
            slidesToShow: 3,
            autoPlay: true,
            centerPadding: '20',
            touch: true,
            infinite: true,
            speed: 3000
        }
    },{
        point: 580,
        seg: {
            slidesToShow: 2,
        }
    }]
});

esvSlide(depoimentos, depoimentoSingle, {
    arrows: false,
    bullletsAling: 'left',
    autoPlay: true,
    color: [255, 255, 255],
    touch: true
})
