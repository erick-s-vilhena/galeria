var valorCorrente = 0;
var isDrag = false;

document.querySelector(".circulo").addEventListener('mousedown', function(){
    isDrag = true;
})

document.documentElement.addEventListener('mouseup', function(){
    isDrag = false;
})

document.querySelector('.barra-filtro').addEventListener('mousemove', function(e){
    if(isDrag){
        let el_base = this;

        let mouse_x = e.pageX - el_base.offsetLeft;
        
        
        if(mouse_x < 0){
            mouse_x = 0;
        }
        if(mouse_x > el_base.offsetWidth){
            mouse_x = el_base.offsetWidth;
        }

        let porcen = (mouse_x / el_base.offsetWidth) * 100;
        console.log(porcen);

        document.querySelector('.barra-dentro').style.width = `${porcen}%`;

        document.querySelector('aside').style.userSelect = "none";
    }
})

