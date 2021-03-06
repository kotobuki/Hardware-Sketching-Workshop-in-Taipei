# Getting Started with Dialogflow

## What is Dialogflow?

- A service that enables you to build engaging voice and text-based conversational interfaces powered by AI.
- By providing examples of what a user might say when interacting, analyze and understand the user's intent.
- Can be easily combined with popular touchpoints such as Google Assistant, Slack, and Facebook Messenger.

## Let's Make Your First Agent

### What You Need

- Google account: 1
- PC: 1
- iOS or Android device: 1
- Google Assistant app: 1
- MESH app: 1
- MESH LED Tag: 1
- Bridge Server: 1

### The First Step

1. Point your web browser to https://dialogflow.com/
2. Press `SIGN UP FOR FREE`
3. Press `Google` under `Sign in with`, login with an account to be used for Dialogflow, allow dialogflow.com to 'View and manage your data across Google Cloud Platform services', and accept the `Terms of Service`
4. Now it's time to create your first agent! Press `CREATE AGENT` to go ahead and allow dialogflow.com to 'View and manage your Actions on Google'
5. Define the name of your first agent (e.g. Workshop) and press `SAVE`
6. Click on the icon in the top left to show the left navigation
7. Choose `Default Welcome Intent`
8. Give a few examples to `User says` (e.g. 'Hi', 'Hello', 'Howdy')
9. Press `SAVE` and wait for a while till `Agent training completed` appers on the bottom right of the console
10. Pick a phrase similar to what you gave to `User says`, type in the phrase to `Try it now` field on the upper right of the console and see what happens

Congratulations! You were able to create the first (simple) agent. This agent works on the following system which consists of a local web browser and a web service on the Internet.

> **Agents** are best described as NLU (Natural Language Understanding) modules. These can be included in your app, product, or service and transforms natural user requests into actionable data.

> **Intents** are the mechanisms that pick up what your user is requesting and direct the agent to respond accordingly.

```plantuml
@startuml
hide footbox
skinparam defaultFontName Helvetica Neue
'skinparam DefaultFontSize 10
skinparam Shadowing false
skinparam ParticipantPadding 10

box "Local" #WhiteSmoke
actor Person
participant "Web Browser" as Browser
end box

box "Internet" #WhiteSmoke
participant "Dialogflow" as Dialogflow
end box

Person ->> Browser : 'Hi!''
note left: Type a phrase
Browser ->> Dialogflow : Request
Dialogflow ->> Browser : Response
Browser ->> Person : 'Hello!'
note right: Show the response
@enduml
```

#### Note

Until recently Dialogflow was named API.AI. If the following message appears at the top of the screen, please press "DISMISS" and close it.

![dismiss](/assets/dismiss.png)

### Add Conversations for Small Talk

1. Click on `Small Talk` in the left navigation and click on `Enable` to enable small talk
2. Clink on `About agent` and pick a topic (e.g. `About agent`)
3. Give answers to questions
4. Press `SAVE` and try by typing phrases to `Try it now` field

### Your First Agent with Google Assistant

1. Click on `Integrations` in the left navigation
2. Click on `Google Assistant` and click on the toggle on the top right
3. Press `AUTHORIZE`, choose your account and allow dialogflow.com to 'View and manage your Google Assistant voice commands, dialog and grammar'
3. Press `UPDATE DRAFT` to update your Actions on Google draft with your Dialogflow configuration
4. Press `VISIT CONSOLE` to visit the Actions on Google console
5. Click on `Simulator` in the left navigation
6. Press `START TESTING` to start testing your agent
7. Choose `Actions on Google - DRAFT` in the `Start testing your app
` and press `DONE`
8. Type `Talk to my test app` in the simulator
9. Type questions to test
10. Launch the Google Assistant app on your iPad
11. say `Ok Google` or `Hey Google` to activate voice input, then say `Talk to my test app` in the simulator in the Google Assistant app
12. Ask questions to test

