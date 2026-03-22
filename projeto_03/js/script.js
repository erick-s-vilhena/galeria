document.querySelectorAll('a').forEach(function(el){
    el.addEventListener('click', function(e){
        const href = el.getAttribute('href');

        if(!href || !href.startsWith('.')) return;

        const alvo = document.querySelector(href);
        if(!alvo) return;

        e.preventDefault();

        const setTop = alvo.offsetTop;

        document.documentElement.style.scrollBehavior = "smooth";
        document.documentElement.scrollTop = setTop;
    });
});

(function(){
    const carrosel = document.querySelector('.sessao-3 .carrosel');
    const slides = document.querySelectorAll('.sessao-3 .carrosel .slider');
    const bulletsBox = document.querySelector('.carrossel-bullets');

    if(!carrosel || !slides.length || !bulletsBox) return;

    let indexAtual = 0;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragging = false;
    let animationId = null;
    const mobileQuery = window.matchMedia('(max-width: 7020px)');

    function criarBullets(){
        bulletsBox.innerHTML = '';
        slides.forEach((_, index) => {
            const bullet = document.createElement('button');
            bullet.type = 'button';
            bullet.setAttribute('aria-label', 'Ir para o slide ' + (index + 1));
            bullet.addEventListener('click', () => {
                irPara(index);
            });
            bulletsBox.appendChild(bullet);
        });
        atualizarBullets();
    }

    function atualizarBullets(){
        const bullets = bulletsBox.querySelectorAll('button');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('ativo', index === indexAtual);
        });
    }

    function larguraSlide(){
        return carrosel.parentElement.clientWidth;
    }

    function setTranslate(x){
        carrosel.style.transform = `translateX(${x}px)`;
    }

    function irPara(index){
        indexAtual = Math.max(0, Math.min(index, slides.length - 1));
        currentTranslate = -indexAtual * larguraSlide();
        prevTranslate = currentTranslate;
        carrosel.classList.remove('arrastando');
        setTranslate(currentTranslate);
        atualizarBullets();
    }

    function resetDesktop(){
        carrosel.classList.remove('arrastando');
        carrosel.style.transform = 'translateX(0)';
        indexAtual = 0;
        currentTranslate = 0;
        prevTranslate = 0;
        atualizarBullets();
    }

    function pointerDown(clientX){
        if(!mobileQuery.matches) return;
        dragging = true;
        startX = clientX;
        carrosel.classList.add('arrastando');
        animationId = requestAnimationFrame(animarArraste);
    }

    function pointerMove(clientX){
        if(!dragging || !mobileQuery.matches) return;
        const deslocamento = clientX - startX;
        currentTranslate = prevTranslate + deslocamento;
    }

    function pointerUp(){
        if(!dragging || !mobileQuery.matches) return;
        dragging = false;
        cancelAnimationFrame(animationId);
        carrosel.classList.remove('arrastando');

        const movedBy = currentTranslate - prevTranslate;
        const limite = larguraSlide() * 0.18;

        if(movedBy < -limite && indexAtual < slides.length - 1){
            indexAtual += 1;
        }else if(movedBy > limite && indexAtual > 0){
            indexAtual -= 1;
        }

        irPara(indexAtual);
    }

    function animarArraste(){
        setTranslate(currentTranslate);
        if(dragging) requestAnimationFrame(animarArraste);
    }

    carrosel.addEventListener('mousedown', (e) => pointerDown(e.clientX));
    window.addEventListener('mousemove', (e) => pointerMove(e.clientX));
    window.addEventListener('mouseup', pointerUp);
    carrosel.addEventListener('mouseleave', pointerUp);

    carrosel.addEventListener('touchstart', (e) => {
        pointerDown(e.touches[0].clientX);
    }, { passive: true });

    carrosel.addEventListener('touchmove', (e) => {
        pointerMove(e.touches[0].clientX);
    }, { passive: true });

    carrosel.addEventListener('touchend', pointerUp);

    window.addEventListener('resize', () => {
        if(mobileQuery.matches){
            irPara(indexAtual);
        }else{
            resetDesktop();
        }
    });

    criarBullets();
    resetDesktop();
})();