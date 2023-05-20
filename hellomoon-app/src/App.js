import React, { useState, useEffect } from 'react';
import './App.css';
import { RestClient, CollectionFloorpriceRequest } from '@hellomoon/api';

const App = () => {
  const [floorPrice, setFloorPrice] = useState(null);
  const [error, setError] = useState(null);

  const client = new RestClient("{{4cc76a3f-5514-4818-9fd1-7387d51196b6}}");
  const helloMoonCollectionId = "9b4d3907d615294c5d4fdc4edf1e9b1e"; // y00ts

  useEffect(() => {
    client.send(
      new CollectionFloorpriceRequest({
        helloMoonCollectionId,
      })
    )
    .then((result) => {
      setFloorPrice(result.floorPrice);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setFloorPrice(null);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>HelloMoon Floor Price</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          floorPrice !== null ? (
            <p>Current Floor Price: {floorPrice}</p>
          ) : (
            <p>Loading floor price...</p>
          )
        )}
      </header>
    </div>
  );
}

export default App;
