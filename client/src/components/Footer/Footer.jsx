import { React } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SocialIcon } from "react-social-icons";
import "./Footer.css";
import ContactUs from "../ContactUs/ContactUs";

export const Footer = () => {
  return (
    <div className="footer-container bg-gray-500 bottom-0 w-full">
      <div className="social-container">
        <p className="text">
          Realizado por Henry´s Students. Todos los derechos reservados
        </p>
      </div>
      <div className="social-container">
        <div className="social">
          <SocialIcon
            url="https://facebook.com"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </div>
        <div className="social">
          <SocialIcon
            url="https://twitter.com"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </div>
        <div className="social">
          <SocialIcon
            url="https://google.com"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </div>
        <div className="social">
          <SocialIcon
            url="instagram.com"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </div>
        <div className="social">
          <SocialIcon
            url="https://www.linkedin.com/"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </div>
        <div className="social">
          <SocialIcon
            url="https://github.com/LorenzoPodio/PG-Henry"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        </div>
      </div>
      <div>
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className=" flex bg-gray-500 p-1 rounded-md text-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">ContactUs</span>
              <h3>Contactanos</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </Menu.Button>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              className=" origin-top-right absolute bottom-10 right-0 mt-0 w-auto rounded-md shadow-lg  bg-sky-600 ring-1 ring-black ring-opacity-5 focus:outline-none justify-center flex"
              style={{ zIndex: "1" }}
            >
              <Menu.Item>
                {({ active }) => <ContactUs className="" />}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
