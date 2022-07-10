let stock = {
    "apiKey": "vixQjL6qlMgy72k0XrFAtGp62c_4681S",
    fetchStock: function (symbol) {
        fetch(
            "https://api.polygon.io/v1/open-close/"
            + symbol
            + "/2020-10-14?adjusted=true&apiKey=" 
            + this.apiKey,
        ).then((response) => response.json())
        .then((data) => this.displayStock(data));
    },
    displayStock: function(data) {
        const { symbol } = data;
        const { close } = data;
        const { high } = data;
        const { low } = data;
        const { volume } = data;
        console.log(symbol, close, high, volume);
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