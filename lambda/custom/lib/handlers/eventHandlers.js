const request = require('request');

const constants = require('./../constants');
const config = require('./../configuration');
const phrases = require('./../phrases');

const logHelper = require('./../helpers/logHelper');
const apiHelper = require('./../helpers/apiHelper');

let eventHandlers = {
    'NewSession' : function () {
        // Default START_MODE
        this.handler.state = constants.states.START_MODE;

        logHelper.logSessionStarted(this.event.session);
        console.log('NewSession');

        let accessToken = this.event.session.user.accessToken;

        // Initialize session attributes
        this.attributes['start'] = true;

        // Ensure user's accessToken is valid
        if (!accessToken) {
            this.emit('expiredAccessToken');
        }

        // Ensure we're retrieved information about currently authenticated user.
        if (!this.attributes['currentUser']) {
            apiHelper.getCurrentUser(accessToken, (err, data) => {
                if (err) {
                    logHelper.logAPIError(this.event.session, 'currentUserAPI', err);
                    this.emit('expiredAccessToken');
                } else {
                    logHelper.logAPISuccesses(this.event.session, 'currentUserAPI');
                    if (data) {
                        userData = JSON.parse(data.body);
                        this.attributes['currentUser'] = userData;
                        newSessionEvent.call(this);
                    } else {
                        logHelper.logAPIError(this.event.session, 'currentUserAPI', data);
                        console.log('ERROR! currentUserAPI data invalid: ', data);
                        this.emit('reportError');
                    }
                }
            })
        } else {
            newSessionEvent.call(this);
        }
    },
    'EndSession' : function (message) {
        let response = message || phrases.end_session
        this.response.speak(response);
        this.emit(':responseReady');
    }
};

function newSessionEvent() {
    if (this.event.request.type === 'LaunchRequest') {
        logHelper.logLaunchRequest(this.event.session, this.event.request);

        if (this.handler.state === constants.states.NOTIFICATIONS_MODE) {
            this.emit('readNotifications');
        } else {
            this.emit('welcome');
        }
    } else if (this.event.request.type === 'IntentRequest') {
        logHelper.logReceiveIntent(this.event.session, this.event.request);

        let intentName = this.event.request.intent.name;
        this.emitWithState(intentName);
    } else {
        console.log('Unexpected request : ' + this.event.request.type);
    }
}


module.exports = eventHandlers;
