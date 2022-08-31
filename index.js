let stock = {
    "apiKey": "0b92bda5d2f297a72d359be292be3991",
    fetchStock: function (symbol) {
        fetch(
            "https://financialmodelingprep.com/api/v3/profile/"
            + symbol
            + "?apikey=" 
            + this.apiKey,
        ).then((response) => response.json())
        .then((data) => this.displayStock(data));
    },
    displayStock: function(data) {
        const symbol = data[0].companyName;
        const close = data[0].price;
        const high = data[0].range.slice(7);
        const low = data[0].range.slice(0, 6);
        const volume = data[0].volAvg;
        console.log(symbol, close, high, low, volume);
        document.querySelector(".ticker").textContent = `${symbol}`;
        document.querySelector(".price").textContent = `$ ${close}`;
        document.querySelector(".volume").textContent = `Volume: ${volume}`;
        document.querySelector(".high").textContent = `Daily High: ${high}`;
        document.querySelector(".low").textContent = `Daily Low: ${low}`;
        document.querySelector(".stock").classList.remove("loading");
    },
    search: function () {
        this.fetchStock(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    stock.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        stock.search();
    }
});

stock.fetchStock("AAPL");