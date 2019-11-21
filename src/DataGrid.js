import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import faker from 'faker'
import './App.css';
import TextInput from 'react';
import Button from 'react';


class DataGrid extends React.Component {

  constructor(props) {

      super(props);

      console.info("Constructor being called");
      console.info("props " + props.searchTerm);
      console.info("key " + props.key);
      console.info("coinLimit " + props.coinLimit);
      this.populateJsonRows=this.populateJsonRows.bind(this);

      this.state = {
          coinLimit : props.coinLimit,
          coinMarketCap : [],
          coinDescriptions : [],
          resultData : [],
          finalResultData : [],
          rows : []
      };

  }


  componentDidMount() {

    console.log("fetching data for " + this.props.coinLimit)

    //axios.get('coinPrices.json')
    axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=' + this.state.coinLimit)
      .then(res => {
        var coinMarketCap = res.data;
        var resultData = [];
        var i = 0;
        coinMarketCap.map((marketCap) => {
            resultData[marketCap.symbol] = marketCap;
            i++;

        });

        this.setState( { coinMarketCap });
        this.setState( { resultData })
        //console.log("Found market lookup i=" + i);

      }).then(() => {

      axios.get('output.json')
        .then(res => {
            var coinDescriptions = res.data;
            var finalResultData = [];

            if(coinDescriptions == null) {
              console.info("Could not parse JSON text");
            }
            var i = 0;
            coinDescriptions.map((descr) => {

              var coinDescr = this.state.resultData[descr.ticker];

              if(coinDescr != null) {


                coinDescr["description"] = descr.description;
                coinDescr["category"] = descr.category;
                coinDescr["image"] = "images/" + descr.ticker + ".png";
                coinDescr["ticker"] = descr.ticker;
                coinDescr["name"] = descr.name;
                coinDescr["founded_year"] = descr.founded_year;
                coinDescr["ico_raise"] = descr.ico_raise;
                coinDescr["city"] = descr.city;
                coinDescr["country"] = descr.country;
                coinDescr["web_site"] = descr.web_site;
                coinDescr["white_paper"] = descr.white_paper;
                coinDescr["code_base"] = descr.code_base;
                finalResultData[descr.ticker] = coinDescr;
                i++;
                console.info("url " + coinDescr["web_site"]);
              }

            });
            this.setState( {finalResultData} )

            console.info("After combine with json i=" + i);

            // set populated rows
            this.populateJsonRows();
        })
        .catch( (error) => {
          console.log(error);
        });
      });

  }

  populateJsonRows() {

    let jsonData = this.state.finalResultData;
    let rows = [];
    let unsortedRows = [];
    let i = 0;
    console.info("ResultData of length " + this.state.finalResultData.length);

    Object.keys(jsonData).map(function (key)  {
        var coinDescr = jsonData[key];
        //console.info("Populating coin row " + coinDescr.ticker);
        //console.info("Row i=" + i);

        var color = "element-data-24h-black";
        if(coinDescr.percent_change_24h > 0) {
          color = "element-data-24h-green";
          //console.info("color green");
        } else if (coinDescr.percent_change_24h < 0) {
          color = "element-data-24h-red";
          //console.info("color red");
        }

        var marketCap = Number(coinDescr.available_supply * coinDescr.price_usd);
        if(marketCap > 1000000000) {
          marketCap = marketCap / 1000000000;
          marketCap = parseFloat(marketCap).toFixed(3);
          marketCap = "$ " + marketCap + " Billion";
        } else if(marketCap > 1000000){
          marketCap = marketCap / 1000000;
          marketCap = parseFloat(marketCap).toFixed(3);
          marketCap = "$ " + marketCap + " Million";
        } else {
          marketCap = marketCap;
          marketCap = "$ " + marketCap;
        }

        var availableSupply = Number(coinDescr.available_supply);
        if(availableSupply > 1000000000) {
          availableSupply = availableSupply / 1000000000;
          availableSupply = parseFloat(availableSupply).toFixed(3);
          availableSupply = availableSupply + " Billion coins";
        } else if(availableSupply > 1000000){
          availableSupply = availableSupply / 1000000;
          availableSupply = parseFloat(availableSupply).toFixed(3);
          availableSupply = availableSupply + " Million coins";
        } else {
          availableSupply = availableSupply;
          availableSupply = availableSupply + " coins";
        }



        unsortedRows[i] = {
            id: i,
            rank: parseInt(coinDescr.rank),
            ticker: coinDescr.ticker,
            price_usd: coinDescr.price_usd,
            description: coinDescr.description,
            category: coinDescr.category,
            percent_change_24h: coinDescr.percent_change_24h,
            availableSupply: availableSupply,
            totalSupply: coinDescr.total_supply,
            logo: faker.image.avatar(),
            name: coinDescr.name,
            image: coinDescr.image,
            marketCap: marketCap,
            foundedYear: coinDescr.founded_year,
            ico: coinDescr.ico_raise,
            webSite: coinDescr.web_site,
            codeBase: coinDescr.code_base,
            whitePaper: coinDescr.white_paper,
            color: color,
            isHidden: false

        };
        //console.info("marketCap " + unsortedRows[i].marketCap);
        i++;

    });

    rows = unsortedRows.sort((a,b) => parseFloat(a.rank) < parseFloat(b.rank));

    //rows.map((coin) => console.info("rank " + coin.rank));

    this.setState({ rows });

    //this.sortRows("marketCap");

  }

