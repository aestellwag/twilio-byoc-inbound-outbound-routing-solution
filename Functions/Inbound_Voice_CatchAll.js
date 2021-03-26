exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();
    
    // When redirecting to a studio flow, the flow has to be the first to do a say or play
    // The redirects below have to be first, and no say/play can be support or the call will fail
    // when it is redirected to the studio flow
    
	switch(event.To) {
	    // replace number and the webhook to the redirect, in this case I have it going to a studio flow, other function, webhook, etc..
	    case '+13172222222':
            twiml.redirect('https://webhooks.twilio.com/v1/Accounts/XXXXXXXXXXXX');
	        break;
        // replace number and the webhook to the redirect, in this case I have it going to a studio flow, other function, webhook, etc..
        case '+1XXXXXXX':
            twiml.redirect('https://webhooks.twilio.com/v1/Accounts/XXXXXXXXXXXX');
            break;
        // default case and the catch all, if nothing matches it will redirect here
        default:
            twiml.redirect('https://webhooks.twilio.com/v1/Accounts/XXXXXXXXXXXX');
	}
	callback(null, twiml);
};