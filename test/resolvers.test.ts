import axios from 'axios';
import { ZipCodeSearchInput } from '../@types/APITypes';
import resolvers from '../server/resolvers';

jest.mock('axios');

describe('Testing resolvers for Query type', () => {
  test('zipCodeSearch field should return correct information on valid input', async () => {
    // this so TypeScript is ok with jest mock function API an axios methods
    let mockedGet = axios.get as jest.Mock<any,any>;

    const args: { searchInput: ZipCodeSearchInput } = {
      searchInput: {
        countryCode: 'US',
        zipCode: '90210',
      },
    };
    const APIResponse = {
      data: {
        'post code': '90210',
        country: 'United States',
        'country abbreviation': 'US',
        places: [
          {
            'place name': 'Beverly Hills',
            longitude: '-118.4065',
            state: 'California',
            'state abbreviation': 'CA',
            latitude: '34.0901',
          },
        ],
      },
    };

    mockedGet.mockResolvedValueOnce(APIResponse);
    const response = await resolvers.Query.zipCodeSearch('', args);
    expect(response).toEqual({
      code: '90210',
      countryName: 'United States',
      countryAbrev: 'US',
      cityName: 'Beverly Hills',
      stateName: 'California',
      stateAbrev: 'CA',
      long: '-118.4065',
      lat: '34.0901',
    });
    expect(axios.get).toHaveBeenCalledWith(`http://api.zippopotam.us/US/90210`);
  });
});
