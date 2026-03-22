
const itens = [
    {
        id: 0,
        nome: 'camisa',
        img: 'imagens/image.jpg',
        quantidade: 0
    },

    {
        id: 1,
        nome: 'short',
        img: 'imagens/image.jpg',
        quantidade: 0
    },

    {
        id: 2,
        nome: 'calça',
        img: 'imagens/image.jpg',
        quantidade: 0
    },

    {
        id: 3,
        nome: 'sapato',
        img: 'imagens/image.jpg',
        quantidade: 0
    }
]

iniciarLoja = ()=>{
    let produtos = document.querySelector('#produtos');
    
    itens.map((val)=>{
        produtos.innerHTML += `<div class="produto-single">
                                    <img src="${val.img}" />

                                    <p>${val.nome}</p>

                                    <button key="${val.id}">Adicionar ao carrinho</button>
                                </div>`
    });
}

iniciarLoja();

atulizarCarrinho = ()=> {
    let carrinho = document.querySelector('#carrinho');
    carrinho.innerHTML = ``;
    itens.map((val)=>{
        if(val.quantidade > 0){
            carrinho.innerHTML += `<p>${val.nome} | quantidade: ${val.quantidade}</p>`
        }
    });
}


var btnAdicionar = document.getElementsByTagName('button');
for(var i = 0; i < btnAdicionar.length; i++){
    btnAdicionar[i].addEventListener("click",function(){
        let key = this.getAttribute('key');
        itens[key].quantidade++;
        atulizarCarrinho();
        return 
    });
} 
