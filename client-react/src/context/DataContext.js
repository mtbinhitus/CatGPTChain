import React from "react";
import { useState } from "react";

import request, { getAllBlocks, getBlockByIndex, getLatestBlock } from "../utils/request";

const DataContext = React.createContext();

function DataContextProvider({ children }) {
    const [blocksData, setBlocksData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [walletInfo, setWalletInfo] = useState([]);

    async function getInfoFromAPI() {
        const lastestBlock = await getLatestBlock();
        console.log(lastestBlock.data.index);

        for (let i = 0; i < lastestBlock.data.index + 1; i++) {
            const info = await getBlockByIndex(
                lastestBlock.data.index - i
            );
            console.log(i);
            console.log(info)

            const blockObject = {
                index: info.data.index,
                timestamp: info.data.timestamp,
                hash: info.data.hash,
                previousHash: info.data.previousHash,
                nonce: info.data.nonce,
                transactions: info.data.transactions,
            };

            setBlocksData((prevData) => {
                return [...prevData, blockObject];
            });

            setTransactions((prevData) => {
                return [...prevData, ...blockObject.transactions];
            });
        }
    }
    async function getBlockInformation() {
        await getInfoFromAPI();
        console.log(blocksData);
    }

    function saveWalletInfo(wallet) {
        setWalletInfo(wallet);
    }


    return (
        <DataContext.Provider
            value={{ getBlockInformation, blocksData, transactions, walletInfo, saveWalletInfo}}
        >
            {children}
        </DataContext.Provider>
    );
}

export { DataContextProvider, DataContext };
