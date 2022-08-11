// specify the format of data returned from the Zippopotamus API

interface APIResponse {
    'post code': String;
    country: 'United States' | 'Canada';
    'country abbreviation':  SupportedCountries;
    places: PlacesResponse[];
}

interface PlacesResponse {
    'place name': String;
    state: String;
    'state abbreviation': String;
    longitude: String;
    latitude: String;
}
