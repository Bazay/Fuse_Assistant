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

    defaultCardImage: 'https://fusion-universal-assets-beta.s3.amazonaws.com/file-host/91e2accc-0adc-4fce-ba0b-1e91e72710c7--829673189015959883-3/67/icon.png',

    // API
    api_version: 'v2.0',

    // Time in minutes after which notifications fetched again.
    updateRetrievalTime : 1
});
