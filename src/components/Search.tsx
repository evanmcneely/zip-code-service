import React, {useState} from "react";
import { SearchProps } from "../../@types/AppTypes";

export default function Search({lookupZipCode, error}:SearchProps) {
    const [countryCode, setCountryCode] = useState<string>('US');
    const [zipCode, setZipCode] = useState<string>('');
    const codeName = countryCode === 'US' ? 'ZipCode' : 'PostalCode'

    const handleSearch = (event:any) => {
        event.preventDefault();
        lookupZipCode({variables: {input: {countryCode, zipCode}}})
    }

    return (
    <div id="searchForm">
        Lookup Locations of Zip and Postal Codes
        {error && <p id="searchError" >{`${error}`}</p>}
        <form onSubmit={(e)=>handleSearch(e)}>
            <label htmlFor="conutryCode">Country:</label>
            <select name="countryCode" id="countryCode" onChange={(e)=>setCountryCode(e.target.value)}>
                <option value="US">US</option>
                <option value="CA">CA</option>
            </select>
            <label htmlFor="zipCode">{codeName}:</label>
            <input type="text" id="zipCode" name="zipCode" onChange={(e)=>setZipCode(e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>
    </div>
    )
}