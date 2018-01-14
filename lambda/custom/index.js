'use strict';
var Alexa = require('alexa-sdk');
var request = require('request');

var APP_ID = 'amzn1.ask.skill.6cdbc2f1-924f-4bd1-8182-5dc20a560715'; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Alexa Fuse Universal';

exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        var sessionAttributes = { 
            auth_token: event.session.user.access_token,
            company_subdomain: 'fuse',
            name: null
        };

        sessionAttributes.auth_token = event.session.user.accessToken
        retreiveUserData(sessionAttributes)

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            //onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);
    console.log("session: ")
    console.log(session)
    getWelcomeResponse(session, callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;
        
    
    console.log("session: ")
    console.log(session)

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            //handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            //handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("GetNotificationsIntent" === intentName) {
        handleNotificationsRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        //handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        //handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        //handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        //handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(session, callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        //handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        //handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        //handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        //handleFinishSessionRequest(intent, session, callback);
    }
}


/* CUSTOM HELPERS */
function optionsForRequest(endpoint, params) {
    params = params || {};
    return {
        host: hostBuilder(),
        path: apiPath() + endpoint + '?auth_token=' + params.auth_token,
        agent: false,
        body: JSON.stringify(params)
    };
}
function hostBuilder() {
    return 'fuse.fuseuniversal.com'
}
function apiPath() {
    return '/api/v1.8'
}

/* DEFAULT SKILL HANDLERS */
function getWelcomeResponse(session, callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var cardTitle = 'Welcome';
    var speechOutput = 'Welcome to the Fuse Universal Alexa Skill. ';
    var repromptText = '';
    
    
    
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var shouldEndSession = false;

    if (sessionAttributes.auth_token.length == -1) {
            repromptText = 'Please link your Fuse account before using this skill.'
            shouldEndSession = true;
    } else {
        if (sessionAttributes.name.length <= 0) {
            repromptText = 'What can I do for you today?'
        } else {
            repromptText = 'What can I do for you today, ' + sessionAttributes.name + '?';
        }
    }
    speechOutput += repromptText;
    speechOutput = Object.keys(session.user).join(', ')
    repromptText = speechOutput;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    var cardTitle = 'Session Ended';
    var speechOutput = 'Thank you for using the Alexa Fuse skill. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    var shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

/* CUSTOM HANDLERS */

/*
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
*/

function retreiveUserData(sessionAttributes) {
    request({
      url: 'https://fuse.fuseuniversal.com/api/v3.0/users/me?auth_token=' + sessionAttributes.auth_token,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }, function (error, response, body) {
      if (!error) {
        var user_data = JSON.parse(body); // turn response into JSON 
        
        if (user_data.length <= 0) {
            console.log('There was an error')
        } else {
            sessionAttributes.name = user_data.given_name
        }
      }
    });
}

function handleNotificationsRequest(intent, session, callback) {
    var speechOutput = '';
    var cardTitle = 'Notifications';
    
    request({
      url: 'https://fuse.fuseuniversal.com/api/v3.0/notifications?auth_token=' + sessionAttributes.auth_token,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }, function (error, response, body) {
      if (!error) {
        var notification_data = JSON.parse(body).notifications; // turn response into JSON    
        
        if (notification_data.length <= 0) {
            speechOutput = 'Hmm, it appears you have no new notifications at the moment.'
        } else {
            var firstNotification = notification_data[0];
            var details = {
                message: firstNotification.message,
                created_at: firstNotification.additional_info.created_at
            };
            speechOutput = details.message + ' ' + details.created_at + ' ago.';
            callback(sessionAttributes,
                buildSpeechletResponse(cardTitle, speechOutput, speechOutput, false));
        }
      }
    });

    /*
    http.get(optionsForRequest('/notifications', { auth_token: sessionAttributes.auth_token }), function(res) {
        res.setEncoding('utf8');
        res.on("data", function(body) {
            console.log(body)
            var notification_data = JSON.parse(body);
            

            if (notification_data.length <= 0) {
                speechOutput = 'Hmm, it appears you have no new notifications at the moment.'
            } else {
                var info = notification_data.additional_info
                var details = {
                    message: info.message,
                    created: info.created_at
                };
                speechOutput = details.message + ' ' + details.created_at + ' ago.';
                callback(sessionAttributes,
                    buildSpeechletResponse(cardTitle, speechOutput, speechOutput, false));
            }
        });
    }).on('error', function(e) {
        speechOutput = 'There was an error connecting to Fuse.';
        callback(sessionAttributes,
            buildSpeechletResponse(cardTitle, e, e, false));
    });
    */
}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
