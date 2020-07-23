function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML +=  `<option value= "${state.id}"> ${state.nome} </option>`
        }
        
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOFSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOFSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Seleciona a Cidade</option>"//limpa as cidades quando troca o estado, assim tirando o bug
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML +=  `<option value= "${city.nome}"> ${city.nome} </option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta
//pegar todos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//variavel que vai armazenar os itens de coleta
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    //adicionar e remover uma classe com Javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
   
    console.log('itemId: ', itemId)
    //verifica se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false

        return itemFound
    })
    
    //Se já selecionado,
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedItems = filteredItems//atualiza o vetor que armazena os itens de coleta
    
    
    }else{
        //se não estiver selecionado adicionar na seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}