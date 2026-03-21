'use strict'

/*
main: div que envolve os slides
child: div que são os slides a serem mostrados
{
    autoPlay: true | false,

    autoplayReverse: true | false,

    autoplaySpeed: velocidade em que os slides passam em ms,

    arrows: true | false,

    arrowsOutside: true | false,

    asNavFor: div onde se vai mostra o slide apresentado,

    bullets: true | false,

    bullletsAling: 'center' | 'left' | 'right',

    centerPadding: espaço extra nas laterais, se maior que a margin dos slide mostra um pouco do proximo slide '0'

    color: cor pardao que os botoes terao em rgb, [150, 150, 150],

    infinite: true | false,

    slidesToShow: quantidade de slides a serem exibidos de uma vez

    sliderMargin: espaço entre os slides '0'

    speed: velocidade de transição de um slide pra outro

    responsive: [{  muda as configurações a parti de um ponto determinado
        point: o ponto que deve ser mudado
        seg:{
            as novas configurações
        }
    },
    {
        point: outro ponto
        seg:{
            outra configuração
        }
    }]
}
*/

function esvSlide(main, child, {
    autoPlay = false,
    autoplayReverse,
    autoplaySpeed = 3000,
    arrows = true,
    arrowsOutside = true,
    asNavFor,
    bullets = true,
    bullletsAling = 'center',
    centerPadding = 0,
    color = [150, 150, 150],
    infinite = false,
    slidesToShow = 1,
    sliderMargin = 0,
    speed = 500,
    touch,
    responsive,
}){



if(responsive){
    let width_janela = document.body.offsetWidth;
    responsive.forEach(function(res){
        if(width_janela <= res.point){
            if(res.seg.autoPlay === true || res.seg.autoPlay === false){   autoPlay = res.seg.autoPlay}

            if(res.seg.autoplayReverse === true || res.seg.autoplayReverse === false){   autoplayReverse = res.seg.autoplayReverse}
            
            if(res.seg.arrows === true || res.seg.arrows === false){   arrows = res.seg.arrows}

            if(res.seg.arrowsOutside === true || res.seg.arrowsOutside === false){   arrowsOutside = res.seg.arrowsOutside}

            if(res.seg.bullets === true || res.seg.bullets === false){   bullets = res.seg.bullets}

            if(res.seg.infinite === true || res.seg.infinite === false){   infinite = res.seg.infinite}

            if(res.seg.touch === true || res.seg.touch === false){   touch = res.seg.touch}

            if(res.seg.asNavFor === false){   asNavFor = res.seg.asNavFor}

            asNavFor = res.seg.asNavFor                 || asNavFor

            autoplaySpeed = res.seg.autoplaySpeed       || autoplaySpeed

            bullletsAling = res.seg.bullletsAling       || bullletsAling

            centerPadding = res.seg.centerPadding       || centerPadding

            color = res.seg.color                       || color

            slidesToShow = res.seg.slidesToShow         || slidesToShow

            sliderMargin = res.seg.sliderMargin         || sliderMargin

            speed = res.seg.speed                       || speed

        }
    })
}

main.innerHTML= `<div data-slide="slide-main">    </div>`;

const slideMain = document.querySelector(`.${main.getAttribute('class')} > [data-slide="slide-main"]`)

slideMain.innerHTML=`<div style="display: flex; align-items: center; height: 100%; position: relative; justify-content: center;">

                    ${arrows ? `<div data-slide="nav-prev" style="fill: rgb(${color}); width: 32px;  position: absolute; z-index: 10; cursor: pointer; left: 5px;">
                                                                    
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            
                            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>

                        </svg>

                    </div>

                    <div data-slide="nav-next" style="fill: rgb(${color}); width: 32px;  position: absolute; z-index: 10; cursor: pointer; right: 5px;">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            
                            <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                        
                        </svg>

                    </div>`: ``}

                    <div data-slide="wrapper" style="width: ${arrowsOutside && arrows ? `calc(100% - 70px)` : `100%` }; overflow: hidden; position: relative; display: flex; justify-content: center; flex-direction: column;">

                        <div data-slide="list" style="display: flex;"></div>

                        ${bullets ? `<div data-slide="controls" style="width: 100%; display: flex; margin: 20px auto; justify-content: ${bullletsAling};"></div>` : ``}
                        
                    </div>

                </div>`;

child.forEach(function(el, index){
    let slideList = document.querySelector(`.${main.getAttribute('class')} [data-slide="list"]`);
    let slideItens = document.createElement('div');
    el.style.height = "100%";
    el.style.userSelect = "none";
    el.style.pointerEvents = 'none';
    slideItens.dataset.slide = 'item';
    slideItens.dataset.index = index;
    slideItens.style.flexShrink = 0;
    slideItens.style.width = `calc((100% / ${slidesToShow}) - ${centerPadding}px)`;
    slideItens.style.padding = `0 ${sliderMargin / 2}px`;
    slideItens.innerHTML = el.outerHTML;
    slideList.append(slideItens);
});

const slideWrapper = document.querySelector(`.${main.getAttribute('class')} [data-slide="wrapper"]`);
const slideList = document.querySelector(`.${main.getAttribute('class')} [data-slide="list"]`);
const navPrevButton = document.querySelector(`.${main.getAttribute('class')} [data-slide="nav-prev"]`)
const navNextButton = document.querySelector(`.${main.getAttribute('class')} [data-slide="nav-next"]`)
const controlsWrapper = document.querySelector(`.${main.getAttribute('class')} [data-slide="controls"]`)
let slideItems = document.querySelectorAll(`.${main.getAttribute('class')} [data-slide="item"]`)
let controlButtons
let slideInterval

for(let i = 0; i < 3; i++){     if((color[i] + 55) > 255){     color[i] = 255;     }}
const corClaro = "rgb("+(color[0] + 55)+","+(color[1] + 55)+","+(color[2] + 55)+")";

for(let i = 0; i < 3; i++){    if((color[i] - 55) < 0){      color[i] = 55;     }}
const corEscuro = "rgb("+(color[0] - 55)+","+(color[1] - 55)+","+(color[2] - 55)+")";

const state = {
    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    movement: 0,
    currentSlideIndex: 0,
    isDrag: false,
    first: slideItems.length,
    last: slideItems.length + (slideItems.length - 1)
}

/*controla que slide vai aparecer na tela***************************************************************/
function setVisibleSlide({ index, animate }) {
    if(infinite){
        if(index === state.first - 2 || index === state.last + 2) {
        index = state.currentSlideIndex
        }
    }else{
        if(index === -1){
            index = slideItems.length - 1
        }
        if(index === slideItems.length){
            index = 0
        }
    }
    const position = getCenterPosition({ index })
    state.currentSlideIndex = index
    slideList.style.transition = animate ? `transform ${speed / 1000}s` : 'none'
    translateSlide({position: position, index: index});
    activeControlButton({ index })
    NavFor(index);
}

function translateSlide({ position }) {
    state.savedPosition = position
    slideList.style.transform = `translateX(${position}px)`
    
}

function getCenterPosition({ index }) {
    const slideItem = slideItems[index]
    const slideWidth = (slideItem.clientWidth)
    const windowWidth = (slideWrapper.clientWidth) 
    const margin = (windowWidth - slideWidth * slidesToShow) / 2 
    const position = margin  - (index * slideWidth)
    return position
}
/*controla que slide vai aparecer na tela***************************************************************/

/*setas*************************************************************************************************/
function nextSlide() {
    setVisibleSlide({ index: state.currentSlideIndex + 1, animate: true})
}

function previousSlide() {
    setVisibleSlide({ index: state.currentSlideIndex - 1, animate: true})
}
/*setas*************************************************************************************************/

/*botoes****************************************************************************************** */
function createControlButtons() {
    if(bullets){
        slideItems.forEach(function(){
            const controlButton = document.createElement('div')
            controlButton.classList.add('slide-controls-button')
            controlButton.dataset.slide = 'control-button';
            controlButton.style.width = `16px`;
            controlButton.style.margin = `0 5px`;
            controlButton.style.cursor = `pointer`;
            controlButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">

                                            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z"/>

                                        </svg>`;
            controlsWrapper.append(controlButton)
        });
    }
}

function activeControlButton({ index }) {
    if(bullets){
        const slideItem = slideItems[index]
        const dataIndex = Number(slideItem.dataset.index)
        const controlButton = controlButtons[dataIndex]
        controlButtons.forEach(function(controlButtonItem) {
            controlButtonItem.classList.remove('active')
        })
        if(controlButton) controlButton.classList.add('active');

        let buttonActive = document.querySelectorAll(`.${main.getAttribute('class')} .slide-controls-button`)
        buttonActive.forEach(function(el){
            el.style.fill = corClaro;
            el.addEventListener("mouseover", function(){      el.style.fill = `rgb(${color})`;      });
            el.addEventListener("mouseout", function(){      el.style.fill = corClaro;      });

            if(controlButton){
                controlButton.style.fill = corEscuro;
                controlButton.addEventListener("mouseover", function(){      controlButton.style.fill = corEscuro;      });
                controlButton .addEventListener("mouseout", function(){      controlButton.style.fill = corEscuro;      });            
            }
        });
    }
}

function onControlButtonClick(index) {
    setVisibleSlide({ 
        index: infinite ? index + state.first : index, 
        animate: true 
    })
}
/*botoes****************************************************************************************** */

/*infinito****************************************************************************************** */
function createSlideClones() {
    if(infinite){
        slideItems.forEach(function(el, index){
            var clone = el.cloneNode(true);
            var cloneAnt = slideItems[slideItems.length - (index + 1)].cloneNode(true);

            clone.classList.add('slide-cloned')
            clone.dataset.index = slideItems.length + index;

            cloneAnt.classList.add('slide-cloned');
            cloneAnt.dataset.index = -(index + 1);

            slideList.prepend(cloneAnt)
            slideList.append(clone);
        });

        slideItems = document.querySelectorAll(`.${main.getAttribute('class')} [data-slide="item"]`)  
    }
}

function onSlideListTransitionEnd() {
    const slideItem = slideItems[state.currentSlideIndex]
    
    if(slideItem.classList.contains('slide-cloned') && Number(slideItem.dataset.index) > 0) {
        setVisibleSlide({ index: state.first, animate: false })
    }
    if(slideItem.classList.contains('slide-cloned') && Number(slideItem.dataset.index) < 0) {
        setVisibleSlide({ index: state.last, animate: false })
    }
}
/*infinito****************************************************************************************** */

/*mouse e touch****************************************************************************************** */
function onMouseDown(event, index) {
    if(touch){
        state.isDrag = true;
        const slideItem = event.currentTarget
        state.startingPoint = event.clientX
        state.currentPoint = event.clientX - state.savedPosition
        state.currentSlideIndex = index
        slideList.style.transition = 'none'
        slideItem.addEventListener('mousemove', onMouseMove)
    }
}
function onMouseMove(event) {
    if(touch){
        if(state.isDrag){
            state.movement = event.clientX - state.startingPoint
            const position = event.clientX - state.currentPoint
            translateSlide({ position })
        } 
    }
} 
function onMouseUp(event) {
    if(touch){
        const slideWidth = event.currentTarget.offsetWidth
        const slideWidth25 = (25 * slideWidth) / 100;
        const pointsToMove = slideWidth25;
        if(state.movement < -pointsToMove) {
            nextSlide()
        } else if (state.movement > pointsToMove) {
            previousSlide()
        } else {
            setVisibleSlide({ index: state.currentSlideIndex, animate: true})
        }
        state.movement = 0
        
        const slideItem = event.currentTarget
        slideItem.removeEventListener('mousemove', function(){
            state.isDrag = false;
        });
        slideItem.removeEventListener('mousemove', onMouseMove)
    }  
}
function onTouchStart(event, index) {
    if(touch){
        state.isDrag = true;
        event.clientX = event.touches[0].clientX
        onMouseDown(event, index)
        const slideItem = event.currentTarget
        slideItem.addEventListener('touchmove', onTouchMove)
    }
    
}
function onTouchMove (event) {
    if(touch){
        if(state.isDrag){
            event.clientX = event.touches[0].clientX
            onMouseMove(event)
        }
    }   
}
function onTouchEnd(event) {
    if(touch){
        onMouseUp(event)
        const slideItem = event.currentTarget
    
        slideItem.removeEventListener('touchmove', function(){
            state.isDrag = false;
        });
        slideItem.removeEventListener('touchmove', onTouchMove);
    } 
}

/*mouse e touch****************************************************************************************** */

function setAutoPlay() {
    if(autoPlay) {
        slideInterval = setInterval(function() {
            setVisibleSlide({
                            index: autoplayReverse ? state.currentSlideIndex - 1 : state.currentSlideIndex + 1 , 
                            animate: true
                        });
        }, autoplaySpeed + speed);
    }
}

function NavFor(index){
    if(asNavFor == null || asNavFor == false || asNavFor == undefined){}
    else{
        const slideNavfor = slideItems[index].cloneNode(true);
        slideNavfor.style.width = `100%`;
        asNavFor.forEach(function(el){
            el.style.display = `flex`;
            el.style.alignItems = 'center';
            el.style.justifyContent = `center`;
            el.innerHTML = ''
            el.append(slideNavfor);
        })
    }
}
function setListeners() {
    controlButtons = document.querySelectorAll(`.${main.getAttribute('class')} [data-slide="control-button"]`)
    controlButtons.forEach(function(controlButton, index) {
        controlButton.addEventListener('click', function(event) {
            onControlButtonClick(index)
        })
    })

    if(touch){
        document.addEventListener('mouseup', function(){
            state.isDrag = false;
            setVisibleSlide({ index: state.currentSlideIndex, animate: true})
        });
    
        slideItems.forEach(function(slideItem, index) {
        
            slideItem.addEventListener('dragstart', function(event) {
                event.preventDefault()
            })
            slideItem.addEventListener('mousedown', function(event) {
                onMouseDown(event, index);
            })
            slideItem.addEventListener('mouseup', onMouseUp)
            slideItem.addEventListener('touchstart', function(event) {
                onTouchStart(event, index)
            })
            slideItem.addEventListener('touchend', onTouchEnd)
        })
    }
    

    if(arrows){
        navNextButton.addEventListener('click', nextSlide)

        navPrevButton.addEventListener('click', previousSlide)

        navPrevButton.addEventListener('mouseenter', function() {
            clearInterval(slideInterval)
        })
        navNextButton.addEventListener('mouseenter', function() {
            clearInterval(slideInterval)
        })

        navPrevButton.addEventListener('mouseleave', function() {
            setAutoPlay()
        })
        navNextButton.addEventListener('mouseleave', function() {
            setAutoPlay()
        })
    }
    

    slideList.addEventListener('transitionend', onSlideListTransitionEnd)

    //FAZ O AUTOPLAY PARAR
    slideList.addEventListener('mouseenter', function() {
        clearInterval(slideInterval)
    })

    slideList.addEventListener('mouseleave', function() {
        setAutoPlay()
    })

    let button = document.querySelectorAll(`.${main.getAttribute('class')} [data-slide="control-button"]`);
    button.forEach(function(el){
        el.addEventListener('mouseenter', function() {
            clearInterval(slideInterval)
        });
        el.addEventListener('mouseleave', function() {
            setAutoPlay()
        });
    })
    //FAZ O AUTOPLAY PARAR

    

    let resizeTimeout
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout)

        resizeTimeout = setTimeout(function() {
            document.location.reload(true);
        }, 200);
    })
}
createControlButtons()
createSlideClones()
setListeners()
setVisibleSlide({ 
            index: infinite ? state.first : 0,
            animate: true })
setAutoPlay()

}