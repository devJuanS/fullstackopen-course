## 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

*Solution:*

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The browser redraws the list with the value entered in the input and sends it to server
    server-->>-browser: Status 201 Created | Response: {"message":"note created"}
		Note left of server: the server responds with the message "note created"
```