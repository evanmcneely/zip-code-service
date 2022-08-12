import React from "react";
import { HistoryProps } from "../../@types/AppTypes";
import ZipCode from "./ZipCode";

export default function History({searchHistory}:HistoryProps) {
    return (
    <>
        <div id="historyHeader">
            <div>Search History</div>
            <button id="clearButton">Clear</button>
        </div>
        <div>
            {searchHistory.map((search) => {
                return <ZipCode searchResult={search} />;
            })}
        </div>
    </>
    )
};