const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const fetch = require('node-fetch');
const bots = require('crawler-user-agents');
const app = express();

const methodOverride = require('method-override');
const renderUrl = 'https://render-tron.appspot.com/render';
const appUrl = "willsbach-handball.de";

function generateUrl(request) {
    return url.format({
        protocol: request.protocol,
        host: appUrl,
        pathname: request.originalUrl
    });
}

function detectBot(userAgent) {
    // const bots = [
    //     // crawler bots
    //     'googlebot',
    //     'bingbot',
    //     'yandexbot',
    //     'duckduckbot',
    //     'slurp',
    //     // link bots
    //     'twitterbot',
    //     'facebookexternalhit',
    //     'linkedinbot',
    //     'embedly',
    //     'baiduspider',
    //     'pinterest',
    //     'slackbot',
    //     'vkShare',
    //     'facebot',
    //     'outbrain',
    //     'W3C_Validator',
    //     'WhatsApp'
    // ];
    // const agent = userAgent.toLowerCase();

    for (const bot of bots) {
        // const botUserAgent = bot.pattern.toLowerCase();
        if (RegExp(bot.pattern).test(userAgent)) {
            console.log('Bot detected', bot.pattern, userAgent);
            return true;
        }
    }

    console.log('no bots found');
    return false;
}

app.use(express.static(__dirname + '/dist'))
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))
app.use(methodOverride());


app.get('*', function (req, res) {

    const isBot = detectBot(req.headers['user-agent']);

    if (isBot) {
        const botUrl = generateUrl(req);

        fetch(`${renderUrl}/${botUrl}`)
            .then(res => res.text())
            .then(body => {
                // Cache user agent
                res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
                res.set('Vary', 'User-Agent');
                res.send(body.toString());
            });
    } else {
        res.sendfile(__dirname + '/dist/index.html');
    }

})

app.listen(8080);
console.log("App listening on port 8080")