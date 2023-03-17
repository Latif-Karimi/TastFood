import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";
import kabab from "../components/pics/bimag.png";
import karhai from "../components/pics/karhai.png";
import qabili from "../components/pics/qabili.png";
import { Navbar } from "../components/Navbar";
import { Footer } from "../screen/Footer";
  
export const Home = () => {
  const [search,setSearch] = useState ('')
  const [foodCategory, setCategory] = useState([]);
  const [fooditem, setFooditem] = useState("");
  const loadData = async () => {
    let response = await fetch("http://localhost:3333/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFooditem(response[0]);
    setCategory(response[1]);
    // console.log(response[0],response[1])
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
            // style={{objectFit:"contain !important"}}
          >
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  
                </div>
              </div>

              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={qabili}
                    className="d-block w-100"
                    style={{ filter: "brightness(40%)" }}
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={kabab}
                    className="d-block w-100"
                    style={{ filter: "brightness(40%)" }}
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={karhai}
                    className="d-block w-100"
                    style={{ filter: "brightness(40%)" }}
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          {foodCategory !== []
            ? foodCategory.map((data) => {
                return (
                  <div className="row">
                    <div key={data._id} className="fs-3 m-3">
                      {data.categoryName}
                    </div>
                    <hr />
                    {fooditem !== [] ? (
                      fooditem
                        .filter(
                          (item) => (item.categoryName === data.categoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems._id}
                              className=" col-12 col-md-6 col-lg-3"
                            >
                              <Card
                                fooditem={filterItems}
                                options={filterItems.options[0]}
                                
                              ></Card>
                            </div>
                          );
                        })
                    ) : (
                      <div> No Such Data Found</div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
        <Footer />
      </div>
    </div>
  );
};
