document.querySelectorAll('a').forEach(function(el){
    el.addEventListener('click', function(e){
        e.preventDefault();
        
        let href = el.getAttribute('href')
        let setTop = document.querySelector(href).offsetTop;

        document.documentElement.style.scrollBehavior = "smooth";
        document.documentElement.scrollTop = setTop;
    })
})
