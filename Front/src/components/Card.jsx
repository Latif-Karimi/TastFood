import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContexReducer";

export const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOpetions = Object.keys(options);
  // let fooditem = props.items;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.fooditem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.fooditem._id,
          price: finalPrice,
          qty: qty
        })
        return
      } 
      else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.fooditem._id,
          name: props.fooditem.name,
          price: finalPrice,
          qty: qty,
          size: size
        })
        return
      }
      return
    }
    await dispatch({
      type: "ADD",
      id: props.fooditem._id,
      name:props.fooditem.name,
      price: finalPrice,
      qty: qty,
      size: size
    })
  }
  useEffect(() => {
    setSize(priceRef.current.value);
  }, [])
  
  let finalPrice = qty * parseInt(options[size]);

 

  return (
    <div>
      <div className="card m-3" style={{ width: "17rem", maxHeight: "500px" }}>
        <img
          src={props.fooditem.img}
          className="card-img-top"
          alt="imag"
          style={{ height: "150px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="Card-title">{props.fooditem.name}</h5>
          <div className="constainer h-100">
            <select
              className="m-2 h-100 bg-primary rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-primary rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOpetions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 m-2 fs-4">${finalPrice}.00</div>
          </div>
          <hr />
          <button
            className={"btn btn-primary justify-center ms-2"}
            onClick={handleAddToCart}
          >
            {" "}
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
