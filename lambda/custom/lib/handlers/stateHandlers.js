const Alexa = require('alexa-sdk');

const config = require('./../configuration');
const constants = require('./../constants');

const logHelper = require('./../helpers/logHelper');
const apiHelper = require('./../helpers/apiHelper');

const stateHandlers = {
    startModeIntentHandlers : Alexa.CreateStateHandler(constants.states.START_MODE, {
        /*
         *  All Intent Handlers for state : _START_MODE
         */
        'GetNotifications': function() {
            console.log('START_MODE - GetNotifications');
            this.emit('readNotifications');
        },
        'AMAZON.YesIntent' : function () {
            console.log('START_MODE - AMAZON.YesIntent');
            this.emit('readNotifications');
        },
        'AMAZON.NoIntent' : function () {
            this.emit('EndSession');
        },
        'AMAZON.HelpIntent' : function () {
            this.emit('helpEvent');
        },
        'AMAZON.StopIntent' : function () {
            this.emit('EndSession');
        },
        'AMAZON.CancelIntent' : function () {
            this.emit('EndSession');
        },
        'SessionEndedRequest' : function () {
            this.emit('EndSession');
        },
        'Unhandled' : function () {
            this.emit('unhandledEvent');
        }
    }),
    notificationsModeIntentHandlers : Alexa.CreateStateHandler(constants.states.NOTIFICATIONS_MODE, {
        /*
         *  All Intent Handlers for state : _NOTIFICATIONS_MODE
         */
        'AMAZON.NextIntent' : function () {
            // User accepts they want to hear the next notification
            readNextNotification.call(this);
        },
        'AMAZON.PreviousIntent' : function () {
            readPreviousNotification.call(this);
        },
        'AMAZON.YesIntent': function() {
            // User accepts they want to hear the next notification
            readNextNotification.call(this);
        },
        'AMAZON.NoIntent' : function () {
            this.emit('EndSession');
        },
        'AMAZON.HelpIntent' : function () {
            this.emit('helpEvent');
        },
        'AMAZON.StopIntent' : function () {
            this.emit('EndSession');
        },
        'AMAZON.CancelIntent' : function () {
            this.emit('EndSession');
        },
        'SessionEndedRequest' : function () {
            this.emit('EndSession');
        },
        'Unhandled' : function () {
            this.emit('unhandledEvent');
        }
    })
};

module.exports = stateHandlers;

function readNextNotification() {
    if (this.attributes['nextNotificationId']) {
        this.attributes['currentNotificationId'] = this.attributes['nextNotificationId'];
        this.emit('readNotifications');
    } else {
        this.emit('noMoreNotifications');
    }
}

function readPreviousNotification() {
    if (this.attributes['previousNotificationId']) {
        this.attributes['currentNotificationId'] = this.attributes['previousNotificationId'];
        this.emit('readNotifications');
    } else {
        this.emit('noMoreNotifications');
    }
}
