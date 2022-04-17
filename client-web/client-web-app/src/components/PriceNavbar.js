import React from "react";
import { a, NavLink } from "react-router-dom";
export default function Navbar() {
    return (
        <nav
            className="relative  w-full flex flex-wrap items-center justify-between py-3 white text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
        >
            <div className="container-fluid w-full  flex flex-wrap items-center justify-between px-6">
                <button
                    className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bars"
                        className="w-6"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="currentColor"
                            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                        ></path>
                    </svg>
                </button>
                <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
                    
                    <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                        {/* <li className="nav-item p-2">
          <a className="nav-link text-white" >Dashboard</a>
        </li> */}
                        <li className=" focus:gomank-blue nav-item p-2">
                            <NavLink to={'/wash'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Cuci Mobil</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink to={'interior'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Interior Detailing</NavLink>
                        </li>

                        <li className="nav-item p-2">
                            <NavLink to={'/exterior'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Exterior Detailing</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink to={'/engine'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Engine Detailing</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink to={'/window'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Window Detailing</NavLink>
                            
                        </li>
                        <li className="nav-item p-2">
                            <NavLink to={'/tires'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Tire & Rims Detailing</NavLink>
                        </li>
                        <li className="nav-item p-2">
                            <NavLink to={'/complete'}
                                className="nav-link font-semibold  text-gray-900 opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                                href="#"
                            >Complete Detailing</NavLink>
                        </li>

                    </ul>
                    {/* <!-- Left links --> */}
                </div>
                {/* <!-- Collapsible wrapper -->

    <!-- Right elements --> */}
                <div className="flex items-center relative">
                    {/* <!-- Icon --> */}
                    
                    
                </div>

            </div>
        </nav>
    )
}