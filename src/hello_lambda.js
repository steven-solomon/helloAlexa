module.exports.handler = function(event, context) {
  validateInput(event, context);

  execute(event.request.type,
    function success(message) {
      context.succeed(message);
    }, function failure(message) {
      context.fail(message);
    });
}

function execute(eventType, success, failure) {
  switch (eventType) {
    case 'LaunchRequest':
      success(successMessage());
      break;
    case 'IntentRequest':
      success(successMessage());
      break;
    case 'SessionEndedRequest':
      break;
    default:
      failure('Unknown Request Type: ' + eventType);
  }
}

function validateInput(event, context) {
  if (event == null) {
      throw new Error('No event passed.');
  }
  if (context == null) {
    throw new Error('No context passed.');
  }
}

function successMessage() {
  return {
    version: "1.0",
    sessionAttributes: {},
    response: {
      outputSpeech: {
        type: "PlainText",
        text: 'I was a gift from your brother Matt!'
      },
      shouldEndSession: true
    }
  };
}
