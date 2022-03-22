import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = ({ Images }) => {
  return (
    <div className="w-full rounded-md">
      <Carousel useKeyboardArrows infiniteLoop autoPlay interval={6000} showThumbs={false}>
        {Images?.map((e, i) => {
          return (
            <div key={i}>
              <img className="h-96 m-o object-cover rounded-md"
                src={e}
                alt="Not found"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
