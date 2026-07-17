```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: The server appends the new note to the database
    deactivate server
    browser-->>browser: The browser executes the callback function that renders the notes 
```