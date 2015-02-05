var request = require('request');
var fs = require('fs');

const GOOGLE_API = 'AIzaSyAnY1z6pf2vdCifFQrSs-EQsP5efdk44oo';
const baseUrl = 'https://maps.googleapis.com/maps/api/place';
const radarSearchUrl = '/radarsearch/json?';
const detailSearchUrl = '/details/json?';
const filename = 'sanfrancisco/result.json';

var interval = 10; // Interval for each detailPlace request, which will be changed later randomly.
var savedCount = 0;
var finalResult = [];

var radarParameter = {
  'location': '37.741518, -122.440056',
  'radius': '10000',
  'types': 'restaurant|food',
  'keyword': 'Chinese',
  'key': GOOGLE_API
};

request.get(baseUrl + radarSearchUrl + toParameter(radarParameter), function(err, response, body){
  var all;
  if (err){
    return console.error('request failed: ', err);
  }
  if (response.statusCode == 200){
    // Get detail of single place and write to file.
    getDetailAndWrite(JSON.parse(body).results); 
  } else{
    console.log('status code err: ' + response.statusCode);
  }
});

// Get detail of each single place and write to file.
function getDetailAndWrite(all){
  var totalSize = all.length;
  console.log('total count: ' + totalSize);
  var i = 0;
  var funcs = [];
  for (; i < totalSize; i++){
    funcs[i] = createFunc(i, all); 
  }
  for(i = 0; i < totalSize; i++){
    funcs[i]();
  }
}

function createFunc(index, all){
  return function() {
    interval = Math.floor(Math.random() * 10);
    setTimeout(function(){
      // Send the detail request.
      var singleDetailParameter = {
        'key' : GOOGLE_API,
        'placeid' : all[index].place_id
      };
      request.get(baseUrl + detailSearchUrl + toParameter(singleDetailParameter), function(err, response, body){
        if (err){
          return console.error('detail request failed: ', err);
        }
        if (response. statusCode == 200){
          var value = JSON.parse(body).result;
          var data = {
            'name': value.name,
            'location': value.geometry.location,
            'address': value.formatted_address,
            'price_level': value.price_level
          };
          finalResult.push(data);
          savedCount += 1;
          console.log('new detail index: ' + index);

          // When all the data are saved to finalresult, write to file.
          if (savedCount === 200) {
            fs.appendFile(filename, JSON.stringify(finalResult, null, 4), function(err){
              if(err) throw err;
              console.log(finalResult.length + ' results have been saved to file: ' + filename);
            });
          }
        } else{
          console.log('status code err: ' + response.statusCode);
        }
      }); 

    }, interval);

  }
}

function toParameter(obj){
  var result = '';
  for (var key in obj){
    result += '&' + key + '=' + obj[key];
  }
  return result.substring(1);
}
