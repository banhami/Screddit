// Alex Banh
// 8/20/2016
//
// Screddit grabs the title and author of posts on the reddit front page.

var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);

request({
    method: 'GET',
    url: 'https://www.reddit.com/'
}, function(err, response, body) {
    if (err) return console.error(err)

    // Has Cheerio load the body
    $ = cheerio.load(body);

    var title, author;
    var results = [];

    // Grabs the relevant text from matching elements, then puts it into an
    // object which is then pushed into an array
    $('.link').each(function(i, element) {
        var data = $(this);
        title = $('.title', data).children().first().text();
        author = data.attr('data-author');

        var json = {
            title: title,
            author: author,
        };

        results.push(json);

    })

    // Optional for debugging/seeing results in the terminal
    console.log(results);

    fs.writeFile(appDir + '/Screddit.json', JSON.stringify(results, null, 4)
                , function(err) {
        console.log('Screddit.json has been written to ' + appDir + '!');
    })

});
