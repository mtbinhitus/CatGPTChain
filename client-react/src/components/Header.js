import { useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import CATGPT_LOGO from "../assets/images/logo.png";

function Header() {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(event) {
        event.preventDefault();
        const { location } = navigate;
        console.log(location);

        // * if it is not the similar path only then push a new path. It helps to prevent duplicate paths.
        if (location.pathname != `/address/${address}`) {
            navigate.push(`/address/${address}`);
        }

        setAddress("");
    }

    return (
        <header className="flex px-24 py-6 bg-white items-center border-b">
            <Link to="/">
                <img src={CATGPT_LOGO} className="h-10"></img>
            </Link>
            <h1 className="ml-4 text-[#21325B] font-bold text-2xl mr-auto">
                <Link to="/">CatGPT Explorer</Link>
            </h1>
            <form className="w-5/12 ml-4" onSubmit={handleOnSubmit}>
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block text-gray-900 w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search addresses..."
                        required
                        value={address}
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Search
                    </button>
                </div>
            </form>
            <Link to={"/wallet"}>
            <button type="button" className="block ml-20 mr-auto text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                Connect wallet
            </button>
            </Link>
        </header>
    );
}

export default Header;
