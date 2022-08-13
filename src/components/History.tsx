import React from "react";
import { HistoryProps } from "../../@types/AppTypes";
import ZipCode from "./ZipCode";

export default function History({searchHistory}:HistoryProps) {
    return (
    <>
        <div id="historyHeader">
            <div className="title">Search History</div>
            <button id="clearButton">Clear</button>
        </div>
        <div>
            {searchHistory.map((search, i) => {
                return <ZipCode searchResult={search} key={i}/>;
            })}
        </div>
    </>
    )
};