import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../features/cart/cartSlice";

const Quantity = ({ cartID, max, quantity }) => {
  const [counter, setCounter] = useState(quantity);
  const dispatch = useDispatch();

  let decrement, increment;

  if (counter > 1) {
    decrement = () => {
      setCounter(counter - 1);
      const temp = counter - 1;
      const cartParams = {
        quantity: temp,
        id: cartID,
      };
      dispatch(updateCart(cartParams));
    };
  }

  if (counter < max) {
    increment = () => {
      setCounter(counter + 1);
      const temp = counter + 1;
      const cartParams = {
        quantity: temp,
        id: cartID,
      };
      dispatch(updateCart(cartParams));
    };
  }

  let handleChange = (e) => {
    setCounter(e.target.value);

    if (e.target.value > max) {
      setCounter(max);
    }
    if (e.target.value < 0) {
      setCounter(1);
    }
  };
  return (
    <div>
      {" "}
      <div className="quantity-control text-center">
        <button className="quantity-btn" onClick={decrement}>
          <svg viewBox="0 0 409.6 409.6">
            <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
          </svg>
        </button>
        <input
          type="number"
          className="quantity-input"
          value={counter}
          name="quantity"
          min="1"
          max={max}
          onChange={handleChange}
          //cart._doc.quantity
        />
        <button className="quantity-btn" onClick={increment}>
          <svg viewBox="0 0 426.66667 426.66667">
            <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Quantity;
