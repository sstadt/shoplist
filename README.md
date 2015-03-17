Simple Shopping List Application
================================

A RequireJS/Knockout application that uses sails.js's built in socket functionality to keep lists synced between multiple users.

Demo site: http://shoplist.scottstadt.com

# Released

### 0.1

 - List and list item management
 - List Share and sync
 - Account registration and login
 - Mobile First!

### 0.1.1

 - List items are now sorted after adding a new item
 - Front end assets are now compiled and minified to a single file
 - Improved validation for new user and login pages
 - Miscellaneous bug fixes

# In Development

### 0.1.2

 - [x] Fix the bug in the share window button
 - [ ] Return focus to the text field after adding an item on mobile
 - [x] Fix the bug with overlays not fading out when their observable is updated
 - [x] Update/remove grunt tasks so that only the compiled assets are placed in .tmp in production
 - [ ] Make a 'delete' all checked button, with confirmation dialog; remove individual item delete buttons
 - [ ] Restrict list sharing to list owners

### 0.1.3

 - [ ] See is grunt-requirejs will allow using the full requirejs, and move global initialization back into config file if so
 - [ ] Add ajax loaders to buttons that make socket calls
 - [ ] Fully docblock back end and front end
 - [ ] Validate item quantity as > 0 on the back end
 - [ ] Add a resend link to the login 'not verified' error message

### 0.2

 - [ ] Add a favicon
 - [ ] Create a splash page
 - [ ] Improve email templates
 - [ ] Add a sync icon to display the status of the most recent save
 - [ ] User Profile page
 - [ ] Password recovery/reset
 - [ ] Facebook login
 - [ ] Drag reorder list items
 - [ ] Categories
 - [ ] Sort by category
 - [ ] Barcode scanning
 - [ ] Barcode site cache
 - [ ] Upgrade alert component to change alert style by parameter

### 0.3

 - [ ] Barcode scanning
 - [ ] item database caching
 - [ ] Auto-fill list item names cache
 - [ ] Custom 403, 404, and 500 pages


