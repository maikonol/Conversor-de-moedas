const button = document.getElementById('convert-button')
const select = document.getElementById('currencry-select')

// const dolar = 5.22
// const euro = 5.60
// const bitcoin = 90.89213

const convertValues = async () => {
    const inputReais = document.getElementById('input-real').value
    const realValueText = document.getElementById('real-value-text')
    const dorlarValueText = document.getElementById('doral-value-text')

    const data = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
    const recebeDados = await data.json();

    const dolar = recebeDados.USDBRL.high;
    const euro = recebeDados.EURBRL.high;
    const bitcoin = recebeDados.BTCBRL.bid;

    // console.log(dolar);
    // console.log(euro);
    // console.log(data);

    realValueText.innerHTML = new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' }
    ).format(inputReais)

    if (select.value === "US$ Dólar americano") {
        dorlarValueText.innerHTML = new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
        ).format(inputReais / dolar) // '$100.00'
    }

    if (select.value === "€ Euro") {
        dorlarValueText.innerHTML = new Intl.NumberFormat('de-DE',
            { style: 'currency', currency: 'EUR' }
        ).format(inputReais / euro)
    }

    if(select.value === "Bitcoin"){
        dorlarValueText.innerHTML = new Intl.NumberFormat('de-DE',
            { style: 'currency', currency: 'BTC' }
        ).format(inputReais / bitcoin)
    }
}

const changeCurrency = () => {

    const currencyName = document.getElementById('currency-name')
    const currencyImg = document.getElementById('currency-img')

    if (select.value === "US$ Dólar americano") {
        currencyName.innerHTML = "Dólar Americano"
        currencyImg.src = "./assets/eua.png"
    }

    if (select.value === "€ Euro") {
        currencyName.innerHTML = "Euro"
        currencyImg.src = "./assets/euro.jpg"
    }

    if(select.value === "Bitcoin"){
        currencyName.innerHTML = "Bitcoin"
        currencyImg.src = "./assets/bitcoins.png"
    }

    convertValues()
}

button.addEventListener('click', convertValues)
select.addEventListener("change", changeCurrency)