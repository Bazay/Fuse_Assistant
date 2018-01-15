const config = require('./../configuration');
const constants = require('./../constants');

const speechHandlers = {
    'welcome' : function() {
        // Output welcome message with card
        let personalGreeting = config.welcome_message_for_user(this.attributes['currentUser'].given_name);
        let message = personalGreeting + constants.breakTime['100'] +
            ' Currently, I can only retrieve your notifications. Would you like to hear them?';
        let reprompt = 'Would you like to hear your notifications? ';
        let cardTitle = personalGreeting;
        let cardContent = personalGreeting + ' Currently, I can only retrieve your notifications. Would you like to hear them?\n';

        this.response.cardRenderer(cardTitle, cardContent, null);
        // this.response.speak(message).listen(reprompt);
        // this.emit(':responseReady');

        this.emit('EndSession', message + 'Ending session');
    },
    'expiredAccessToken' : function() {
        let message = 'It looks like your access token has expired. Please disable then re-authenticate this skill in your Alexa mobile app.';
        this.emit('EndSession', message);
    }
    // 'noNewItems' : function () {
    //     // Output message when no new items present in the feed
    //     let message = '';
    //     if (Object.keys(config.feeds).length === 1) {
    //         if (this.attributes['start']) {
    //             message = config.welcome_message + " ";
    //             this.attributes['start'] = false;
    //         }
    //         message += 'There are no new items. Would you like to hear older items? ';
    //         this.response.speak(message).listen(message);

    //       } else {
    //         message = this.attributes['category'] + ' has no new items. Would you like to hear older items? ';
    //         const reprompt = 'There are no new items in the feed. ' +
    //             'You can say yes to hear older items and no to select other feeds.';
    //         // change state to NO_NEW_ITEM
    //         this.handler.state = constants.states.NO_NEW_ITEM;
    //         this.response.speak(message).listen(reprompt);
    //       }
    //     this.emit(':responseReady');
    // },
    // 'readPagedItems' : function (items) {
    //     // Read items to the user
    //     const category = this.attributes['category'];

    //     let message = '';
    //     let reprompt = '';
    //     const cardTitle = category;
    //     let cardContent = '';
    //     let content = '';

    //     const feedEndedKey = 'feedEnded' + category;
    //     const justStartedKey = 'justStarted' + category;

    //     // change state to FEED_MODE
    //     this.handler.state = constants.states.FEED_MODE;
    //     // add message to notify number of new items in the feed
    //     if (this.attributes['newItemCount'] && this.attributes['newItemCount'] > 0) {
    //         let msg;
    //         if (this.attributes['newItemCount'] == 1) {
    //             msg = ' new item. ';
    //         } else {
    //             msg = ' new items. ';
    //         }
    //         cardContent = this.attributes['category'] + ' has ' + this.attributes['newItemCount'] + msg + '\n';
    //         message = this.attributes['category'] + ' has ' + this.attributes['newItemCount'] + msg +
    //             constants.breakTime['200'];
    //         this.attributes['newItemCount'] = null;
    //     }

    //     items.forEach(function (feed) {
    //         content += config.speech_style_for_numbering_feeds + " " + (feed.count + 1) + ". " + feed.title + ". ";
    //         cardContent += config.speech_style_for_numbering_feeds + " " + (feed.count + 1) + ". " + feed.title;
    //         // If config flag set to display description, append description
    //         if (!config.display_only_title_in_card) {
    //             cardContent += "  -  ";
    //             cardContent += feed.description;
    //         }
    //         if (!config.speak_only_feed_title) {
    //             content += constants.breakTime['300'];
    //             content += feed.description + " ";
    //         }
    //         cardContent += '\n';
    //         content += constants.breakTime['500'];
    //     });
    //     message += content;
    //     if (this.attributes[feedEndedKey]) {
    //         message += ' You have reached the end of the feed. ' + constants.breakTime['200'] +
    //             ' You can choose any other category, or restart the feed. ';
    //         cardContent += 'You have reached the end of the feed. ' +
    //             'You can choose any other category, or restart the feed. ';
    //         reprompt = ' You can say, list all feeds, to hear all categories or' +
    //             ' say, restart, to start over the current feed. ';
    //     } else if (this.attributes[justStartedKey]) {
    //         message += 'You can say next for more.';
    //         cardContent += 'You can say next for more.';
    //         reprompt = 'You can say next for more items. You can also say, list all feeds, to hear all categories. ';
    //     } else {
    //         message += 'You can say next for more. ';
    //         cardContent += 'You can say next for more. ';
    //         reprompt = 'You can say next for more items, or say previous for previous items. ' +
    //             'You can also say, list all feeds, to hear all categories. ';
    //     }
    //     this.response.cardRenderer(cardTitle, cardContent, null);
    //     this.response.speak(message).listen(reprompt);

    //     this.emit(':responseReady');
    // },
    // 'readPagedItemsSingleMode' : function (items) {
    //     // Read items to the user
    //     const category = this.attributes['category'];

    //     let message = '';
    //     const cardTitle = 'Items';
    //     let cardContent = '';
    //     let content = '';

    //     const feedEndedKey = 'feedEnded' + category;
    //     // add message to notify number of new items in the feed
    //     if (this.attributes['newItemCount']) {
    //         message += config.welcome_message + constants.breakTime['100'];
    //         if (this.attributes['newItemCount'] > 0) {
    //             let msg;
    //             if (this.attributes['newItemCount'] == 1) {
    //                 msg = ' new item. ';
    //             } else {
    //                 msg = ' new items. ';
    //             }
    //             cardContent = 'There are ' + this.attributes['newItemCount'] + msg + '\n';
    //             message += this.attributes['category'] + ' has ' + this.attributes['newItemCount'] + msg +
    //                 constants.breakTime['200'];
    //         } else {
    //             message += 'There are ' + this.attributes['feedLength'] + ' items in the feed. ';
    //         }
    //         this.attributes['newItemCount'] = null;
    //         // Setting start flag as false
    //         if (this.attributes['start']) {
    //             this.attributes['start'] = false;
    //         }
    //     }

    //     items.forEach(function (feed) {
    //         content += config.speech_style_for_numbering_feeds + " " + (feed.count + 1) + ". " + feed.title + ". ";
    //         cardContent += config.speech_style_for_numbering_feeds + " " + (feed.count + 1) + ". " + feed.title;
    //         // If config flag set to display description, append description
    //         if (!config.display_only_title_in_card) {
    //             cardContent += "  -  ";
    //             cardContent += feed.description;
    //         }
    //         if (!config.speak_only_feed_title) {
    //             content += constants.breakTime['300'];
    //             content += feed.description + " ";
    //         }
    //         cardContent += '\n';
    //         content += constants.breakTime['500'];
    //     });
    //     message += content;
    //     if (this.attributes[feedEndedKey]) {
    //         message += ' You have reached the end of the feed. ' + constants.breakTime['200'] +
    //             ' You can say restart to hear the feed from the beginning or say previous to hear newer items. ';
    //         cardContent += 'You have reached the end of the feed. ' +
    //             ' You can say restart to hear the feed from the beginning or say previous to hear newer items. ';
    //         return this.emit(':askWithCard', message, message, cardTitle, cardContent, null);
    //     } else {
    //         message += 'You can say next for more. ';
    //         cardContent += 'You can say next for more. ';
    //     }
    //     this.response.cardRenderer(cardTitle, cardContent, null);
    //     this.response.speak(message).listen(message);

    //     this.emit(':responseReady');
    // },
    // 'feedEmptyError' : function () {
    //     // Output sorry message when requested feed has no items
    //     const message = 'Sorry, the feed is empty. Please select another feed.';
    //     const reprompt = 'Sorry, the feed is empty. Please select another feed.';
    //     this.response.speak(message).listen(reprompt);

    //     this.emit(':responseReady');
    // },
    // 'justStarted' : function () {
    //     // Outputs message when user says previous when already at start of feed
    //     const message = 'Sorry, you are at the start of the feed. ' +
    //         'You can say next to hear subsequent items or you can say list categories to select other feeds.';
    //     const reprompt = 'You can say next to hear subsequent items or ' +
    //         'you can say list categories to select other feeds.';
    //     this.response.speak(message).listen(reprompt);

    //     this.emit(':responseReady');
    // },
    // 'alreadyEnded' : function () {
    //     // Outputs message when user says next when already at end of feed
    //     const message = 'Sorry, you are at the end of the feed. ' +
    //         'You can say list categories to select other feeds or you can say previous to hear previous feeds.';
    //     const reprompt = 'You can say list categories to select other categories or ' +
    //         'you can say previous to hear previous feeds.';
    //     this.response.speak(message).listen(reprompt);

    //     this.emit(':responseReady');
    // },
    // 'helpStartMode' : function () {
    //     // Outputs helps message when in START MODE
    //     let message = config.welcome_message + constants.breakTime['100'] +
    //         'To hear any news feed, you can select any category using its name or number. ' +
    //         constants.breakTime['100'] +
    //         'You can also mark one or more categories as your favorite ' +
    //         ' and ask alexa, open favorites, to hear those feeds. ' +
    //         constants.breakTime['100'] +
    //         'To mark any category as your favorite, you can say, mark Top Stories as favorite.' +
    //         constants.breakTime['100'] +
    //         'Here are the available categories : ' +
    //         constants.breakTime['100'];
    //     // Call category helper to get list of all categories
    //     categoryHelper((categoryList) => {
    //         message += categoryList;
    //         this.response.speak(message).listen(message);
    //         this.emit(':responseReady');
    //     });
    // },
    // 'helpFeedMode' : function () {
    //     // Outputs helps message when in FEED MODE
    //     const category = this.attributes['category'];
    //     let message = 'You are listening to ' + category +
    //         constants.breakTime['100'] +
    //         'You can say next or previous to navigate through the feed. ' +
    //         constants.breakTime['100'] +
    //         ' To hear all categories, you can say, get category list.' +
    //         constants.breakTime['100'] +
    //         ' And say restart to start over the current feed. ' +
    //         constants.breakTime['100'] +
    //         'You can also ask, give details for item 1 to get more information about the item. ' +
    //         constants.breakTime['100'] +
    //         'What would you like to do?';
    //         this.response.speak(message).listen(message);

    //         this.emit(':responseReady');
    // },
    // 'helpNoNewItemMode' : function () {
    //     // Outputs helps message when in NO NEW ITEM MODE
    //     const message = this.attributes['category'] + ' has no new items. ' +
    //         'You can say yes to hear older items and no to select other feeds.'
    //         + constants.breakTime['100'] +
    //         'What would you like to do?';
    //         this.response.speak(message).listen(message);
    //         this.emit(':responseReady');
    // },
    // 'helpSingleFeedMode' : function () {
    //     const message = config.welcome_message + 'To navigate through the feed, you can say commands like next and previous.';
    //     this.response.speak(message).listen(message);
    //     this.emit(':responseReady');
    // },
    // 'readItemSpeechHelper' : function () {
    //     // Output sorry message to user. Metrics created using cloudwatch logs to see how many users requests are made
    //     const message = 'Sorry, this feature is not available.'
    //         + constants.breakTime['250'] +
    //         'You can continue navigating through the feed by saying next.';
    //         this.response.speak(message).listen(message);
    //         this.emit(':responseReady');
    // },
    // 'sendItemSpeechHelper' : function () {
    //     // Output sorry message to user. Metrics created using cloudwatch logs to see how many users requests are made
    //     const message = 'Sorry, this feature is not available.'
    //         + constants.breakTime['250'] +
    //         'You can continue navigating through the feed by saying next.';
    //         this.response.speak(message).listen(message);
    //         this.emit(':responseReady');
    // },
    // 'itemInfoError' : function () {
    //     // Handle itemInfo request when not in feed mode
    //     const message = 'Sorry, you need to select a feed before requesting item details. ' +
    //         'What would you like to hear?';
    //     let reprompt = 'You can select any feed using its name or number' +
    //         constants.breakTime['100'] + 'Here are the available feeds : ' +
    //         constants.breakTime['100'];
    //     // Call category helper to get list of all categories
    //     categoryHelper((categoryList) => {
    //         reprompt += categoryList;
    //         this.response.speak(message).listen(reprompt);
    //         this.emit(':responseReady');
    //     });
    //     this.response.speak(message).listen(reprompt);
    //     this.emit(':responseReady');
    // },
    // 'sendItemError' : function () {
    //     // Handle sendItem request when not in feed mode
    //     const message = 'Sorry, you need to select a feed before requesting item details. ' +
    //         'What would you like to hear?';
    //     let reprompt = 'You can select any feed using its name or number' +
    //         constants.breakTime['100'] + 'Here are the available feeds : ' +
    //         constants.breakTime['100'];
    //     // Call category helper to get list of all categories
    //     categoryHelper((categoryList) => {
    //         reprompt += categoryList;
    //         this.response.speak(message).listen(reprompt);
    //         this.emit(':responseReady');
    //     });
    //     this.response.speak(message).listen(reprompt);
    //     this.emit(':responseReady');
    // },
    // 'unhandledStartMode' : function () {
    //     // Help user with possible options in _FEED_MODE
    //     let message = 'Sorry, to hear any news feed, you can select any category using its name or number. ' +
    //         constants.breakTime['100'] +
    //         'Here are the available categories : ' +
    //         constants.breakTime['100'];
    //     // Call category helper to get list of all categories
    //     categoryHelper((categoryList) => {
    //         message += categoryList;
    //         this.response.speak(message).listen(message);
    //         this.emit(':responseReady');
    //     });
    // },
    // 'unhandledFeedMode' : function () {
    //     // Help user with possible options in _FEED_MODE
    //     const message = 'Sorry, you can say next or previous to navigate through the feed. ' +
    //         constants.breakTime['100'] +
    //         ' To hear all categories, you can say, get category list.' +
    //         constants.breakTime['100'] +
    //         ' And say restart to start over the current feed. ' +
    //         constants.breakTime['100'] +
    //         'You can also ask, give details for item one to get more information about the item. ' +
    //         constants.breakTime['100'] +
    //         'What would you like to do?';
    //     this.response.speak(message).listen(message);
    //     this.emit(':responseReady');
    // },
    // 'unhandledNoNewItemMode' : function () {
    //     // Help user with possible options in _NO_NEW_ITEM_MODE
    //     const message = 'Sorry, you can say yes to hear older items and no to select other feeds.';
    //     const reprompt = this.attributes['category'] + ' has no new items. ' +
    //         'You can say yes to hear older items and no to select other feeds.'
    //         + constants.breakTime['100'] +
    //         'What would you like to do?';
    //     this.response.speak(message).listen(reprompt);
    //     this.emit(':responseReady');
    // },
    // 'unhandledSingleFeedMode' : function () {
    //     const message = 'Sorry, you can say next and previous to navigate through the feed. What would you like to do?';
    //     this.response.speak(message).listen(message);
    //     this.emit(':responseReady');
    // },
    // 'reportError' : function () {
    //     // Output error message and close the session
    //     const message = 'Sorry, there are some technical difficulties in fetching the requested information. Please try again later.';
    //     this.emit('EndSession', message);
    // }
};

function categoryHelper(callback) {
    // Generate a list of categories to serve several functions
    let categories = Object.keys(config.feeds);
    let categoryList = '';
    let cardCategoryList = '';
    let index = 0;
    categories.forEach(function (category) {
        categoryList += (++index) + constants.breakTime['100'] + category + constants.breakTime['200'];
        cardCategoryList += (index) + ') ' + category + ' \n';
    });
    categoryList += '. Which one would you like to hear?';
    cardCategoryList += 'Which one would you like to hear?';
    callback(categoryList, cardCategoryList);
}

module.exports = speechHandlers;