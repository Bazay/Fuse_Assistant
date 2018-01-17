const Alexa = require('alexa-sdk');
const config = require('./lib/configuration');
const eventHandlers = require('./lib/handlers/eventHandlers');
const stateHandlers = require('./lib/handlers/stateHandlers');
const intentHandlers = require('./lib/handlers/intentHandlers');
const speechHandlers = require('./lib/handlers/speechHandlers');

exports.handler = function(event, context, callback) {
    /*
    * event: Data is stored in here including session data
    * context: Information specific to the Lambda environment. See https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
    * callback: Optional argument to return information to the caller. Supported only in Node.js v6.10 and v4.3. See https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html#nodejs-prog-model-handler-callback
    */

    let alexa = Alexa.handler(event, context);

    if (process.env.DEBUG === 'skill') {
        alexa.appId = 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe';
    } else {
        alexa.appId = config.appId;
    }
    alexa.registerHandlers(
        eventHandlers,
        stateHandlers.startModeIntentHandlers,
        stateHandlers.notificationsModeIntentHandlers,
        intentHandlers,
        speechHandlers
    );
    alexa.execute();
};
