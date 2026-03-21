document.querySelectorAll('header nav a').forEach(function(el){
    el.addEventListener('click', function(e){
        e.preventDefault();

        let href = el.getAttribute('href');
        let offsetTop = document.querySelector(href).offsetTop;

        document.documentElement.style.scrollBehavior = 'smooth';
        document.documentElement.scrollTop = offsetTop;
    });
});

let mozaico = document.querySelector('.mozaico .center');
let dualImg = document.querySelectorAll('.dual-img');

esvSlide(mozaico, dualImg, {
    slidesToShow: 6,
    arrows: false,
    bullets: false,
    responsive: [{
        point: 900,
        seg:{
            slidesToShow: 5,
            infinite: true,
            autoPlay: true,
            autoplaySpeed: 1,
            speed: 3000,
            centerPadding: '10'
        }
    },{
        point: 800,
        seg:{
            slidesToShow: 4
        }
    },{
        point: 600,
        seg:{
            slidesToShow: 3,
        }
    }]
});


let carrossel = document.querySelector('.carrossel');
let tratamentos = document.querySelectorAll('.tri-tratamento');

esvSlide(carrossel, tratamentos, {
    slidesToShow: 3,
    arrows: false,
    bullets: false,
    responsive:[{
        point: 900,
        seg:{
            bullets: true,
            slidesToShow: 1,
            autoPlay: true
        }
    }]
});

let mainDepoimentos = document.querySelector('.aux-carrossel');
let depoimentoSingle = document.querySelectorAll('.depoimento-single');

esvSlide(mainDepoimentos, depoimentoSingle, {
    infinite: true,
    bullets: false,
    autoPlay: true,
    responsive: [{
        point: 500,
        seg:{
            arrows: false,
            bullets: true
        }
    }]
});

let fotos = document.querySelector('.fotos');
let foto = document.querySelectorAll('.fotos .img')

esvSlide(fotos, foto, {
    arrows: false,
    bullets: false,
    slidesToShow: 8,
    responsive:[{
        point: 900,
        seg:{
            slidesToShow: 6,
            autoPlay: true,
            autoplaySpeed: 1,
            speed: 2000,
            infinite: true
        }
    },{
        point: 500,
        seg:{
            slidesToShow: 4
        }
    }]
})