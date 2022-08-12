import React, {useState} from 'react';
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
        }
    }
`;

function App() {
  const [searchHistory, setSearchHistory] = useState<ZipCodeSearchResult[]>([]);
  const [searchResult, setSearchResult] = useState<ZipCodeSearchResult | null>(null);

  const [lookupZipCode, {data, loading, error}] = useLazyQuery(ZIPCODE_LOOKUP_QUERY);

  return ( 
      <div className="App">
      <div className="searchContainer">
        <Search lookupZipCode={lookupZipCode} error={error}/>
        {loading ? 
            searchResult ? <ZipCode searchResult={searchResult}/> : <div>Click Search to See Your Result</div> :
            <div>Loading</div>}
      </div>
      <div className="historyContainer">
        <History searchHistory={searchHistory}/>
      </div>
    </div>
  );
}

export default App;
