describe('Hello', function() {
  var context = describe;
  var hello_lambda = require('../src/hello_lambda').handler;

  context('no parameter passed', function() {
    it ('throws exception', function() {

      expect(function(){ hello_lambda() }).toThrowError('No event passed.');
    });
  });

  context('one parameter passed', function() {
    it ('throws exception', function() {
      var event = {}

      expect(function(){ hello_lambda(event) }).toThrowError('No context passed.');
    });
  });

  context('invalid request type', function() {
    it('fails context', function () {
      var invalidEvent = { request: { type: 'Invalid Request Type' }}
      var spyContext = jasmine.createSpyObj('context', ['fail']);

      hello_lambda(invalidEvent, spyContext)

      expect(spyContext.fail).toHaveBeenCalledWith('Unknown Request Type: Invalid Request Type');
    });
  });

  context('valid request', function() {
    it('returns speechlette response', function() {
      var event = { request: { type: 'LaunchRequest' }}
      var spyContext = jasmine.createSpyObj('context', ['succeed']);

      hello_lambda(event, spyContext)

      var expectedResponse = {
        version: "1.0",
        sessionAttributes: {},
        response: {
          outputSpeech: {
            type: "PlainText",
            text: "I was a gift from your brother Matt!"
          },
          shouldEndSession: true
        }
      };

      expect(spyContext.succeed).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
