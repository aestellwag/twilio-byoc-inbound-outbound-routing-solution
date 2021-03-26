# Twilio BYOC Trunk - Sample Solution for Inbound and Outbound Dialing

Twilio supports the ability to leverage their existing carrier replationship by creating a BYOC (Bring Your Own Carrier) trunk.  Requirements can be found here:
https://www.twilio.com/docs/voice/bring-your-own-carrier-byoc

    The connection to Twilio can be configured in one of two ways:

    Calls can be sent to a Fully Qualified Domain Name (FQDN) of the format [customer-name].sip.us1.twilio.com over the Public Internet
    Calls can be sent to a singular IP address over a Private Connection (requires Twilio Interconnect)

The solution is to help support a catch all function to allow you to route any inbound DID from the BYOC trunk to various endpoints within your Twilio environment.  Examples most commonly would point to different Studio Flows, TwiML Bins, Functions, or cusotm webhooks.

## Pre-req

For this page, I won't outline how to setup the BYOC trunk, you can find that information here: https://www.twilio.com/docs/voice/bring-your-own-carrier-byoc

Once you have the trunk configured, we will make some minor tweeks to support inbound and outbound

```
It is important to note that as of writing this guide, you are unable to do full outbound from the Flex UI (via a Plugin).  The way we will control outbound calls will be via a Studio Flow pointing to a Function.  Development is working on an enhancement to support this from the Flex Client (allowing it to be set using a custom plugin).  -Date - 03/26/21 of writing this
```

## Setup

You will find a copy of two functions within the function folder.  Copy the code and create a new function within your Twilio Console for each: https://www.twilio.com/console/functions/overview

Inbound Catch All Setup:
```
Inbound_Voice_CatchAll.js requires a few changes (see comments in the code as well)

REQUIRED UPDATES:  Copy any numbers you wish to have specific routing for and define the redirect endpoint (IE the studio flow webhook, function URL, etc..)  For testing, you can leave each case and just configure the default case.  The default case is ultimately the catch all if no cases match

Once you have deployed the function, you will reference the function under your BYOC SIP domain > under Call Control Configurations > A Call Comes In

**Reference Image File: Inbound_SIP_Domain_Config(Image).png within the root directory of this repository**

```

Outbound Calls via BYOC Trunk Setup:
```
Run: 
Outbound_BYOC_Trunk.js requires zero changes in it's current state.  However, we need to draw attention to two variables with the function.
Specifically:
    // Pulling the outboundDID variable from the studio flow key/value parameter
    const outboundDID = event.OUTBOUND_DID;
    // Pulling the byocTrunk variable from the studio flow key/value parameter
    const byocTrunk = event.BYOC_TRUNK_SID;

Remember the names as we will need those in the next step.  Save/Deploy the Outbound Function.

1 - Create a studio flow, typically this scenario would be used if you wished to do an external transfer it forward over the BYOC trunk vs Twilio's Super Network.  
2 - Within the Studio Flow create a Run a Function widget
3 - Reference the Outbound BYOC function you just deployed
4 - Create two Key/Value pair parameters
    a - Key = OUTBOUND_DID   <--that name exactly, recall the function is calling this value form the event
        Value = value will equal the DID you are wanting to external transfer (example +13172222222)
    B - Key = BYOC_TRUNK_SID   <--that name exactly, recall the function is calling this value form the event
        Value = SID of the BYOC Trunk, you can find this under the BYOC Trunk settings within Programmable Voice (you should have previously created this in the pre-req steps section above)

**Reference Image File: Outbound_Studio_Flow_Config(Image).png within the root directory of this repository**
```


## Testing

You are ready to test once you've configured one or both functions and followed the Pre-Req and Setup steps above.

Testing Inbound:
```
To test inbound, the BYOC Carrier should have a test DID or DIDs pointed to the Twilio trunk/domain you previously setup.  If you did any specific routing, test each number and ensure it routes to the configured endpoint in the function
```

Testing Outbound:
```
To test outbound, connect to the Studio Flow you configured above and select the option/widget you configured above.  This call should route over the BYOC Trunk vs the Twilio SIP Network.  You can confirm this by looking at the Call Logs (found under Programmable Voice > Calls) or having the Carrier confirm they see it routing into their network
```
