const constants = require('./constants');

let phrases = {
    // Start up
    welcome: 'Welcome to the Fuse Universal Alexa skill.',
    welcome_for_user: function(name) {
      return 'Hi ' + String(name) + ', welcome to the Fuse Universal Alexa skill.';
    },
    welcome_startup_message: function(name) {
      return this.welcome_for_user(name) +
        ' Currently, I can only retrieve your notifications. Would you like to hear them?';
    },
    welcome_startup_message_reprompt: 'Would you like to hear your notifications?',

    // Notifications
    read_notification: function(message) {
      return String(message) + this.read_notification_reprompt;
    },
    read_first_notification: function(message) {
      return 'Okay first up, ' + this.read_notification(message);
    },
    read_last_notification: function(message) {
      return 'And finally, ' + this.read_notification(message);
    },
    read_notification_reprompt: '. Would you like to hear your next notification?',
    no_more_notifications: 'You have no more notifications at this time. Thanks for using Fuse Assistant!',

    // Account linking
    account_linking_setup_required_card_title: 'Account linking required for Fuse Assistant',
    account_linking_setup_required_card_mesage: 'In order to use this skill properly, please perform the Account Linking steps outlined in the description ' +
      'of the Fuse Assistant skill page in your Alexa mobile app.',
    account_linking_setup_speech_output: 'Account Linking is required in order to use the Fuse Assistant. For more information, please refer to the detail card ' +
      'created in your Alexa app. Good bye.',

    // Finish
    end_session: 'Thanks for using Fuse Assistant. See you next time!',

    // Help
    help_message: 'You need help already? To be honest, there\'s not much to know. ' +
      'You can say \'Tell me my notifications\' to hear your notifications. ' +
      'Any time during this skill you can say \'Next\' to go to the next notification, ' +
      '\'Previous\' to re-read the previous notification, and \'Stop\' to exit the skill all together. ' +
      'Ready to hear notifications?',
    help_message_reprompt: 'Would you like to hear your notifications?',

    // Errors
    unhandled_event: 'I\'m not too sure what you mean, could you try re-phrasing it?',
    unhandled_event_reprompt: 'Try saying \'Get me my notifications\'',
    expired_access_token: 'It looks like your access token has expired. Please disable then perform Account Linking for this skill from the card generated in your ' +
      'Alexa mobile app.',
    technical_error: 'Sorry, I encountered some technical difficulties. Please try again later.'
};

module.exports = phrases;
