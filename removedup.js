var fs = require('fs');
var filename = 'finalResultWithDups.json';
var output = 'finalOutput.json'
var arr, mySet = new Object();
var dupcount = 0;
var finalResult = [];
fs.readFile(filename, 'utf8', function(err, data){
  if (err) throw err;

  arr = JSON.parse(data).results;
  var singleData;
  for (var i in arr){
    singleData = JSON.stringify(arr[i]);
    if (mySet.hasOwnProperty(singleData)){
      console.log('dup: ' + singleData);
      dupcount += 1;
    } else {
      mySet[singleData] = true;
      finalResult.push(singleData);
    }
  }
  var formatjson = finalResult.join(', \n');
  fs.writeFile(output, formatjson, function(err){
    if(err) throw err;
    console.log('final results have been written.');
  });
  console.log('final result: ' + finalResult.length);
  console.log('dup length: ' + dupcount);
});

