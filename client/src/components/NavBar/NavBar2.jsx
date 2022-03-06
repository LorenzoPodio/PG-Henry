/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'


export function NavBar2() {

  const [navigation, setNavigation] = useState([
    { name: 'Excursiones', href: '/excursiones', current: false },
    { name: 'Tarifas', href: '/tarifas', current: false },
    { name: 'Sobre Nosotros', href: '/nosotros', current: false },
    { name: 'Panel Admin', href: '/panelAdmin', current: false },
    { name: 'Registrarse', href: '/registro', current: false },
    { name: 'Login', href: '/login', current: false }
  ])
  

  
  function handleClick(e){
    console.log(e.target.value)
    navigation.map((item) => {
      if(item.name === e.target.value){
        item.current=true
      } else {
        item.current=false
      }
    })
    setNavigation(navigation)
    console.log(navigation)
  }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="bg-sky-600">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <button value={""} onClick={(e) => handleClick(e)}>
                  <Link to="/">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://img.icons8.com/color/48/000000/around-the-globe.png"
                    alt="Workflow"
                  />
                  </Link>
                  </button>
                  <button value={""} onClick={(e) => handleClick(e)}>
                  <Link to="/">
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://img.icons8.com/color/48/000000/around-the-globe.png" //desktop logo + nombre
                    alt="Workflow"
                  />
                  </Link>
                  </button>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      
                      <Link key={item.href} to={item.href}>
                      <button
                        key={item.name}
                        value={item.name}
                        onClick={(e) => handleClick(e)}
                        className={classNames(
                          item.current ? 'bg-sky-900 text-white' : 'text-white hover:bg-sky-500 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </button>
                      </Link>
                      
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link to="/compras">
                <button
                  type="button"
                  className="bg-sky-600 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Carrito</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                </Link>        
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-sky-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-sky-600 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-sky-500' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-sky-500' : '', 'block px-4 py-2 text-sm text-white')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Disclosure.Button>
                      <Link key={item.href} to={item.href}>
                      <button
                        key={item.name}
                        value={item.name}
                        onClick={(e) => handleClick(e)}
                        className={classNames(
                          item.current ? 'bg-sky-900 text-white' : 'text-white hover:bg-sky-500 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </button>
                      </Link>
                      </Disclosure.Button>
                    ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}