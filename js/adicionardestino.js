const formulario = document.querySelector('[data-titulo]')
const header = document.querySelector('[data-header]')
const viagens = JSON.parse(localStorage.getItem("viagem")) || []
console.log(viagens)

viagens.forEach(element => {
    criarViagem(element)
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomePessoa = e.target.elements['nomepessoa'];
    const destino = e.target.elements['destino'];
    const dataViagem = e.target.elements['data'];

    const viagem = {
        "nome": nomePessoa.value,
        "destino": destino.value,
        "data": dataViagem.value,
        "id": 1
    }

    if(viagens.length === 0){
        viagens.push(viagem)
        localStorage.setItem("viagem", JSON.stringify(viagens))
        criarViagem(viagem)
    } else {
        alert("Você já tem uma viagem registrada. Apague essa viagem para cadastrar uma nova.")
    }

    nomePessoa.value = ""
    destino.value = ""
    dataViagem.value = ""
} )

function criarViagem(e){
    const titulo = document.createElement('h1')
    titulo.innerText = `${e.nome} | ${e.destino} | ${e.data}`
    header.appendChild(titulo) 
    header.appendChild(botaoDeletaViagem(e.id))
}

function botaoDeletaViagem(id){
    const botao = document.createElement("button")
    botao.classList.add('botao')
    botao.innerText = "x"
    botao.addEventListener("click", function(){
        deletaViagem(this.parentNode)
    })
    
    return botao
}

function deletaViagem(tag){
    tag.remove()
    viagens.shift()
    localStorage.setItem("viagem", JSON.stringify(viagens))
}
