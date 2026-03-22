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
