const storage = document.querySelector('input[name="storage"]')
const transfer = document.querySelector('input[name="transfer"]')
const storageOutput = document.querySelector('.outputStorage')
const transferOutput = document.querySelector('.outputTransfer')
const backblaze = document.querySelector('#backblaze')
const backblazePrice = document.querySelector('.backblaze_price')
const bunny = document.querySelector('#bunny')
const bunnyPrice = document.querySelector('.bunny_price')
const scaleway = document.querySelector('#scaleway')
const scalewayPrice = document.querySelector('.scaleway_price')
const vultr = document.querySelector('#vultr')
const vultrPrice = document.querySelector('.vultr_price')
const bunnyRadio = document.querySelectorAll('input[name="bunny"]')
const scaleRadio = document.querySelectorAll('input[name="scaleway"]')
const wrapperBunny = document.querySelector('#wrapperBunny')

let elem = null;
let elem2 = null;

let bunnyEl = null;
let bunnyEl2 = null;

let scalewayEl = null;
let scalewayEl2 = null;

let vultrEl = null;
let vultrEl2 = null;

const countStorage = (val1, val2) => {
const value = (val1 * val2)
return value
}

const countTransfer = (val1, val2) => {
    const value = (val1 * val2)
    return value
    }

const totalSum = (it1, it2) => {
    if(it1 === null) {
        return it2
    } else if (it2 === null) {
        return it1
    }
    return (it1 + it2)
}
wrapperBunny.addEventListener('click', e => {
    if(e.target.value === "HDD") {
        bunnyEl = countStorage(0.01, e.target.value)
    } else {
        bunnyEl = countStorage(0.02, e.target.value)
    }
})

storage.addEventListener('input', e=>{
    storageOutput.textContent = e.target.value
    elem = countStorage(0.005, e.target.value)
    bunnyEl = bunnyRadio[0].checked ? countStorage(0.01, e.target.value) : countStorage(0.02, e.target.value)
    scalewayEl = e.target.value < 75 ? 0 : scaleRadio[0].checked ? countStorage(0.06, (e.target.value - 75)) : countStorage(0.03, (e.target.value - 75))
    vultrEl = countStorage(0.01, e.target.value)
    backblazePrice.textContent = totalSum(elem, elem2) < 7 ? "7$" : `${totalSum(elem, elem2)}$`
    bunnyPrice.textContent = totalSum(bunnyEl, bunnyEl2) > 10 ? "10$" : `${totalSum(bunnyEl, bunnyEl2)}$`
    scalewayPrice.textContent = `${totalSum(scalewayEl, scalewayEl2)}$`
    vultrPrice.textContent = totalSum(vultrEl, vultrEl2) < 5 ? "5$" : `${totalSum(vultrEl, vultrEl2)}$`
    
})

transfer.addEventListener('input', e=>{
    transferOutput.textContent = e.target.value
    elem2 = countTransfer(0.01, e.target.value)
    bunnyEl2 = countStorage(0.01, e.target.value)
    scalewayEl2 = e.target.value < 75 ? 0 : countStorage(0.02, (e.target.value - 75))
    vultrEl2 = countStorage(0.01, e.target.value)
    backblazePrice.textContent = totalSum(elem, elem2) < 7 ? '7$' : `${totalSum(elem, elem2)}$`
    bunnyPrice.textContent = totalSum(bunnyEl, bunnyEl2) > 10 ? "10$" : `${totalSum(bunnyEl, bunnyEl2)}$`
    scalewayPrice.textContent = `${totalSum(scalewayEl, scalewayEl2)}$`
    vultrPrice.textContent = totalSum(vultrEl, vultrEl2) < 5 ? "5$" : `${totalSum(vultrEl, vultrEl2)}$`
})

