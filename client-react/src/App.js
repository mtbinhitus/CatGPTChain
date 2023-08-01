import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { DataContext } from "./context/DataContext";

import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Blocks from "./components/Blocks";
import Block from "./components/Block";
import Transactions from "./components/Transactions";
import Transaction from "./components/Transaction";
import AddressDetails from "./components/AddressDetails";
import Footer from "./components/Footer";

function App() {
    const { getBlockInformation } = useContext(DataContext);

    useEffect(() => {
        getBlockInformation();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50">
                <Routes>
                    <Route exact path="/" element={<Main/>} />
                    <Route exact path="/blocks" element={<Blocks/>} />
                    <Route path="/block/:blockNumberOrHash" element={<Block />} />
                    <Route exact path="/txs" element={<Transactions />} />
                    <Route path="/tx/:hash" element={<Transaction />} />
                    <Route path="/address/:address" element={ <AddressDetails />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
