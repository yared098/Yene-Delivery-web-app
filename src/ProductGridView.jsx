// import React from 'react';
// import { useState, useEffect } from "react";
// function ProductGridView() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//       const queryParams = new URLSearchParams(window.location.search);
//       const jsonData = queryParams.get('data');
//       if (jsonData) {
//         const parsedData = JSON.parse(jsonData);
//         setProducts(parsedData);
//       }
//     }, []);
  

//   return (
//     <div style={{background:"green"}}>
//       <h1 style={{background:"green"}}>Product Grid View</h1>
//       <div className="grid-container">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <h2>{product.name}</h2>
//             <p>Price: {product.price}</p>
//           </div>
//         ))}
//       </div>
//       <p>wellcome</p>
//     </div>
//   );
// }

// export default ProductGridView;