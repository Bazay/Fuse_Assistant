let config = {
    appId : 'amzn1.ask.skill.6cdbc2f1-924f-4bd1-8182-5dc20a560715',
    welcome_message: 'Hi there, welcome to the Fuse Universal Alexa skill.',
    welcome_message_for_user: function(name) {
      return 'Hi there ' + String(name) + ', welcome to the Fuse Universal Alexa skill.'
    },

    number_notifications_per_prompt : 1,
    speak_only_feed_title : true,
    display_only_title_in_card : true,

    speech_style_for_numbering_feeds : 'Item'
};

module.exports = config;
