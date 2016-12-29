module.exports.handler = function(event, context) {
  if (event == null) {
      throw new Error('No event passed.');
  }
  if (context == null) {
    throw new Error('No context passed.');
  }

  if (event.request.type == 'LaunchRequest') {
    context.succeed({
      version: "1.0",
      sessionAttributes: {},
      response: {
        outputSpeech: {
          type: "PlainText",
          text: "Hello World"
        },
        shouldEndSession: true
      }
    });
  } else {
    context.fail('Unknown Request Type: ' + event.request.type);
  }
}
