import React, {useState} from "react";
import { SearchProps } from "../../@types/AppTypes";

export default function Search({lookupZipCode, error}:SearchProps) {
    const [countryCode, setCountryCode] = useState<string>('US');
    const [zipCode, setZipCode] = useState<string>('');
    // this is "Postal Code" or "Zip Code" depending on current country status
    const codeName = countryCode === 'US' ? 'ZipCode' : 'PostalCode'

    const handleSearch = (event:any) => {
        event.preventDefault();
        lookupZipCode({variables: {input: {countryCode, zipCode}}})
    }

    return (
    <div id="searchForm">
        <div className="title">Lookup Locations of Zip and Postal Codes</div>
        <form onSubmit={(e)=>handleSearch(e)}>
            <label htmlFor="conutryCode">Country:</label>
            <select name="countryCode" id="countryCode" onChange={(e)=>setCountryCode(e.target.value)}>
                <option value="US">US</option>
                <option value="CA">CA</option>
            </select>
            <label htmlFor="zipCode">{codeName}:</label>
            <input type="text" id="zipCode" name="zipCode" onChange={(e)=>setZipCode(e.target.value)}/>
            <input id="searchButton" type="submit" value="Search"/>
        </form>
        {error && <p id="searchError" >{`${error}`}</p>}
    </div>
    )
}