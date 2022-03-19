import { useState } from "react";
import "./AdminPanelTabs.css";
import { ExcursionsManagment } from "./ExcursionsManagment/ExcursionsManagment";
import { PurchasesManagment } from "./PurchasesManagment/PurchasesManagment";
import { UsersManagment } from "./UsersManagement/UsersManagment";
import { AdminMailer } from "./AdminMailer/AdminMailer";

export const AdminPanelTabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div style={{ backgroundColor: '#D8D2CB' }}>
      <h1 className="grid py-8 place-content-center mt-0 mb-0 font-bold text-xl text-black">PANEL DE CONTROL</h1>
      <div className={"flex flex-col relative w-auto h-auto mt-2 mb-4 mx-3 break-all div-container"}>
        <div className="flex">
          <button style={toggleState === 1 ? { backgroundColor: '#EEEEEE' } : { backgroundColor: '#BBBBBB' }}
            className={toggleState === 1 ? 
            "tabs active-tabs font-bold text-base text-neutral-700" : 
            "tabs font-bold text-base text-black"
          } onClick={() => toggleTab(1)}>
            Excursiones
          </button>
          <button style={toggleState === 2 ? { backgroundColor: '#EEEEEE' } : { backgroundColor: '#BBBBBB' }} 
            className={toggleState === 2 ? 
            "tabs active-tabs font-bold text-base text-neutral-700" : 
            "tabs bg-opacity-70 font-bold text-base text-black"
          } onClick={() => toggleTab(2)}>
            Compras
          </button>
          <button style={toggleState === 3 ? { backgroundColor: '#EEEEEE' } : { backgroundColor: '#BBBBBB' }} 
            className={toggleState === 3 ? 
            "tabs active-tabs font-bold text-base text-neutral-700" : 
            "tabs bg-opacity-70 font-bold text-base text-black"
            } onClick={() => toggleTab(3)}>
            Usuarios
          </button>
          <button style={toggleState === 4 ? { backgroundColor: '#EEEEEE' } : { backgroundColor: '#BBBBBB' }} 
            className={toggleState === 4 ? 
            "tabs active-tabs font-bold text-base text-neutral-700" : 
            "tabs bg-opacity-70 font-bold text-base text-black"
            } onClick={() => toggleTab(4)}>
            Contacto clientes
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
          <div className={toggleState === 4 ? "content  active-content" : "content"}>
            <AdminMailer toggleTab={toggleTab}/>
          </div>
        </div>
      </div>
    </div>
  );
}