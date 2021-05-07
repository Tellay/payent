import React from 'react';

import { Body, Image, AlignCenter } from './styles'

function Card(props) {
  console.log(props);
  return (
    <Body>
      <a href={`products/${props.id}`}><Image src={props.imgUrl} alt={props.title}/></a>
      <AlignCenter>
        <span>{props.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}</span>
        <p>{props.description}</p>
        <a href={`products/${props.id}`}>Buy now!</a>
      </AlignCenter>
    </Body>
  );
}

export default Card;