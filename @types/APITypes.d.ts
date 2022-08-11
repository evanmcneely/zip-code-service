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
