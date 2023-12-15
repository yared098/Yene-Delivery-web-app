import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";



const tele = window.Telegram.WebApp;

tele.MainButton.text = "Cart Lists";

tele.MainButton.show().onClick(() => {
  var x = document.getElementById('section-1');
  var y = document.getElementById('section-cart');
  x.style.display = 'none';
  y.style.display = "block";

  tele.MainButton.text = "Order Now";
  tele.MainButton.show().onClick(() => {

    if (String(tele.MainButton.tele.text) === "Click to Pay") {
      tele.MainButton.text = "chack out clicked";
      tele.MainButton.show();

    } else {
      tele.MainButton.text = "chack out  els condition";
      tele.MainButton.show();

    }

  });

  tele.BackButton.isVisible = true;
  tele.BackButton.onClick(() => {
    var xx = document.getElementById('section-1');
    var yy = document.getElementById('section-cart');
    xx.style.display = 'block';
    yy.style.display = "none";
    tele.MainButton.text = "Cart Lists";
    tele.BackButton.isVisible = false;

  });
});

function App() {
  const [products, setProducts] = useState([]);
  const [infoName, setInfoName] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const infoParam = queryParams.get('info');

    // Parse the info parameter as JSON if needed
    const infoData = infoParam ? JSON.parse(infoParam) : {};
    const name = infoData.name;

    setInfoName(name);
    
    const jsonData = queryParams.get('data');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      setProducts(parsedData);
    }
  }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    tele.ready();
    tele.MainButton.title=infoName;
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  // const onCheckout = () => {
  //   tele.MainButton.text = "Pay :)";
  //   tele.MainButton.show();
  // };
  const editbtn = function () {
    var xy = document.getElementById('section-1');
    var yx = document.getElementById('section-cart');
    xy.style.display = 'block';
    yx.style.display = "none";

  };
  useEffect(() => {
    tele.ready();
    var yy = document.getElementById('section-cart');
    yy.style.display = 'none';
  }, []);

  const handleButtonClick = () => {
    const jsonData = JSON.stringify(cartItems)
    tele.MainButton.showProgress(true);

    window.Telegram.WebApp.MainButton.text = " pay ";

    window.Telegram.WebApp.MainButton.show();
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(jsonData);

    }
  }
  
  return (
    <>

      <section className="cafe-page cafe-items " id="section-1">
        
        {/* <Cart cartItems={cartItems} onCheckout={onCheckout} /> */}
        <div className="cafe-items"id="showpr">
          {products.map((food) => {
            return (
              <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
            );
          })}
        </div>
      </section>
      {/* this is section one   end*/}

      <section className="order-view" id="section-cart">
        <div className="order-view cafe-order-header-wrap">
          <h2 className="cafe-order-header">Your Order</h2>
          <button onClick={editbtn}>Edit</button>
        </div>
        {cartItems.map((item) => (
          <div key={item.id} className="order-view cart-item">
            <div className="item-details">
              <img src={item.Image} alt={item.title} className="cafe-order-item-photo" />
              <div className="order-view cafe-order-item-label">
                <div className="cafe-order-item-title">
                  {item.name} <span className="cafe-order-item-counter"><span className="js-order-item-counter">{item.quantity}</span>x</span>
                </div>
                <div className="cafe-order-item-description">{"Total price " + item.quantity * item.price + " : ETB"}</div>
              </div>
              <div className="cafe-order-item-price js-order-item-price">{" " + item.price + "ETB"}</div>
            </div>
          </div>
        ))}

        <section className="order-view" id="section-cart">
          <div className="cart-items">
            {/* Add your floating action button here */}
            <div className="floating-action-button">
              <button onClick={handleButtonClick} className="fab">Pay</button>
            </div>
          </div>
          <div className="comment-section">
            <h3 className="comment-section-title">Write Comment</h3>
            <form className="comment-form">
              <textarea className="comment-input" placeholder="Add a comment"></textarea>
            </form>
            <div className="comments"></div>
          </div>
        </section>
      </section>
      {/* end of section 2 */}
    </>
  );
}

export default App;
