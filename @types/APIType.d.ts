type SupportedCountries = 'CA' | 'US';

interface ZipCodeSearchInput {
  countryCode: SupportedCountries;
  zipCode: String;
}

