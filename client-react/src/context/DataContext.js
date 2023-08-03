import React from "react";
import { useState } from "react";

import request, { getAllBlocks, getBlockByIndex, getLatestBlock } from "../utils/request";

const DataContext = React.createContext();

function DataContextProvider({ children }) {
    const [blocksData, setBlocksData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [walletInfo, setWalletInfo] = useState([]);

    async function getInfoFromAPI(blocks) {
        blocks.forEach(info => {
            console.log(info)

            const blockObject = {
                index: info.index,
                timestamp: info.timestamp,
                hash: info.hash,
                previousHash: info.previousHash,
                nonce: info.nonce,
                transactions: info.transactions,
            };

            setBlocksData((prevData) => {
                return [...prevData, blockObject];
            });

            setTransactions((prevData) => {
                return [...prevData, ...blockObject.transactions];
            });
        });
    }
    async function getBlockInformation() {
        const blocks = await getAllBlocks();
        console.log(blocks);
        await getInfoFromAPI(blocks.data.reverse());
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
