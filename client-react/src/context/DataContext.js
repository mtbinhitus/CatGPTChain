import React from "react";
import { useState } from "react";

import request, { getAllBlocks, getBlockByIndex, getLatestBlock } from "../utils/request";

const DataContext = React.createContext();

function DataContextProvider({ children }) {
    const [blocksData, setBlocksData] = useState([]);
    const [transactions, setTransactions] = useState([]);

    async function getBlockInformation() {
        const lastestBlock = await getLatestBlock();
        console.log(lastestBlock.index);
        console.log(lastestBlock);
        for (let i = 0; i < lastestBlock.index; i++) {
            const info = await getBlockByIndex(
                lastestBlock.index - i
            );

            const blockObject = {
                number: info.index,
                timestamp: info.timestamp,
                hash: info.hash,
                previousHash: info.previousHash,
                nonce: info.nonce,
                transactions: info.transactions,
            };

            setBlocksData((prevData) => {
                return [...prevData, blockObject];
            });

            if (i === 0) {
                setTransactions((prevData) => {
                    return [...prevData, ...blockObject.transactions];
                });
            }
        }
    }

    return (
        <DataContext.Provider
            value={{ getBlockInformation, blocksData, transactions }}
        >
            {children}
        </DataContext.Provider>
    );
}

export { DataContextProvider, DataContext };
