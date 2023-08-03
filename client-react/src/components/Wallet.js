import { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { useParams, Link } from "react-router-dom";
import request, {
  getBalanceByAddress,
  getInfoWalletById,
  mineBlock,
  createNewAddressById,
} from "../utils/request";
import CreateWallet from "./CreateWallet";
import { DataContext } from "../context/DataContext";

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [addressid, setAddressID] = useState("");
  const [loading, setLoading] = useState(true);
  const { walletInfo, saveWalletInfo } = useContext(DataContext);
  const [errorMsg, setErrorMsg] = useState("");

  const disconnectWallet = async () => {
    saveWalletInfo([]);
  };

  const getBalanceWallet = async () => {
    walletInfo.addresses.forEach(async (ads) => {
      let bal = await getBalanceByAddress(ads);
      if (bal.status === 200) {
        setBalance(balance + bal.data.balance);
      }
      console.log(bal.data.balance);
    });
    console.log(balance);
  };

  const mintCoin = async () => {
    if (addressid.length !== 0) {
      const res = await mineBlock(addressid);
      console.log(res);
      if (res.data.status === 201) alert("Mint successfully!");
    }
  };

  const createNewAddress = async () => {
    const res = await createNewAddressById(walletInfo.id, walletInfo.password);
    console.log(res);
    const res2 = await getInfoWalletById(walletInfo.id);
    if (res2.status === 200) {
      saveWalletInfo({
        id: res2.data.id,
        addresses: res2.data.addresses,
        password: walletInfo.password,
      });
    } else {
      setErrorMsg(res2.data);
      saveWalletInfo([]);
    }
  };

  useEffect(() => {
    if (walletInfo.length !== 0) {
      getBalanceWallet();
    }
    setLoading(false);
  }, [walletInfo]);

  return loading ? (
    <h1 className="text-center">Loading...</h1>
  ) : walletInfo.length === 0 ? (
    <CreateWallet />
  ) : (
    <>
      <div className="bg-white mx-24 px-8 py-4 my-8 border rounded-lg divide-y">
        <h1 className="font-bold">
          Balance{" "}
          <span className="ml-4 font-normal">{balance / 100000000} CatGPT</span>
        </h1>
        <h1 className="font-bold">
          WalletID: <span className="ml-4 font-normal">{walletInfo.id}</span>
        </h1>
        {walletInfo.addresses.map((ads, index) => {
          return (
            <h1 className="font-bold">
              Address {index}: <span className="ml-4 font-normal">{ads}</span>
            </h1>
          );
        })}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label
            htmlFor="password"
            className="block text-sm leading-6 text-red-500"
          >
            {errorMsg}
          </label>
          <button
            onClick={disconnectWallet}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Disconnect your Wallet!
          </button>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            onClick={createNewAddress}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create New Address
          </button>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="font-bold">
            Mine new Block!
          </h1>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Reward Address:
            </label>
            <div className="mt-2 mb-2">
              <input
                id="addressid"
                value={addressid}
                onChange={(e) => setAddressID(e.target.value)}
                name="addressid"
                type="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            onClick={mintCoin}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Mint CatGPT CoinZ
          </button>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="font-bold">
            Send CatGPT to other Address:
          </h1>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              To Address:
            </label>
            <div className="mt-2 mb-2">
              <input
                id="addressid"
                value={addressid}
                onChange={(e) => setAddressID(e.target.value)}
                name="addressid"
                type="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            onClick={mintCoin}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send CatGPT CoinZ
          </button>
        </div>
      </div>
    </>
  );
}

export default Wallet;
