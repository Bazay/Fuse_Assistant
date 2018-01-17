const config = require('./../configuration');
const constants = require('./../constants');

const logHelper = require('./../helpers/logHelper');
const apiHelper = require('./../helpers/apiHelper');

let items = [];

let intentHandlers = {
    'readNotifications': function() {
        console.log('readNotifications');

        let accessToken = this.event.session.user.accessToken;

        apiHelper.getNotifications(accessToken, (err, data) => {
            if (err) {
                logHelper.logAPIError(this.event.session, 'notificationsAPI', err);
                this.emit('reportError');
            } else {
                logHelper.logAPISuccesses(this.event.session, 'notificationsAPI');
                if (data) {
                    let notifications = JSON.parse(data.body).notifications;

                    if (!this.attributes['currentNotificationId']) {
                        this.attributes['currentNotificationId'] = notifications[0].id;
                    }
                    this.attributes['notifications'] = notifications;

                    this.emit('readNotification');
                } else {
                    logHelper.logAPIError(this.event.session, 'notificationsAPI', data);
                    console.log('ERROR! notificationsAPI data invalid: ', data);
                    this.emit('reportError');
                }
            }
        });
    }
};

module.exports = intentHandlers;
