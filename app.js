var request = require('request'); // This is the package to send a request to the server
var cheerio = require('cheerio'); // This one parses the data from the server
var fs = require('fs'); // And this writes the data to a file

request('https://www.imdb.com/chart/moviemeter?sort=ir,desc&mode=simple&page=1',function(err,res,body){ // Here I'm using IMDB website top 100 based on customized rating
   var $ = cheerio.load(body);
    $('.lister-list tr').each(function(){
var title = $(this).find('.titleColumn a').text().trim(); // parsing takes place here
var rating =$(this).find('.imdbRating strong').text().trim();
var year =$(this).find(' .titleColumn span').text().trim();

console.log('Title:'+title+' '+rating+' '+ year); // here the data is printed to the file
fs.appendFile('imdb.txt', title + ' ' + rating+' '+ year+ '\n', function (err) {
    if (err) throw err;
});
    
    });
});