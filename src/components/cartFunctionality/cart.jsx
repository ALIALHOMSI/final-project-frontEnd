import React, { useState, useEffect } from "react";
import axios from "axios";
import '../cartFunctionality/cart.css';
import cartBanner from '../../assets/cart-banner.jpeg'

function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/api/cart/getAll");
      const cartItems = await Promise.all(
        res.data.map(async (cartItem) => {
          const productInfoRes = await axios.get(`http://localhost:5000/api/productinfo/get/${cartItem.productInfoId}`);
          const productRes = await axios.get(`http://localhost:5000/api/product/get/${productInfoRes.data.productId}`);
          const productImageRes = await axios.get(`http://localhost:5000/api/productimage/get/${cartItem.productImageId}`);

          const productInfo = productInfoRes.data;
          const product = productRes.data;
          const productImage = productImageRes.data;

          return {
            id: cartItem._id,
            name: product.name,
            description: product.description,
            imageUrl: productImage.imageUrl,
            color: productInfo.color,
            size: productInfo.size,
            price: productInfo.price,
            gender: productInfo.gender,
            type: productInfo.type,
            cartItemQuantity: cartItem.cartItemQuantity,
            productInfoId: cartItem.productInfoId,
          };
        })
      );
      setCartItems(cartItems);

      setLoading(false);
    } catch (error) {
      console.error(error.response);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      const itemPrice = parseFloat(cartItem.price);
      const itemQuantity = parseInt(cartItem.cartItemQuantity);

      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        totalPrice += itemPrice * itemQuantity;
      }
    });
    return totalPrice;
  };

  const handleClearCart = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/delete");

      await Promise.all(
        cartItems.map(async (cartItem) => {
          const productInfoRes = await axios.get(`http://localhost:5000/api/productinfo/get/${cartItem.productInfoId}`);
          const productInfo = productInfoRes.data;
          const updatedQuantity = productInfo.quantity - cartItem.cartItemQuantity;

          await axios.put(`http://localhost:5000/api/productinfo/update/${cartItem.productInfoId}`, {
            quantity: updatedQuantity,
          });
        })
      );

      fetchCartItems();
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

   if (loading) {
    return (
      <div class="center">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-banner">
      <img className="banner" src={cartBanner} alt="cart banner" />
      <h1 className="cart-title">Cart</h1>
      </div>
      <ul className="cart-items">
        {cartItems.map((cartItem) => (
          <li key={cartItem.id} className="cart-item">
           <div className="inside-cart">
            <div className="cart-item-image">
              {cartItem.imageUrl && <img className="cart-item-image" src={cartItem.imageUrl} alt={cartItem.name} />}
              {!cartItem.imageUrl && <p>No Image</p>}
            </div>
            <h1 className="cart-item-name">{cartItem.name}</h1>
            <div className="cart-info">
             
            <p>{cartItem.description}</p>
            <p>{cartItem.color}</p>
            <p>{cartItem.size}</p>
            <p>{cartItem.price}</p>
            <p>{cartItem.gender}</p>
            <p>{cartItem.type}</p>
            <p>In Cart: {cartItem.cartItemQuantity}</p>
            </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
      <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
}

export default Cart;