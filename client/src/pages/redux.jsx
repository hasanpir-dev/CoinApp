import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeCart } from "../features/cartSlice";

const Redux = () => {
  const { quantity } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <nav>
      navbar
      <p>{quantity}</p>
      <div>
        {cartItems &&
          cartItems.map((cartItem) => (
            <p
              key={cartItem.id}
              onClick={() => dispatch(removeCart(cartItem.id))}
            >
              {cartItem.title}
            </p>
          ))}
      </div>
      <button onClick={() => dispatch(clearCart())}>Clear Carts</button>
    </nav>
  );
};

export default Redux;
