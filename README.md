# Twitter Sentiment

![Ariel](https://github.com/livnoni/dataMining-twitterSentiment/blob/master/gitHub_pics/logo.png)



Twitter sentiment is a web application that  examines the sentiment measure of a particular expression.


  - Type some name of famous peron on the left 
  
  ![Ariel](https://github.com/livnoni/dataMining-twitterSentiment/blob/master/gitHub_pics/person.PNG)

  - Select how many tweets you want to scan on the button
  
    ![Ariel](https://github.com/livnoni/dataMining-twitterSentiment/blob/master/gitHub_pics/tweetsNum.PNG)

  - click on the 'run' button
  
    ![Ariel](https://github.com/livnoni/dataMining-twitterSentiment/blob/master/gitHub_pics/run.PNG)

  - Wait until you receive the Sentient Index of that person !

### Tech

Twitter Sentiment uses a number of open source projects to work properly:

* [ntwitter] - Asynchronous Twitter client API for node.js
* [node.js] - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express] - Fast, unopinionated, minimalist web framework for Node.js
* [fs] -  Node.js file system module
* [jQuery] - Fast, small, and feature-rich JavaScript library

And of course Twitter Sentiment itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Twitter Sentiment requires [Node.js](https://nodejs.org/) v4+ and [npm](https://www.npmjs.com/) v5+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
node server.js
```

Browse to: http://localhost:3000/ on your favorite browser

### additional requirements

Twitter Sentiment is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.
You must have twitter acount to run trow.
If you dont have please create account an [twitter](https://twitter.com/signup)
Then go to -> [Twitter Application Management](https://dev.twitter.com/apps) and generate the folloing keys:

| Key | Value |
| ------ | ------ |
| consumer_key | YOUR SECRET BUMBER HERE|
| consumer_secret | YOUR SECRET BUMBER HERE |
| access_token_key Drive | YOUR SECRET BUMBER HERE |
| access_token_secret | YOUR SECRET BUMBER HERE |

Insert them in the configure.json file.

License
----

Ariel University


**Free Software, Hell Yeah!**

## Screenshot:
![Ariel](https://github.com/livnoni/dataMining-twitterSentiment/blob/master/gitHub_pics/screenShot1.PNG)

### The ouput:

![Ariel](https://github.com/livnoni/dataMining-twitterSentiment/blob/master/gitHub_pics/screenShot2.PNG)


[ntwitter]: <https://www.npmjs.com/package/ntwitter>
[node.js]: <http://nodejs.org>
[jQuery]: <http://jquery.com>
[express]: <http://expressjs.com>
[AngularJS]: <http://angularjs.org>
[fs]: <https://www.npmjs.com/package/file-system>
