import React from "react";


export const Card = (props) => {

  let options = props.options;
  let priceOpetions = Object.keys(options
    )
  return (
    <div>
      <div className="card m-3" style={{ width: "17rem", maxHeight: "500px" }}>
        <img
          src={props.imgSrc}
          className="card-img-top"
          alt="imag"
          style={{ height: "150px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="Card-title">{props.foodName}</h5>
          <div className="constainer h-100">
            <select className="m-2 h-100 bg-primary">
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-primary rounded">
              
                 {priceOpetions.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                 })}

            </select>
            <div className="d-inline"> Total Price</div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
