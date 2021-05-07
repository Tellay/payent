import { useState, useEffect } from 'react';

import { Container, Image, Details, Buy, Left, Header } from './styles';

import { useParams } from 'react-router-dom';

import fetch from 'node-fetch';

function Product() {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
    .then(result => result.json())
    .then(function(response) {
      setProduct(response);
      setLoading(false);
    });
  }, [id]);

  return loading ? (
    <>
    </>
  ) : (
    <>
      <Header><a href="/">Back</a></Header>
      <Container>
        <Left>
          <Image src={product.imgUrl}></Image>
          <div/>
        </Left>

        <Details>
          <h2>{product.title}</h2>
          <span><h3>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}</h3></span>
          <p>{product.description}</p>
          <Buy>Buy!</Buy>
        </Details>
      </Container>
    </>
  );
}

export default Product;