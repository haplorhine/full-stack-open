# New note in single page app diagram

```mermaid
    sequenceDiagram
        participant user
        participant browser
        participant server
        
        user->>browser: Click Save button
        activate browser
        Note right of browser: The event handler creates a new note, adds it to the list of notes and rerenders the list on the page

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        Note right of browser: The post POST request includes the new note as JSON Data. This content type specified in the request header.
        Note right of server: The server uses data from the request body and stores it internally
        server-->>browser: { "message": "note created" }
        deactivate server
```