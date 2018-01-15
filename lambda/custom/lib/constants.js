module.exports = Object.freeze({
    //  States
    states : {
        START_MODE : '_START_MODE',
        NOTIFICATIONS_MODE : '_NOTIFICATIONS_MODE',
        NO_NEW_ITEM : '_NO_NEW_ITEM'
    },

    //  Custom constants
    terminate : 'TERMINATE',

    //  Speech break time
    breakTime : {
        '50' : '<break time = "50ms"/>',
        '100' : '<break time = "100ms"/>',
        '200' : '<break time = "200ms"/>',
        '250' : '<break time = "250ms"/>',
        '300' : '<break time = "300ms"/>',
        '500' : '<break time = "500ms"/>'
    },

    // Time in minutes after which notifications fetched again.
    updateRetrievalTime : 1
});