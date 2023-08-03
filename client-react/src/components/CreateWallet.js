import { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import request, { createNewWalletByPassword, getInfoWalletById } from "../utils/request";
import CATGPT_LOGO from "../assets/images/logo.png";
import { DataContext } from "../context/DataContext";
import PopupModal from "./PopupModal";
import { Link, useNavigate, useParams } from "react-router-dom";

function CreateWallet() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(true);
  const { walletInfo, saveWalletInfo } = useContext(DataContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [walletid, setWalletId] = useState("");

  const createNewWallet = async () => {
    console.log("Create new wallet");
    console.log(password);
    const res = await createNewWalletByPassword(password);
    console.log(res);
    if(res.status === 400)
    {
        setErrorMsg(res.data);
    }
    else {
        saveWalletInfo({id: res.data.id, addresses: [], password: password});
        saveWalletInfo(res.data);
    }
    console.log(walletInfo);
  };

  const connectWallet = async () => {
    const res = await getInfoWalletById(walletid);
    if(res.status === 200)
    {
        saveWalletInfo({id: res.data.id, addresses: res.data.addresses, password: password});
    }
    else {
        setErrorMsg(res.data);
        saveWalletInfo([]);
    }
  }

  const accessComponent = () => {
    setIsCreate(!isCreate);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <h1 className="text-center">Loading...</h1>
    
  ) : isCreate ? (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={CATGPT_LOGO}
          alt="CatGPTChain"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a New CatGPT Wallet
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <label
                htmlFor="password"
                className="block text-sm leading-6 text-red-500"
              >
                {errorMsg}
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={createNewWallet}
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Wallet
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Have a CatGPT Wallet?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={accessComponent}
          >
            Access Wallet
          </a>
        </p>
      </div>
    </div>
  ) : (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={CATGPT_LOGO}
            alt="CatGPTChain"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Access CatGPT Wallet
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                WalletID
              </label>
              <div className="mt-2">
                <input
                  id="walletid"
                  value={walletid}
                  onChange={(e) => setWalletId(e.target.value)}
                  name="walletid"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <label
                  htmlFor="password"
                  className="block text-sm leading-6 text-red-500"
                >
                  {errorMsg}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={connectWallet}
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Access Wallet
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not have a CatGPT Wallet?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={accessComponent}
            >
              Create Wallet
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default CreateWallet;
