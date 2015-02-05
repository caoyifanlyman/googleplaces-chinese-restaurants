const GOOGLE_API = 'AIzaSyCZG5mnOzBIBe8zOUSmmqkzr4PTLgzjuU8';

module.exports = {
  apikey: GOOGLE_API,
  filename: 'sanjose/sanjose_result.json',
  radarParameter: {
    'location': '37.337046, -121.910968',
    'radius': '15000',
    'types': 'restaurant|food',
    'keyword': 'Chinese',
    'key': GOOGLE_API
  } 
};
