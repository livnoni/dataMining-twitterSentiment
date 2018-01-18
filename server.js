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
var finishScan = false;
var result = "";
var phrase;


var client = fs.readFileSync('configure.json');
var tweeter = new ntwitter(JSON.parse(client).twitterAccount);

app.get('/', function (req, res) {
    console.log('GET /');
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);

});

app.get('/getTweets', function (req, res) {
    console.log('GET: getTweets');
    if(finishScan){
        res.end("finishScan: "+result);
    }else{
        var data = tweetsData;
        tweetsData = "";
        res.end(data);
    }
});

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/', urlencodedParser, function (req, res) {
    console.log('POST /');
    if (inAction == false) {
        inAction = true;
        scan(req.body.phrase, req.body.numOfTweets);
        res.end("successfully start.")
    } else {
        res.end("already scan sweets for: " + phrase + " !")
    }
});

function scan(phraseToScan, numOfTweets){
    result = "";
    finishScan = false;
    tweetsData = "";
    var tweetTotalSentiment = 0;
    var stream;
    var tweetCount = 0;
    phrase = phraseToScan;
    tweeter.verifyCredentials(function (error, data) {
        if (error) {
            console.log("error =", error);
            res.send("Error connecting to Twitter: " + error);
        }
        stream = tweeter.stream('statuses/filter', {
            'track': phrase
        }, function (stream) {
            stream.on('data', function (data) {
                if (data.lang === 'en') {
                    console.log("Tweet #" + tweetCount + ":  " + data.text);
                    sentiment(data.text, function (err, result) {
                        tweetCount++;
                        tweetTotalSentiment += result.score;
                        tweetsData += "Tweet #" + tweetCount + ":  " + data.text + "[ rank: "+result.score+" ]\n";
                    });
                    console.log("tweetTotalSentiment =" + tweetTotalSentiment);
                }

                if (tweetCount >= numOfTweets) {
                    setTimeout(stream.destroy, 10);
                    inAction = false;
                    phrase = "";
                    finishScan = true;
                    result = `Tweets total sentiment rank:  ${tweetTotalSentiment} `
                }
            });

        });

    });
}


app.listen(port);
console.log("Server listening on port " + port);