import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Crypto from './components/crypto';

function App() {
  const [crypto, setCrypto] = useState([]);
  const [search] = useState('');


  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCrypto(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

 

  const filteredCrypto = crypto.filter(crypto =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='crypto-app'>
      
       
      
      {filteredCrypto.map(crypto => {
        return (
          <Crypto
            key={crypto.id}
            name={crypto.name}
            price={crypto.current_price}
            symbol={crypto.symbol}
            marketcap={crypto.total_volume}
            volume={crypto.market_cap}
            image={crypto.image}
            priceChange={crypto.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;