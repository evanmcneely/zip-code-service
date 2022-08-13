export type SupportedCountries = 'CA' | 'US';

export interface ZipCodeSearchInput {
  countryCode: SupportedCountries;
  zipCode: String;
}

export interface APIResponse {
  code: String;
  cityName: String;
  stateName: String;
  countryName: String;
  stateAbrev: String;
  countryAbrev: String;
  long: String;
  lat: String;
}

export interface ZippopotamusResponse {
  'post code': String;
  country: 'United States' | 'Canada';
  'country abbreviation': SupportedCountries;
  places: PlacesResponse[];
}

interface PlacesResponse {
  'place name': String;
  state: String;
  'state abbreviation': String;
  longitude: String;
  latitude: String;
}
