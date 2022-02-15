var baseUrl = "https://api.coinranking.com/v2/coins?timePeriod=7d";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "coinranking14cf77305ede45fab52e47ad5028ae770f87b7dafe3999a6";

var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);

fetch(`${proxyUrl}${baseUrl}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
})
  .then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        // console.log(json.data);
        let coinsData = json.data.coins;

        if (coinsData.length > 0) {
          var cryptoCoin = "";
        }
        //For Loop Starts
        coinsData.forEach((coin) => {
          let chartID = coin.symbol+"Chart";
          cryptoCoin += `<li onclick="showModule('${coin.symbol}Module')" class='crypto-item'><div class='crypto-branding'><div class='crypto-logo'>`;
          cryptoCoin += `<img src='${coin.iconUrl}'></div><div class='crypto-id'>`
          cryptoCoin += `<p class='crypto-symbol'>${coin.symbol}</p><p class='crypto-name'>${coin.name}</p></div></div><div class='crypto-price'>`;
          cryptoCoin += `<p>${Math.round((coin.price) * 100) / 100}</p></div><div class='crypto-change'>`;
          cryptoCoin += `<p>${coin.change}%</p></div></li>`;
          console.log(Math.min(...coin.sparkline) +" "+ Math.max(...coin.sparkline));
        
          cryptoCoin += `<div id='${coin.symbol}Module' class='module'><div onclick="closeModule('${coin.symbol}Module')" class="close">X</div><img src='${coin.iconUrl}'><h4>${coin.symbol}</h4><h3>${coin.name}</h3><div class='row'><div class='price'><h5>Price</h5><p>${coin.price}</p></div><div class='change'><h5>24H Chg%</h5><p>${coin.change}%</p></div></div><div class='hilow'><div class='low'><h5>24H Low</h5><p>${Math.min(...coin.sparkline)}</p></div><div class='hi'><h5>24H High</h5><p>${Math.max(...coin.sparkline)}</p></div></div><div class='marketcap'><h5>Market Cap</h5><p>${coin.marketCap}</p></div><canvas id='${coin.symbol}Chart'></canvas><div class="buylink"><a class="" href="${coin.coinrankingUrl}">Buy Now</a></div></div>`
          // createChart(chartID, coin.sparkline);
        });
        //For Loop Ends
        console.log(cryptoCoin);
        document.getElementById("data").innerHTML = cryptoCoin;
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });


  function createChart(chartID, data){
    ctx = document.getElementById(chartID);
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['','','','','','',],
          datasets: [{
              label: '24H',
              data: data,
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }


  // <div id="btc" class="module">
  //               <div onclick="closeModule('btc')" class="close">
  //                   X
  //               </div>
  //               <img src="https://cdn.coinranking.com/Sy33Krudb/btc.svg" width="100%"/>
  //               <h4>BTC</h4>
  //               <h3>Bitcoin</h3>
  //               <div class="row">
  //                   <div class="price">
  //                       <h5>Last Price</h5>
  //                       <p>$40,000</p>
  //                   </div>
  //                   <div class="change">
  //                       <h5>24h chg%</h5>
  //                       <p>2.9%</p>
  //                   </div>
  //               </div>
  //               <div class="hilow">
  //                   <div class="low">
  //                       <h5>24H Low</h5>
  //                       <p>34243</p>
  //                   </div>
  //                   <div class="hi">
  //                       <h5>24H High</h5>
  //                       <p>45454</p>
  //                   </div>
  //               </div>
  //               <div class="marketcap">
  //                   <h5>Market Cap</h5>
  //                   <p>$dwadawdw BTC</p>
  //               </div>

  //               <canvas id="myChart"></canvas>

  //               <div class="buylink">
  //                   <a class="" href="#">Buy Now</a>
  //               </div>
  //           </div>


  // <li class="crypto-item">
  //               <div class="crypto-branding">
  //                   <div class="crypto-logo"><img width="100%" src="https://cdn.coinranking.com/Sy33Krudb/btc.svg"></div>
  //                   <div class="crypto-id">
  //                       <p class="crypto-symbol">BTC</p>
  //                       <p class="crypto-name">Bitcoin</p>
  //                   </div>
  //               </div>
  //               <div class="crypto-price">
  //                   <p>$37943.69</p>
  //               </div>
  //               <div class="crypto-change">
  //                   <p>+$10.01</p>
  //               </div>
  //           </li>

  //           <li class="crypto-item">
  //               <div class="crypto-branding">
  //                   <div class="crypto-logo"><img width="100%" src="https://cdn.coinranking.com/Sy33Krudb/btc.svg"></div>
  //                   <div class="crypto-id">
  //                       <p class="crypto-symbol">BTC</p>
  //                       <p class="crypto-name">Bitcoin</p>
  //                   </div>
  //               </div>
  //               <div class="crypto-price">
  //                   <p>$37943.69</p>
  //               </div>
  //               <div class="crypto-change">
  //                   <p>+$10.01</p>
  //               </div>
  //           </li>



  const ctx = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['','','','','','',],
          datasets: [{
              label: '24H',
              data: [12, 19, 3, 5, 2, 3],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  function showModule(cryptoModule){
    console.log(cryptoModule)
    document.getElementById(cryptoModule).classList.add("show");
  }

  function closeModule(cryptoModule){
    document.getElementById(cryptoModule).classList.remove("show");
  }