import React, {useState, useEffect} from 'react';
import History from './components/History';
import Search from './components/Search';
import ZipCode from './components/ZipCode';
import {ZipCodeSearchResult} from '../@types/AppTypes'
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

  const [lookupZipCode, {data, loading, error}] = useLazyQuery(ZIPCODE_LOOKUP_QUERY);

  useEffect(()=>{
    if(data && !loading) {
        if (searchResult !== null) {
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
                <History searchHistory={searchHistory}/>
            </div>
        </div>
    </div>
  );
}

export default App;
