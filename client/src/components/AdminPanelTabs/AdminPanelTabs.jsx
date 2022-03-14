import { useState } from "react";
import "./AdminPanelTabs.css";
import { ExcursionsManagment } from "./ExcursionsManagment/ExcursionsManagment";
import { PurchasesManagment } from "./PurchasesManagment/PurchasesManagment";
import { UsersManagment } from "./UsersManagement/UsersManagment";

export const AdminPanelTabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      <h1 className="grid place-content-center mt-0 mb-0 font-bold text-xl text-neutral-700">PANEL DE CONTROL</h1>
      <div className={"flex flex-col relative w-auto h-auto mt-2 mb-4 mx-3 break-all div-container"}>
        <div className="flex">
          <button className={toggleState === 1 ? 
            "tabs active-tabs bg-emerald-700 font-bold text-base text-neutral-50" : 
            "tabs bg-emerald-800 bg-opacity-70 font-bold text-base text-neutral-700"
          } onClick={() => toggleTab(1)}>
            Excursiones
          </button>
          <button className={toggleState === 2 ? 
            "tabs active-tabs bg-emerald-700 font-bold text-base text-neutral-50" : 
            "tabs bg-emerald-800 bg-opacity-70 font-bold text-base text-neutral-700"
          } onClick={() => toggleTab(2)}>
            Compras
          </button>
          <button className={toggleState === 3 ? 
            "tabs active-tabs bg-emerald-700 font-bold text-base text-neutral-50" : 
            "tabs bg-emerald-800 bg-opacity-70 font-bold text-base text-neutral-700"
            } onClick={() => toggleTab(3)}>
            Usuarios
          </button>
        </div>
        <div className="content-tabs">
          <div className={toggleState === 1 ? "content  active-content" : "content"}>
            <ExcursionsManagment/>
          </div>
          <div className={toggleState === 2 ? "content  active-content" : "content"}>
            <PurchasesManagment/>
          </div>
          <div className={toggleState === 3 ? "content  active-content" : "content"}>
            <UsersManagment toggleTab={toggleTab}/>
          </div>
        </div>
      </div>
    </div>
  );
}