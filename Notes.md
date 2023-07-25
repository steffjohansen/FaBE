# FABE - FAIRTIQ mAlicious Browser Extension


# Files
- Manifest.json
- service worker (can I work offline after user having closed their browser? send spy things) - can use all of chrome API
- Content scripts (DOM injection) - access to subset of chrome API

Questions
- Can I request webcam permissions to extension while visiting meet.google.com?
- Can I keep running in the background and sending things like keystrokes after closing chrome?
- Can I abuse the clip board api? This is quite restricted. 
- What about keystrokes and passwords? x
- Session cookies? x
- Local storage? x
- Can I fetch browser history x
- Can I access local files? Partially.


# Notes
- Permissions that comes with warnings: https://developer.chrome.com/docs/extensions/mv3/permission_warnings/#permissions_with_warnings


