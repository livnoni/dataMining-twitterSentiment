/**
 * Created by yehud on 1/6/2018.
 */
var port = (process.env.VCAP_APP_PORT || 3000);
var express = require("express");
var sentiment = require('sentiment');
var ntwitter = require('ntwitter');
var bodyParser = require('body-parser');
var cors = require('cors');


var fs = require('fs');
var app = express();
app.use(cors());

var tweetsData = "";
var inAction = false;
var phrase;


// Create your own app at: https://dev.twitter.com/apps
var tweeter = new ntwitter({
    consumer_key: '2tsC7Dd8TPOfHk0s9dowJ0pQk',
    consumer_secret: '4nbxI4AVzgVbGZpXlU6hL4ZvM2IfapO1ANDTCjPJbr9xitzsMC',
    access_token_key: '897796200526733312-tA0pnAt63QTNJNcwOPKFwc3NIeMdFtV',
    access_token_secret: 'JrwOTMJuYfdRGoF1YmbcAbt1M4LTuVKNErDQedhz5lEcn'
});

app.get('/', function (req, res) {
    console.log('GET /');
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);

});

app.get('/getTweets', function (req, res) {
    console.log('GET: getTweets');
    var data = tweetsData;
    tweetsData = "";
    res.end(data);

});

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/', urlencodedParser, function (req, res) {
    console.log('POST /');
    if (inAction == false) {
        inAction = true;
        tweetsData = "";
        var tweetTotalSentiment = 0;
        var stream;
        var tweetCount = 0;
        phrase = req.body.phrase;
        var numOfTweets = req.body.numOfTweets;

        tweeter.verifyCredentials(function (error, data) {
            if (error) {
                console.log("error =", error);
                res.send("Error connecting to Twitter: " + error);
            }
            stream = tweeter.stream('statuses/filter', {
                'track': phrase
            }, function (stream) {
                stream.on('data', function (data) {
                    tweetCount++;

                    if (data.lang === 'en') {
                        console.log("Tweet #" + tweetCount + ":  " + data.text);
                        sentiment(data.text, function (err, result) {
                            tweetCount++;
                            tweetTotalSentiment += result.score;
                        });
                        tweetsData += "Tweet #" + tweetCount + ":  " + data.text + "\n";
                        console.log("tweetTotalSentiment =" + tweetTotalSentiment);
                    }

                    if (tweetCount >= numOfTweets) {
                        setTimeout(stream.destroy, 10);
                        inAction = false;
                        phrase = "";
                        res.end(`Tweets total sentiment rank:  ${tweetTotalSentiment} `)
                    }
                });

            });

        });
    } else {
        res.end("already scan sweets for: " + phrase + " !")
    }


});


app.listen(port);
console.log("Server listening on port " + port);