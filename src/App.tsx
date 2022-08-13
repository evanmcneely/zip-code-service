import React, {useState, useEffect} from 'react';
import History from './components/History';
import Search from './components/Search';
import ZipCode from './components/ZipCode';
import {ZipCodeSearchResult} from '../@types/AppTypes'
import { APIResponse } from '../@types/APITypes';
import { gql, useLazyQuery } from '@apollo/client';
import './App.css';

const ZIPCODE_LOOKUP_QUERY = gql`
    query lookupZipCode ($input: SearchInput!) {
        zipCodeSearch(searchInput: $input) {
            cityName
            stateName
            code
            countryAbrev
        }
    }
`;

function App() {
  const [searchHistory, setSearchHistory] = useState<ZipCodeSearchResult[]>([]);
  const [searchResult, setSearchResult] = useState<ZipCodeSearchResult | null>(null);

  const [lookupZipCode, {data, loading, error}] = useLazyQuery<{zipCodeSearch: APIResponse}>(ZIPCODE_LOOKUP_QUERY);

  useEffect(()=>{
    if(data && !loading) {
        // if the previous search result is not null, then we have search history to add before updating the search result
        if (searchResult !== null) {
            // only show the last 5 search results
            const newSearchHistory = [...searchHistory];
            newSearchHistory.unshift(searchResult);
            setSearchHistory(newSearchHistory.slice(0,5));
        }

        const {code, countryAbrev, stateName, cityName} = data.zipCodeSearch;
        setSearchResult({
            zipCode: code,
            countryCode: countryAbrev,
            state: stateName,
            city: cityName,
        });
    }
  }, [data])

  // conditinoall render a "loading" or "Click Search..." depending on current application state
  return ( 
    <div className="App">
        <div className="console">
            <div className="search container">
                <Search lookupZipCode={lookupZipCode} error={error}/>
                {loading ? 
                    <div>Loading ...</div> :
                    searchResult ? <ZipCode searchResult={searchResult}/> : <div>Click Search to See Your Result</div>}
            </div>
            <div className="history container">
                <History searchHistory={searchHistory} setSearchHistory={setSearchHistory}/>
            </div>
        </div>
    </div>
  );
}

export default App;