```plantuml
@startuml
hide footbox
skinparam defaultFontName Helvetica Neue
skinparam DefaultFontSize 10
skinparam Shadowing false
skinparam ParticipantPadding 10

box "Local" #WhiteSmoke
actor Person
participant "Google Assistant App" as App
end box

box "Internet" #WhiteSmoke
participant "Actions on Google" as AoG
participant "Dialogflow" as Dialogflow
end box

== Initialization ==
Person ->> App : 'Ok Google'
note left: Say a hotword
App ->> Person : Ping!
note right: Start listening
Person ->> App : 'Talk to my test app'
App ->> AoG : Request
AoG ->> Dialogflow : Request
AoG ->> App : Response
App ->> Person : 'Sure. Getting the test version of my test app.'
note right: The initial message from Actions on Google
Dialogflow ->> AoG : Response
AoG ->> App : Response
App ->> Person : 'Hello!'
note right: A welcome message from the agent

== Repetition ==
Person ->> App : 'Who are you?'
note left: Say a phrase
App ->> AoG : Request
AoG ->> Dialogflow : Request
Dialogflow ->> AoG : Response
AoG ->> App : Response
App ->> Person : 'I am ...'
note left: Say the response
@enduml
```

#### Trouble Shooting

If an error message like the one shown below appears, click the icon in the upper right of the screen to verify that it is the same as the Google account you are using with Dialogflow. If it is different, you need to select the account.

![error-visiting-console](/assets/error-visiting-console.png)

If you see an error message about the Google Account activity settings from the simulator, please visit https://myaccount.google.com/activitycontrols in your web browser and refer to the screenshots below to set them up.

![activity-settings-1](/assets/activity-settings-1.png)

![activity-settings-2](/assets/activity-settings-2.png)

## Let's Connect Your Agent to Web Services

### Preparation