  sortRows(sortKey) {

    let rows = [];
    console.info("Total rows " + this.state.rows.length);
    rows = [].concat(this.state.rows)
      .sort((a,b) => a.marketCap < b.marketCap);

    this.setState( { rows });

  }

  onPressLearnMore() {

  }



  render() {


    const byAlpha = function(a, b) {
      var nameA = a.rank;
      var nameB = b.rank;

      if (nameA < nameB) { return -1 }
      if (nameA > nameB) { return 1 }
      return 0
    };

    // search term
    var searchItems = [];

    var i = 0;



    this.state.rows.map((coin) => {
      var add = false;

      if(this.props.searchTerm != null &&
        this.props.searchTerm.length > 2) {
          if(coin.ticker.toUpperCase().includes(this.props.searchTerm.toUpperCase())) {
            add = true;
          } else if(coin.name.toUpperCase().includes(this.props.searchTerm.toUpperCase())) {
            add = true;
          } else if(coin.category.toUpperCase().includes(this.props.searchTerm.toUpperCase())) {
            add = true;
          } else if(coin.description.toUpperCase().includes(this.props.searchTerm.toUpperCase())) {
            add = true;
          } else if(this.props.searchTerm.length == 0) {
            add = true;
          }
      } else {
        add = true;
      }

      if(add) {
        searchItems[i] = coin;
        i++;
      }


    });

    console.info("Found " + i + " coins");



    const listItems = searchItems.sort(byAlpha)
      .map((coin) =>



    <DataGridElement
      key={coin.ticker}
      rank={coin.rank}
      name={coin.name}
      ticker={coin.ticker}
      price_usd={coin.price_usd}
      category={coin.category}
      description={coin.description}
      image={coin.image}
      marketCap={coin.marketCap}
      ico={coin.ico}
      foundedYear={coin.foundedYear}
      features={coin.features}
      availableSupply={coin.availableSupply}
      percent_change_24h={coin.percent_change_24h}
      webSite={coin.webSite}
      whitePaper={coin.whitePaper}
      codeBase={coin.codeBase}
      color={coin.color}
      />

    );


    return (
      <div id="data-grid">
      <div id="table-head-row">
        <div id="table-head-item">Rank</div>
        <div id="table-head-item">Coin</div>
        <div id="table-head-item">Price</div>
        <div id="table-head-item">24H % Change</div>
        <div id="table-head-item">Cap</div>
        <div id="table-head-item">Supply</div>
        <div id="table-head-item">Description</div>
      </div>
          <div id="coin-items">
            <ul>
              {listItems}
            </ul>
          </div>
      </div>
    )

  }
}


class EmptyDataGridElement extends React.Component {

  render() {
    return (<div/>)
  }
}

class DataGridElement extends React.Component {

  render(){

    var coinCapUrl = "https://coinmarketcap.com/currencies/" + this.props.name;

    var description = this.props.description;
    description = description.replace(/,/g, ', ');
    description = description.replace(/\.$/g, '');

    var category = this.props.category;
    category = category.replace(/,/g, ', ').toUpperCase();

    category = category.replace(/\./g, '').toUpperCase();
    category = category.replace(/,$/g, '');

    var coinIdKey = this.props.ticker + " _id";

    return (
      <div>

      <div className="element-wrapper" key={coinIdKey}>

          <div id="element-row">
            <div id="element-data-rank" title="Rank">
              {this.props.rank}
              </div>

            <div id="element-data-logo">
                <img key="{this.props.name}-logo" src={this.props.image} width="50px" height="50px"/>
            </div>

            <div id="element-data-name" title="Coin">
            <a href={coinCapUrl}>
              {this.props.name}
            </a>
            </div>
            <div id="element-data-ticker" title="Ticker">{this.props.ticker}</div>
            <div id="element-data-price" title="Price">$
            {new Intl.NumberFormat('en-US', {
                style: 'decimal',
                currency: 'USD'
            }).format(this.props.price_usd)}
            </div>
            <div className={this.props.color} title="24HChange">
            {new Intl.NumberFormat('en-US', {
                style: 'decimal',
            }).format(this.props.percent_change_24h)}%
            </div>
            <div id="element-data-market_cap" title="Market Cap.">
              {this.props.marketCap}
            </div>
            <div id="element-data-available_supply" title="Current supply">{
            this.props.availableSupply}</div>

          </div>
          <div id="element-row">
            <div id="element-data-founded_year" title="Founded Year"> Founded : {this.props.foundedYear}</div>
            <div id="element-data-founded_year" title="WebSite"> {this.props.webSite}</div>
            <div id="element-data-founded_year" title="WhitePaper"> <a href={this.props.whitePaper}><img src="white-paper.png" width="25px" height="25px"/></a></div>
            <div id="element-data-founded_year" title="codeBase"> <a href={this.props.codeBase}><img src="code-icon.png" width="25px" height="25px"/></a></div>

          </div>
          <div id="element-row">
            <div id="element-data-description" title="Description">{description}</div>
          </div>
          <div id="element-row">
            <div id="element-data-category" title="Type">{category}</div>
          </div>
      </div>
      </div>

    )
  }
}

export default DataGrid;
