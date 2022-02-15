var myChart;
function search() {
//   var filter = document.getElementById("search").value;
  var baseUrl = "https://api.coinranking.com/v2/coins";
  var apiKey = "coinranking14cf77305ede45fab52e47ad5028ae770f87b7dafe3999a6";
  fetch('https://cryptolink.edwardlin.ca/response.json', { 
//   fetch(`${baseUrl}${filter}`, { 
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    //   'x-access-token': `${apiKey}`,
    //   'Access-Control-Allow-Origin': 'https://cryptolink.edwardlin.ca/'
    // }
})
  .then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        coinsData = json.data.coins;
        if (coinsData.length > 0) {
          var cryptoCoin = "";
          document.getElementById("error").style.display = "none";
        }
        else{
          document.getElementById("error").style.display = "flex";
        }
        //For Loop Starts
        coinsData.forEach((coin) => {
          cryptoCoin += `<a cryptoSymbol="${coin.symbol}" cryptoName="${coin.name}" type="button" class="d-flex align-items-center justify-content-between gap-3 py-3 px-3" data-bs-toggle="modal" data-bs-target="#${coin.symbol}Modal" data-coin-symbol="${coin.symbol}" data-coin-data='${JSON.stringify(coin.sparkline)}'>
                            <div class="col-4 d-flex align-items-center">
                                <img src="${coin.iconUrl}" alt="twbs" class="coin-icon rounded-circle flex-shrink-0">
                                <div class="ml-1">
                                    <p class="h6 mb-0 line-h-1 font-weight-bold">${coin.symbol}</p>
                                    <p class="mb-0 line-h-1">${coin.name}</p>
                                </div>
                            </div>
                            <div class="col-3 justify-content-between">
                                <p class="mb-0 text-center">$${Math.round((coin.price) * 100) / 100}</p>
                            </div>
                            <div class="col-2 justify-content-between text-center">
                                <p class="mb-0 p-1 text-white rounded `
                if(coin.change >= 0){
                                cryptoCoin +=  `bg-success text-right">${coin.change}%</p>
                            </div>
                        </a>`;
                      }
                      else{
                        cryptoCoin +=  `bg-danger text-right">${coin.change}%</p>
                            </div>
                        </a>`;
                      }

          cryptoCoin += `<div class="modal fade" id="${coin.symbol}Modal" tabindex="-1" role="dialog" aria-labelledby="${coin.symbol}Modal" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                              <div class="modal-content rounded-6 shadow p-3">
                                <div class="modal-header border-bottom-0 mb-3">
                                    <div class="w-100 d-flex align-items-center">
                                        <img class="col-2" src="${coin.iconUrl}" height="100%" width="100%">
                                        <h5 class="line-h-1 h3 ml-1 col-2 modal-title">${coin.name}</h5>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>                                    
                                </div>
                                <div class="modal-body py-0">
                                    <div class="mb-3 d-flex align-items-center justify-content-between">
                                        <div class="">
                                            <h6 class="h6 mb-0 bold">Price</h6>
                                            <p class="h6">$${Math.round((coin.price) * 100) / 100}</p>
                                        </div>
                                        <div class="text-right">
                                            <h6 class="h6 mb-0 bold">24H Chg%</h6>
                                            <p class="h6">${coin.change}%</p>
                                        </div>
                                    </div>
                                    <div class="mb-3 d-flex align-items-center justify-content-between">
                                        <div class="">
                                            <h6 class="h6 mb-0 bold">24H Low</h6>
                                            <p class="h6">$${Math.round((Math.min(...coin.sparkline))*100) /100}</p>
                                        </div>
                                        <div class="text-right">
                                            <h6 class="h6 mb-0 bold">24H High</h6>
                                            <p class="h6">${Math.round((Math.max(...coin.sparkline))*100) /100}</p>
                                        </div>
                                    </div>
                                    <div class="mb-3 d-flex align-items-center justify-content-between">
                                        <div class="">
                                            <h6 class="h6 mb-0 bold">Market Cap</h6>
                                            <p class="h6">${coin.marketCap+" "+coin.symbol}</p>
                                        </div>
                                    </div>
                                    <canvas id="${coin.symbol}Chart"></canvas>
                                </div>
                                <div class="modal-footer flex-column border-top-0">
                                  <a href="${coin.coinrankingUrl}" target="_blank" type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2">Buy Now</a>
                                  <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                            </div>`;
                      
                            document.getElementById("data").innerHTML = cryptoCoin;
                            createChart(coin.symbol+"Chart", coin.sparkline);

        });
        //For Loop Ends
        if (coinsData.length > 0) {
          document.getElementById("data").innerHTML = cryptoCoin;
          $('.modal').on('shown.bs.modal', function (e) {
            let coinSymbol = e.relatedTarget.dataset.coinSymbol;
            let coinData = JSON.parse(e.relatedTarget.dataset.coinData);
            let labelData = Array.from({length:coinData.length});
            labelData.fill("");
            createChart(coinSymbol+"Chart", coinData, labelData)
          })
          $('.modal').on('hidden.bs.modal', function (e) {
            myChart.destroy();

            })
        }
        else{
          document.getElementById("data").innerHTML = "";
        }
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });


}


function createChart(coinname, coindata, labels){
  var ctx = document.getElementById(coinname);
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: coindata
        }
      ]
    },
    options: {
      scales: {
        y: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });
}  


