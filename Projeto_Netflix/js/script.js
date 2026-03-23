let resizeTimeout
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout)

    resizeTimeout = setTimeout(function() {
        document.location.reload(true);
    }, 200);
})