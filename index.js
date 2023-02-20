const storage = document.querySelector('input[name="storage"]')
const transfer = document.querySelector('input[name="transfer"]')
const storageOutput = document.querySelector('.outputStorage')
const transferOutput = document.querySelector('.outputTransfer')
const wrapperBunny = document.querySelector('.wrapperBunny')
const wrapperScaleway = document.querySelector('.wrapperScaleway')
const listPrice = document.querySelector('.list_price')
const companyAll = document.querySelectorAll('.price')

let backBlazeStr = null;
let backBlazeTrs = null;

let bunnyStr = null;
let bunnyTrs = null;

let scalewayStr = null;
let scalewayTrs = null;

let vultrStr = null;
let vultrTrs = null;

let minValue = null;
let maxValue = null;

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
        return it2.toFixed(0)
    } else if (it2 === null) {
        return it1.toFixed(0)
    }
    return (it1 + it2).toFixed(0)
}

const handlePriceOfCompany = (arr) => {
    const newArr = [...arr]
    const result = newArr.map(({textContent}) => Number(textContent.slice(0, textContent.length - 1)))
    minValue = Math.min(...result)
    maxValue = Math.max(...result)
    newArr.map(({textContent, style}) => {
        const number = Number(textContent.slice(0, textContent.length - 1));
        if(number === maxValue) {
            style.width = "100%"
            style.backgroundColor = "rgba(119, 119, 133, 0.406)"
            style.border = "1px solid black"
            style.borderLeft = "none"
        }
        else if(number === minValue) {
            style.backgroundColor = "rgba(255, 0, 0, 0.7)"
            style.border = "1px solid black"
            style.borderLeft = "none"
            style.width = `${(number * 100 / maxValue)}%`
        } else if (number !== minValue || number !== maxValue) {
            style.width = `${(number * 100 / maxValue)}%`
            style.backgroundColor = "rgba(119, 119, 133, 0.406)"
            style.border = "1px solid black"
            style.borderLeft = "none"
        }
    })
}

wrapperBunny.addEventListener('click', e => {
    switch (e.target.value) {
        case "HDD":
            bunnyStr = countStorage(0.01, storageOutput.textContent)
            handleSumCompany(companyAll)
            break;
    
        case "SSD":
            bunnyStr = countStorage(0.02, storageOutput.textContent)
            handleSumCompany(companyAll)
            break;
        default:
            break;
    }
})

wrapperScaleway.addEventListener('click', e => {
    switch (e.target.value) {
        case "Multi":
            scalewayStr = storageOutput.textContent< 75 ? 0 : countStorage(0.06, (storageOutput.textContent - 75)) 
            handleSumCompany(companyAll)
            break;
        case "Single":
            scalewayStr = storageOutput.textContent< 75 ? 0 : countStorage(0.03, (storageOutput.textContent - 75))
            handleSumCompany(companyAll)
            break;

        default:
            break;
    }
})

const handleSumCompany = (items) => {
    listPrice.classList.add('list_price--border')
    items.forEach(it => {
        switch (it.className) {
            case "price backblaze_price":
                it.textContent = totalSum(backBlazeStr, backBlazeTrs) < 7 ? "7$" : `${totalSum(backBlazeStr, backBlazeTrs)}$`
                break;
            case "price bunny_price":
                it.textContent = totalSum(bunnyStr, bunnyTrs) > 10 ? "10$" : `${totalSum(bunnyStr, bunnyTrs)}$`
                break;
            case "price scaleway_price":
                it.textContent = `${totalSum(scalewayStr, scalewayTrs)}$`
                break;
            case "price vultr_price":
                it.textContent = totalSum(vultrStr, vultrTrs) < 5 ? "5$" : `${totalSum(vultrStr, vultrTrs)}$`
                break;
            default:
                break;
        }
    })
}

const countPriceTotalStorage = (e) => {
    storageOutput.textContent = e.target.value
    backBlazeStr = countStorage(0.005, e.target.value)
    bunnyStr = wrapperBunny.children[0].children[0].checked ? countStorage(0.01, e.target.value) : countStorage(0.02, e.target.value)
    scalewayStr = e.target.value < 75 ? 0 : wrapperScaleway.children[0].children[0].checked ? countStorage(0.06, (e.target.value - 75)) : countStorage(0.03, (e.target.value - 75))
    vultrStr = countStorage(0.01, e.target.value)

    handleSumCompany(companyAll)
}

const countPriceTotalTransfer = (e) => {
    transferOutput.textContent = e.target.value
    backBlazeTrs = countTransfer(0.01, e.target.value)
    bunnyTrs = countStorage(0.01, e.target.value)
    scalewayTrs = e.target.value < 75 ? 0 : countStorage(0.02, (e.target.value - 75))
    vultrTrs = countStorage(0.01, e.target.value)

    handleSumCompany(companyAll)
}

storage.addEventListener('input', e=>{
    countPriceTotalStorage(e)
    
    handlePriceOfCompany(companyAll)
})

transfer.addEventListener('input', e=>{
    countPriceTotalTransfer(e)

    handlePriceOfCompany(companyAll)
})


