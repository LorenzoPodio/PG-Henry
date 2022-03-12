import React, { useState } from "react";
import OrderReview from "../OrderReview";
import PersonalDetails from "../PersonalDetails";
import Payment from "../Payment";
import style from "./Stepper.module.css";

export default function Stepper() {
  const [step, setStep] = useState("OrderReview");

  const handleClick = (changeStep) => {
    setStep(() => changeStep);
  };

  return (
    <div className={style.stepperContainer}>
      <div className={style.container}>
        <ul className={style.progressbar}>
          {step === "OrderReview" ? (
            <li className={style.active}>
              <button onClick={() => handleClick("OrderReview")}>
                Revisa tu orden
              </button>
            </li>
          ) : (
            <li>
              <button onClick={() => handleClick("OrderReview")}>
                Revisa tu orden{" "}
              </button>
            </li>
          )}
          {step === "PersonalDetails" ? (
            <li className={style.active}>
              <button onClick={() => handleClick("PersonalDetails")}>
                Datos personales{" "}
              </button>
            </li>
          ) : (
            <li>
              <button onClick={() => handleClick("PersonalDetails")}>
                Datos personales{" "}
              </button>
            </li>
          )}
          {step === "Payment" ? (
            <li className={style.active}>
              <button onClick={() => handleClick("Payment")}>
                Método de pago{" "}
              </button>
            </li>
          ) : (
            <li>
              <button onClick={() => handleClick("Payment")}>
                Método de pago
              </button>
            </li>
          )}
        </ul>
      </div>
      <div>
        {step === "OrderReview" && <OrderReview handleClick={handleClick} />}
        {step === "PersonalDetails" && (
          <PersonalDetails handleClick={handleClick} />
        )}
        {step === "Payment" && <Payment handleClick={handleClick} />}
      </div>
    </div>
  );
}
