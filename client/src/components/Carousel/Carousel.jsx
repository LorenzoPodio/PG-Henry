import React from "react";
import { ReactDOM } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useExcursionsContext } from "../../context/ExcursionsContext";

export default ({ Images }) => {
  const { excursionByid } = useExcursionsContext();
  console.log("excursionByid", excursionByid.Images);
  var algo = excursionByid.Images;
  console.log("algo", algo);
  return (
    <div class="carousel-wrapper">
      <Carousel useKeyboardArrows infiniteLoop>
        {Images?.map((e) => {
          return (
            <div>
              <img
                src={e}
                alt="Image not found"
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
