document.querySelectorAll('header nav a').forEach(function(el){
    el.addEventListener('click', function(e){
        e.preventDefault();

        let href = el.getAttribute('href');
        let offsetTop = document.querySelector(href).offsetTop;

        document.documentElement.style.scrollBehavior = 'smooth';
        document.documentElement.scrollTop = offsetTop;
    });
});
