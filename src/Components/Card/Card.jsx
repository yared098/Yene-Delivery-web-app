// import React, { useState } from "react";
// import "./Card.css";
// import Button from "../Button/Button";
// function Card({ food, onAdd, onRemove }) {
//   const [count, setCount] = useState(0);
//   const { title, Image, price, id } = food;

//   const handleIncrement = () => {
//     setCount(count + 1);
//     onAdd(food);
//   };
//   const handleDecrement = () => {
//     setCount(count - 1);
//     onRemove(food);
//   };

//   return (
//     <div className="card">
//       <span
//         className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
//       >
//         {count}
//       </span>
//       <div className="image__container">
//         <img src={Image} alt={title} />
//       </div>
//       <h4 className="card__title">
//         {title} . <span className="card__price">$ {price}</span>
//       </h4>

//       <div className="btn-container">
//         <Button title={"+"} type={"add"} onClick={handleIncrement} />
//         {count !== 0 ? (
//           <Button title={"-"} type={"remove"} onClick={handleDecrement} />
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;

import React, { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";
// import Modal from "react-modal";

function Card1({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const { price, Image, title } = food;
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };

  const handleImageClick = () => {
    // setIsModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="cafe-item js-item">
      <span
        className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
      <div className="image__container">
        <img src={Image} alt={""} onClick={handleImageClick} />
      </div>
      <h4 className="card__title">
        {"burger"}<span className="card__price">{price}</span>
      </h4>

      <div className="cafe-item-buttons">
        <Button title={count === 0 ? " add " : "+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>

      {/* <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="modal-content">
          <img src={image} alt={""} className="modal-image" />
          <h2 className="modal-title">{name}</h2>
          <p className="modal-price">Price : {price} ETB</p>
          <p className="modal-description">Description <br /> {disc}</p>
        </div>
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </Modal> */}
    </div>
  );
}

export default Card1;
