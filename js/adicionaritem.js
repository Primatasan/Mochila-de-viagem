const form = document.querySelector('[data-form]')
const lista = document.querySelector('[data-lista]')
const itens = JSON.parse(localStorage.getItem("item")) || []

itens.forEach( (e) => {
    criarElemento(e)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find( e => e.nome === nome.value)

    const itemAcresc = {
        "nome": nome.value,
        "quantidade": quantidade.value
       }

    if (existe){
        itemAcresc.id = existe.id
        atualizaItem(itemAcresc)
        itens[itens.findIndex(e => e.id === existe.id)] = itemAcresc
    } else {
        itemAcresc.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
        criarElemento(itemAcresc)
        itens.push(itemAcresc)

    }
    
    localStorage.setItem("item", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criarElemento (item){
    
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numItem = document.createElement ('strong');
    numItem.innerHTML = item.quantidade;
    numItem.dataset.id = item.id

    novoItem.appendChild(numItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

   lista.appendChild(novoItem)

}

function atualizaItem(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const botao = document.createElement("button")
    botao.classList.add('botao')
    botao.innerText = "x"
    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    
    return botao
}

function deletaElemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(e => e.id === id), 1)
    localStorage.setItem("item", JSON.stringify(itens))
}