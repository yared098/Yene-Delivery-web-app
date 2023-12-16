import React, { useState } from "react";
import "./Card.css";
import Button from "../Button/Button";
import Modal from "react-modal";

function Card1({ food, onAdd, onRemove }) {
  const [count, setCount] = useState(0);
  const { price, Image, name, disc } = food;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const noimage = "https://www.svgrepo.com/show/89274/food.svg";

  const handleIncrement = () => {
    setCount(count + 1);
    onAdd(food);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onRemove(food);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cafe-item js-item">
      <span
        className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}
      >
        {count}
      </span>
      <div className="image__container">
        {/* <img src={Image} alt={""} onClick={handleImageClick} /> */}
        {/* {Image === "" ? (
          <img src={noimage} alt="" onClick={handleImageClick} />
        ) : (
          <img src={Image} alt="" onClick={handleImageClick} />
        )} */}
        {Image === "" ? (
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            onClick={handleImageClick}
          >
            {/* Define your SVG animation here */}
            <circle cx="50" cy="50" r="40" fill="blue">
              <animate
                attributeName="r"
                from="40"
                to="20"
                dur="1s"
                repeatCount="indefinite"
                direction="alternate"
              />
            </circle>
          </svg>
        ) : (
          <img src={Image} alt="" onClick={handleImageClick} />
        )}
      </div>
      <h4 className="card__title">
        {name},<span className="card__price">{price}ETB</span>
      </h4>

      <div className="cafe-item-buttons">
        <Button title={count === 0 ? " add " : "+"} type={"add"} onClick={handleIncrement} />
        {count !== 0 ? (
          <Button title={"-"} type={"remove"} onClick={handleDecrement} />
        ) : (
          ""
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="modal-content">
          <img src={Image} alt={""} className="modal-image" />
          <h2 className="modal-title">{name}</h2>
          <p className="modal-price">Price : {price} ETB</p>
          <p className="modal-description">Description <br /> {disc}</p>
          {/* Additional content can be added here */}
        </div>
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Card1;
