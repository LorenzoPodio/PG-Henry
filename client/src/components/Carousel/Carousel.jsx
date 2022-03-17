import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = ({ Images }) => {
  return (
    <div className="carousel-wrapper">
      <Carousel useKeyboardArrows infiniteLoop>
        {Images?.map((e, i) => {
          return (
            <div key={i}>
              <img
                src={e}
                alt="Not found"
                style={{
                  width: "full",
                  heigth: "auto",
                  justifyContent: "center",
                }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
