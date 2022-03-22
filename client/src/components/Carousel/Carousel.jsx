import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = ({ Images }) => {
  return (
    <div>
      <Carousel useKeyboardArrows infiniteLoop autoPlay interval={6000}>
        {Images?.map((e, i) => {
          return (
            <div key={i}>
              <div>
                <img
                  className="h-96 object-cover rounded-md "
                  src={e}
                  alt="Not found"
                />
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
