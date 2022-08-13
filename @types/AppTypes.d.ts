export interface ZipCodeSearchResult {
  city: String;
  state: String;
  zipCode: String;
  countryCode: String;
}

export interface HistoryProps {
  searchHistory: ZipCodeSearchResult[];
  setSearchHistory: React.Dispatch<React.SetStateAction<ZipCodeSearchResult[]>>;
}

export interface SearchProps {
  lookupZipCode: LazyQueryExecFunction<any, OperationVariables>;
  error: ApolloError | undefined;
}

export interface ZipCodeProps {
  searchResult: ZipCodeSearchResult;
}
