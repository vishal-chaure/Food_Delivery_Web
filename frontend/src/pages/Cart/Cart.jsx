import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const [message, setMessage] = useState("");  // For capturing the message to send
  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);  // Update message when the user types
  };

  const handleOrderSubmission = async () => {
    const orderData = {
      cartItems, 
      totalAmount: getTotalCartAmount() + 2,  // Add delivery fee
      message,  // User's message
    };

    // Send order data to the backend API
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        // Navigate to order confirmation page
        navigate('/order-confirmation');
      } else {
        alert("Error placing order!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className='cart'>
      {/* Cart Items Section */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='cart-hr'/>
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <button onClick={()=>removeFromCart(item._id)} className="custom-button">Remove</button>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>

      {/* Cart Total Section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={handleOrderSubmission}>PROCEED TO CHECKOUT</button>
        </div>

        {/* Message Section */}
        <div className="cart-promocode">
          <div>
            <p>Message To The Restaurant</p>
            <div className="cart-promocode-inputs">
              <input 
                type="text" 
                placeholder="eg. 2 extra packets of oregano" 
                value={message} 
                onChange={handleMessageChange} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;