1. Click on `Fulfillment` in the left navigation on the Dialogflow page
2. Click on `DISABLED` next to `Webhook` toggle to enable webhook
3. Enter the URL of the workshop server (e.g. https://xxxxxxxx.ngrok.io) to the `URL` field (can be found in the Dropbox folder as `server.txt`)
4. Enter a pair of a key and a value, `keys` and to the `HEADERS` field; `keys` (not `key`) and `{"ifttt":"*********************","openweathermap":"********************************"}` (can be found in the Dropbox folder as `keys.txt`)
5. Press `SAVE` to save settings

If you forgot your IFTTT key, point your web browser to https://ifttt.com/maker_webhooks, then click on `Documentation` to see your key.

![setting-webhook](/assets/setting-webhook.png)

### Weather

1. Click on `Intents` in the left navigation
2. Press `CREATE INTENT` to create a new intent
3. Enter `weather` as an action name in `Action`
4. Type `How is the weather in Taipei, Taiwan?` to `User says`
5. Double click on `Taiwan` and choose `@sys.geo-country` ![setting-entities](/assets/setting-entities.png)
6. Check `REQUIRED` for `geo-city` and `geo-country`, then add prompts for both (e.g. `Which city?` and `Which country?`) ![setting-action](/assets/setting-action.png)
7. Check `Use webhook` for `Fulfillment`, then press `SAVE`
8. Click on `Integrations` and click on `Google Assistant`, then press `UPDATE DRAFT`
9. Talk to your Google Assistant and see what happens

> **Entities** are powerful tools used for extracting parameter values from natural language inputs.

```plantuml
@startuml
hide footbox
skinparam defaultFontName Helvetica Neue
skinparam DefaultFontSize 10
skinparam Shadowing false
skinparam ParticipantPadding 10

box "Local" #WhiteSmoke
actor Person
participant "Google Assistant App" as App
end box

box "Internet" #WhiteSmoke
participant "Actions on Google" as AoG
participant "Dialogflow" as Dialogflow
participant "Bridge Server" as Bridge
participant "OpenWeatherMap" as OWM
end box

== Repetition ==
Person ->> App : Say something
App ->> AoG : Request
AoG ->> Dialogflow : Request
Dialogflow ->> Bridge : Request
Bridge ->> OWM : Request
OWM ->> Bridge : Response
Bridge ->> Dialogflow : Response
Dialogflow ->> AoG : Response
AoG ->> App : Response
App ->> Person : Say the response
@enduml
```

The following is an example of a webhook sent from Dialogflow.

```json
{
  "id": "********-****-****-****-************",
  "timestamp": "2017-10-17T00:43:12.992Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "How is the weather in Nagoya, Japan?",
    "action": "weather",
    "actionIncomplete": false,
    "parameters": {
      "geo-city": "Nagoya",
      "geo-country": "Japan"
    },
    "contexts": [],
    "metadata": {
      "intentId": "********-****-****-****-************",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "false",
      "webhookResponseTime": 6383,
      "intentName": "Weather"
    },
    "fulfillment": {
      "speech": "The current weather in Aoichō is light rain, and the temperature is 15 °C, the humidity is 93 %.",
      "displayText": "The current weather in Aoichō is light rain, and the temperature is 15 °C, the humidity is 93 %.",
      "messages": [
        {
          "type": 0,
          "id": "********-****-****-****-************",
          "speech": "The current weather in Aoichō is light rain, and the temperature is 15 °C, the humidity is 93 %."
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 200,
    "errorType": "success"
  },
  "sessionId": "********-****-****-****-************"
}
```

### IFTTT

1. Click on `Intents` in the left navigation
2. Press `CREATE INTENT` to create a new intent
3. Enter `ifttt.TurnOn` as an action name in `Action`
4. Give examples such as `Turn on the light`, `Turn the on`, `Light on` to `User says`
5. Check `Use webhook` for `Fulfillment`, then press `SAVE`
6. Click on `Integrations` and click on `Google Assistant`, then press `UPDATE DRAFT`
7. Point your web browser to https://ifttt.com/my_applets, then press `New Applet`
8. Click on `+this`, choose Webhooks, fill the `Event Name` field with `TurnOn`, then press `Create trigger`
9. Click on `+that`, choose MESH, fill `EventID` with `{{EventName}}`, then press `Create action`
10. Press `Finish` to make an applet
11. Create a recipe on the MESH app on your iPad to connect a IFTTT tag to a LED tag
12. Talk to your Google Assistant and see what happens

![mesh-settings-ifttt-receive](/assets/mesh-settings-ifttt-receive.png)

![mesh-settings-recipe](/assets/mesh-settings-recipe.png)

```plantuml
@startuml
hide footbox
skinparam defaultFontName Helvetica Neue
skinparam DefaultFontSize 10
skinparam Shadowing false
skinparam ParticipantPadding 10

box "Local" #WhiteSmoke
actor Person
participant "Google Assistant App" as App
participant "LED Tag" as LedTag
participant "MESH App" as MeshApp
end box

box "Internet" #WhiteSmoke
participant "Actions on Google" as AoG
participant "Dialogflow" as Dialogflow
participant "Bridge Server" as Bridge
participant "IFTTT" as IFTTT
end box

Person ->> App : `Turn the light on`
App ->> AoG : Request
AoG ->> Dialogflow : Request
Dialogflow ->> Bridge : Request
Bridge ->> IFTTT : Request
IFTTT ->> Bridge : Response
Bridge ->> Dialogflow : Response
Dialogflow ->> AoG : Response
AoG ->> App : Response
App ->> Person : 'Sure!'
... up to a few minutes ...
IFTTT ->> IFTTT : Execute the applet
activate IFTTT
IFTTT ->> MeshApp : Request
deactivate IFTTT
MeshApp ->> LedTag: Request
LedTag ->> Person: Light
@enduml
```

## Advanced Topics

### The Bridge Server

In the two samples mentioned above, the server that Dialogflow agent was accessing to execute fullfillment is implemented in JavsScript and Node.js. If you want to adapt to actions other than `weather` and `ifttt`, you need to modify and extend the code.

@import "app.js" {code_block=true}

#### Setup on macOS

1. [Install Node.js and npm](https://nodejs.org/en/download/package-manager/#macos)
2. Open a Terminal
3. Execute `npm install` in the same folder as `app.js` to install required packages
4. Execute `npm start` to start the bridge server
5. Open another Terminal
6. [Download ngrok](https://ngrok.com/download), unzip it, then run it like `./ngrok http 8080`

```sh
$ npm start

> bridge-server@0.0.1 start /Users/mayfair/Documents/development/Hardware-Sketching-Workshop-in-Taipei
> node app.js

App listening on port 8080
Press Ctrl+C to quit.
```

```sh
./ngrok http 8080
ngrok by @inconshreveable                                       (Ctrl+C to quit)
                                                                                
Session Status                online                                            
Account                       Shigeru Kobayashi (Plan: Free)                    
Version                       2.2.8                                             
Region                        United States (us)                                
Web Interface                 http://127.0.0.1:4040                             
Forwarding                    http://a1234567.ngrok.io -> localhost:8080        
Forwarding                    https://a1234567.ngrok.io -> localhost:8080       
                                                                                
Connections                   ttl     opn     rt1     rt5     p50     p90       
                              0       0       0.00    0.00    0.00    0.00 
```

In this example, `https://a1234567.ngrok.io` is the address to be specified at the Fulfillment settings.

## References

- OpenWeatherMap.org. "Weather API." OpenWeatherMap. Accessed October 16, 2017. http://openweathermap.org/api.
- Speaktoit, Inc. "Basics." Dialogflow. Accessed October 16, 2017. https://dialogflow.com/docs/getting-started/basics.