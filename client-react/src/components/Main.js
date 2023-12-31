import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { DataContext } from "../context/DataContext";

function Main() {
  const { blocksData, transactions,  } = useContext(DataContext);

  useEffect(() => {
  }, [blocksData, transactions]);

  return (
    <div className="flex px-24 py-8 items-stretch">
      <div className="text-left px-4 border rounded-lg divide-y w-1/2 mr-2 bg-white">
        <h1 className="py-4 text-xl font-bold">Latest Blocks</h1>
        {blocksData.length ? (
          blocksData.slice(0, blocksData.length/2).map((block, index) => {
            if (index >= 10) {
              return;
            }

            return (
              <div
                key={block.index}
                className="flex justify-between py-4 items-center"
              >
                <div className="flex w-1/2 items-center">
                  <h2 className="mr-4 bg-gray-100 rounded-lg px-4 py-3">Bk</h2>
                  <Link
                    to={`/block/${block.index}`}
                    className=" text-[#357BAD]"
                  >
                    {block.index}
                  </Link>
                </div>
                <div className="w-60">
                  <p>
                    Hash {" "}
                    <span className="text-[#357BAD]">
                      <Link to={`/address/${block.hash}`}>
                        {block.hash.slice(0, 12)}
                      </Link>
                    </span>
                    ...
                  </p>
                  <p className="text-[#357BAD]">
                    <Link to={`/txs?block=${block.number}`}>
                      {block.transactions.length} txns
                    </Link>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
        <div className="p-4 text-center">
          <Link
            to="/blocks"
            className="block bg-sky-100 text-sky-500 text-xs p-2 rounded-md"
          >
            View All Blocks
          </Link>
        </div>
      </div>
      <div className="text-left px-8 border rounded-lg  divide-y w-1/2 ml-2 bg-white">
        <h1 className="py-4 text-xl font-bold">Latest Transactions</h1>
        {transactions.length ? (
          transactions.slice(0, blocksData.length/2).map((tx, index) => {
            if (index >= 10) {
              return;
            }

            return (
              <div
                key={index}
                className="flex justify-between py-4 items-center"
              >
                <div className="flex items-center">
                  <h2 className="mr-4 bg-gray-100 rounded-full px-4 py-3">
                    Tx
                  </h2>
                  <Link to={`/tx/${tx.hash}`} className="text-[#357BAD]">
                    {tx.hash.slice(0, 16)}...
                  </Link>
                </div>
                {tx.type !== "reward" && tx.type !== "genesis" && tx.type !== "fee" ? (
                  <p>
                    From{" "}
                    <span className="text-[#357BAD]">
                      <Link to={`/address/${tx.data.inputs[0].address}`}>
                        {tx.data.inputs[0].address.slice(0, 12)}
                      </Link>
                    </span>
                    ...
                  </p>
                ) : (
                  <p>{tx.type}</p>
                )}
                {tx.type !== "genesis" ? (
                  <p>
                    To{" "}
                    <span className="text-[#357BAD]">
                      <Link to={`/address/${tx.data.outputs[0].address}`}>
                        {tx.data.outputs[0].address.slice(0, 12)}
                      </Link>
                    </span>
                    ...
                  </p>
                ) : (
                  <></>
                )}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
        <div className="p-4 text-center">
          <Link
            to="/txs"
            className="block bg-sky-100 text-sky-500 text-xs p-2 rounded-md"
          >
            View All Transactions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
