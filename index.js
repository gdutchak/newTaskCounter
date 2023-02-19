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

let backBlazeStr = null;
let backBlazeTrs = null;

let bunnyStr = null;
let bunnyTrs = null;

let scalewayStr = null;
let scalewayTrs = null;

let vultrStr = null;
let vultrTrs = null;

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

const handlePriceOfCompany = (first, second, third, four) => {
    const arr = [first, second, third, four]
    const result = arr.map(({textContent}) => Number(textContent.slice(0, textContent.length - 1)))
    const minValue = Math.min(...result)
    const maxValue = Math.max(...result)
    arr.map(({textContent, style}) => {
        if(Number(textContent.slice(0, textContent.length - 1)) === maxValue) {
            style.width = "100%"
            style.backgroundColor = "grey"
        }
        else if(Number(textContent.slice(0, textContent.length - 1)) === minValue) {
            style.backgroundColor = "red"
            style.width = `${(Number(textContent.slice(0, textContent.length - 1)) * 100 / maxValue)}%`
        } else if ( Number(textContent.slice(0, textContent.length - 1)) !== minValue || Number(textContent.slice(0, textContent.length - 1)) !== maxValue) {
            style.width = `${(Number(textContent.slice(0, textContent.length - 1)) * 100 / maxValue)}%`
        style.backgroundColor = "grey"
        }
    })
}

// wrapperBunny.addEventListener('click', e => {
//     if(e.target.value === "HDD") {
//         bunnyStr = countStorage(0.01, e.target.value)
//     } else {
//         bunnyStr = countStorage(0.02, e.target.value)
//     }
// })

storage.addEventListener('input', e=>{
    storageOutput.textContent = e.target.value
    backBlazeStr = countStorage(0.005, e.target.value)
    bunnyStr = bunnyRadio[0].checked ? countStorage(0.01, e.target.value) : countStorage(0.02, e.target.value)
    scalewayStr = e.target.value < 75 ? 0 : scaleRadio[0].checked ? countStorage(0.06, (e.target.value - 75)) : countStorage(0.03, (e.target.value - 75))
    vultrStr = countStorage(0.01, e.target.value)
    backblazePrice.textContent = totalSum(backBlazeStr, backBlazeTrs) < 7 ? "7$" : `${totalSum(backBlazeStr, backBlazeTrs)}$`
    bunnyPrice.textContent = totalSum(bunnyStr, bunnyTrs) > 10 ? "10$" : `${totalSum(bunnyStr, bunnyTrs)}$`
    scalewayPrice.textContent = `${totalSum(scalewayStr, scalewayTrs)}$`
    vultrPrice.textContent = totalSum(vultrStr, vultrTrs) < 5 ? "5$" : `${totalSum(vultrStr, vultrTrs)}$`
    
    handlePriceOfCompany(backblazePrice, bunnyPrice, scalewayPrice, vultrPrice)
})

transfer.addEventListener('input', e=>{
    transferOutput.textContent = e.target.value
    backBlazeTrs = countTransfer(0.01, e.target.value)
    bunnyTrs = countStorage(0.01, e.target.value)
    scalewayTrs = e.target.value < 75 ? 0 : countStorage(0.02, (e.target.value - 75))
    vultrTrs = countStorage(0.01, e.target.value)
    backblazePrice.textContent = totalSum(backBlazeStr, backBlazeTrs) < 7 ? '7$' : `${totalSum(backBlazeStr, backBlazeTrs)}$`
    bunnyPrice.textContent = totalSum(bunnyStr, bunnyTrs) > 10 ? "10$" : `${totalSum(bunnyStr, bunnyTrs)}$`
    scalewayPrice.textContent = `${totalSum(scalewayStr, scalewayTrs)}$`
    vultrPrice.textContent = totalSum(vultrStr, vultrTrs) < 5 ? "5$" : `${totalSum(vultrStr, vultrTrs)}$`

    handlePriceOfCompany(backblazePrice, bunnyPrice, scalewayPrice, vultrPrice)
})


