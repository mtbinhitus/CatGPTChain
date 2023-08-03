import { useContext } from "react";

import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";

function Blocks() {
    const { blocksData } = useContext(DataContext);
    
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
    const blocks = blocksData.slice(0, blocksData.length/2).map((blockData, index) => {
        return (
            <div key={index} className="flex py-4">
                <p className="w-4/12 text-[#357BAD]">
                    <Link to={`/block/${blockData.index}`}>
                        {blockData.index}
                    </Link>
                </p>
                <p className="w-4/12">{timeConverter(blockData.timestamp)}</p>
                <p className="w-2/12 text-[#357BAD]">
                    <Link to={`/txs?block=${blockData.index}`}>
                        {blockData.transactions.length}
                    </Link>
                </p>
                <p className="w-2/12">{blockData.nonce}</p>
            </div>
        );
    });

    return (
        <section className="bg-white mx-24 px-8 py-4 my-8 border rounded-lg divide-y">
            <p className="pb-4 text-sm text-[#6C757E]">
                Block #{blocksData[blocksData.length/2 - 1].index} to #
                {blocksData[0].index} (Total of {blocksData.length/2} Blocks)
            </p>
            <div className="flex py-4 bg-sky-50">
                <p className="w-4/12 py-3 text-[#6C757E] font-bold">Block</p>
                <p className="w-4/12 py-3 text-[#6C757E] font-bold">Age</p>
                <p className="w-2/12 py-3 text-[#6C757E] font-bold">Txn</p>
                <p className="w-2/12 py-3 text-[#6C757E] font-bold">Nonce</p>
            </div>
            {blocks}
        </section>
    );
}

export default Blocks;
