export type SupportedCountries = 'CA' | 'US';

export interface ZipCodeSearchInput {
  countryCode: SupportedCountries;
  zipCode: String;
}

