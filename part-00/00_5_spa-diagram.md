## **0.5: Single page app diagram**

Create a diagram depicting the situation where the user goes to the [single-page app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#single-page-app) version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

*Solution:*

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>-browser: HTML document
    
    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: the css file
    
    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>-browser: the JavaScript file
    Note right of browser: the browser starts executing the JS code that fetches the data.json and draws the list of notes whether response is status OK
    
    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>-browser: [{content: "hi", date: "2024-05-17T19:51:30.484Z"}, {content: "", date: "2024-05-17T19:53:48.323Z"},…]
    
    browser->>+server: GET https://studies.cs.helsinki.fi/favicon.ico
    server-->>-browser: Status code 404 Not Found
    Note right of browser: the default GET request for favicon was not successful because the asset was not found
```