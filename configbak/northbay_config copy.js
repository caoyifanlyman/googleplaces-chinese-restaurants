const GOOGLE_API = 'AIzaSyCG9XyrKCmW7N9yVOm0ziOnHYrMcA1u_e8';

module.exports = {
  apikey: GOOGLE_API,
  filename: 'northbay/northbay_result.json',
  radarParameter: {
    'location': '37.972507, -122.414889',
    'radius': '16000',
    'types': 'restaurant|food',
    'keyword': 'Chinese',
    'key': GOOGLE_API
  } 
};
