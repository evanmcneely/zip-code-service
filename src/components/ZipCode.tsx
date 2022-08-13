import React from "react";
import { ZipCodeProps } from "../../@types/AppTypes";

export default function ZipCode({searchResult}:ZipCodeProps) {
    const {countryCode, city, state, zipCode} = searchResult;
    // this is "Postal Code" or "Zip Code" depending on current country status
    const codeName = countryCode.toLocaleLowerCase() === 'us' ? 'ZipCode': 'Postalcode';
    
    return (
    <div className="zipCodeItem">
        <p>{`The ${codeName} ${zipCode} is located in ${city}, ${state}`}</p>
    </div>
    )
}