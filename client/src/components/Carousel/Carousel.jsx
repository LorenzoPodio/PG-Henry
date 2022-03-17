import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

Carousel = ({ Images }) => {
  return (
    <div class="carousel-wrapper">
      <Carousel useKeyboardArrows infiniteLoop>
        {Images?.map((e) => {
          return (
            <div>
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

export default Carousel;
