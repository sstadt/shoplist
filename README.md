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

### 0.1.2

 - Fixed a bug in the share window
 - Optimized asset compilation
 - Replaced individual item deletion with a 'delete all checked' button
 - Non-item list updates are now restricted to owners
 - Fixed an issue with error dialogs

# In Development

### 0.1.2.1

 - [x] Fix the socket issue with editing an existing list where the index of the edited list does not match the index of the list that was edited

### 0.1.3

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


