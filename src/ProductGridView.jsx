import React from 'react';
import { useLocation } from 'react-router-dom';

function ProductGridView() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonData = searchParams.get('data');
  const products = JSON.parse(jsonData);

  return (
    <div style={{background:"green"}}>
      <h1 style={{background:"green"}}>Product Grid View</h1>
      <div className="grid-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
      <p>wellcome</p>
    </div>
  );
}

export default ProductGridView;