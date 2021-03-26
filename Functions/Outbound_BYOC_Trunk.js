exports.handler = function(context, event, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();
    
    // Pulling the outboundDID variable from the studio flow key/value parameter
    const outboundDID = event.OUTBOUND_DID;
    // Pulling the byocTrunk variable from the studio flow key/value parameter
    const byocTrunk = event.BYOC_TRUNK_SID;
  
    // Send the outboundDID number out of the byocTrunk sid defined in the studio flow
    twiml.dial()
        .number(
            {byoc: byocTrunk}, 
            outboundDID
        );
    // End our function
    callback(null, twiml);
};