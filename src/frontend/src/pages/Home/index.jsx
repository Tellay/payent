import { useEffect, useState } from 'react';

import Card from '../../components/Card';

import fetch from 'node-fetch';

import { Cards } from './styles';

function Home() {
  
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
    .then(result => result.json())
    .then(function(response) {
      setProduct(response);
    });
  }, []);

  return (
    <>
      <Cards>
        {
          product.map(product => (
            <Card id={product.id} title={product.title} description={product.description} price={5} imgUrl={product.imgUrl}/>
          ))
        }
      </Cards>
    </>
  );
}

export default Home;