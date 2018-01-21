const config = require('./../configuration');
const constants = require('./../constants');
const phrases = require('./../phrases');

const speechHandlers = {
    'welcome' : function() {
        console.log('welcome');

        let user = this.attributes['currentUser'].given_name

        let cardTitle = phrases.welcome;
        let cardContent = phrases.welcome_startup_message(user);

        let message = phrases.welcome_startup_message(user);
        let reprompt = phrases.welcome_startup_message_reprompt;

        this.response.cardRenderer(cardTitle, cardContent, constants.defaultCardImage);
        this.response.speak(message).listen(reprompt);
        this.emit(':responseReady');
    },
    'readNotification': function() {
        console.log('readNotification');

        // Set to now read from notification specific intents...
        this.handler.state = constants.states.NOTIFICATIONS_MODE;
        
        let notifications = this.attributes['notifications'];
        let notification = findNotification(notifications, this.attributes['currentNotificationId']);

        this.attributes['previousNotificationId'] = findPreviousNotificationId(notifications, notification.id);
        this.attributes['nextNotificationId'] = findNextNotificationId(notifications, notification.id);
        this.attributes['notifications'] = undefined;

        console.log('findNextNotificationId: ', findNextNotificationId(notifications, notification.id))

        // console.log('this.attributes: ', this.attributes)

        let cardTitle = notification.message;
        let cardContent = cardContentNotificationHelper(notification);
        let cardImage = notification.image;

        let message = notificationPhraseHelper.call(this, cardTitle);
        let reprompt = phrases.read_notification_reprompt;

        this.response.cardRenderer(cardTitle, cardContent, cardImage);
        this.response.speak(message).listen(reprompt);
        this.emit(':responseReady');
    },
    'noMoreNotifications': function() {
        console.log('noMoreNotifications');

        let message = phrases.no_more_notifications;

        this.emit('EndSession', message);
    },
    'helpEvent' : function () {
        console.log('helpEvent');

        let message = phrases.help_message;
        let reprompt = phrases.help_message_reprompt;

        this.response.speak(message).listen(reprompt);
        this.emit(':responseReady');
    },
    'unhandledEvent' : function () {
        console.log('unhandledEvent');

        let message = phrases.unhandled_event;
        let reprompt = phrases.unhandled_event_reprompt;
        
        this.response.speak(message).listen(reprompt);
        this.emit(':responseReady');
    },
    'expiredAccessToken' : function() {
        console.log('expiredAccessToken');

        let speechOutput = phrases.expired_access_token;

        showAccountLinkingRequiredCardAndEndSession.call(this, speechOutput);
    },
    'accountLinkingRequired': function() {
        console.log('accountLinkingRequired');

        let speechOutput = phrases.account_linking_setup_speech_output;

        showAccountLinkingRequiredCardAndEndSession.call(this, speechOutput);
    },
    'reportError' : function () {
        console.log('reportError');

        this.emit('EndSession', phrases.technical_error);
    }
};

function cardContentNotificationHelper(notification) {
    if (notification.additional_info.content) {
        return notification.additional_info.content.description;
    } else {
        return notification.additional_info.body || ''
    }
}

function findNotification(notifications, notification_id) {
    let notification = undefined;
    for(var index in notifications) {
        if (notifications[index].id === notification_id) {
            notification = notifications[index];
            break;
        }
    }
    return notification;
}

function findPreviousNotificationId(notifications, notification_id) {
    let previous_id = undefined;
    for(var index in notifications) {
        var index = parseInt(index);
        if (notifications[index].id === notification_id && index > 0) {
            previous_id = notifications[parseInt(index) - 1].id;
            break;
        }
    }
    return previous_id;
}

function findNextNotificationId(notifications, notification_id) {
    let next_id = undefined;
    for(var index in notifications) {
        var index = parseInt(index);
        if (notifications[index].id === notification_id && index < notifications.length - 1) {
            next_id = notifications[parseInt(index) + 1].id;
            break;
        }
    }
    return next_id;
}

function notificationPhraseHelper(message) {
    var _this = this;
    if (!_this.attributes['previousNotificationId']) {
        // First notification
        return phrases.read_first_notification(message);
    } else if (!_this.attributes['nextNotificationId']) {
        // Last notification
        return phrases.read_last_notification(message);
    } else {
        return phrases.read_notification(message);
    }
}

function showAccountLinkingRequiredCardAndEndSession(speechOutput) {
    let cardTitle = phrases.account_linking_setup_required_card_title;
    let cardContent = phrases.account_linking_setup_required_card_mesage;
    let cardImage = constants.defaultCardImage;

    this.response.cardRenderer(cardTitle, cardContent, cardImage);
    this.emit('EndSession', speechOutput);
}

module.exports = speechHandlers;
