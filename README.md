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

### 0.1.2.1

 - Fixed an issue with list updated received via sockets
 - The clear checked button will no longer show if there are no items to clear

### 0.1.3

 - Added a splash page

# In Development

### 0.1.4

 - [x] Fix the 'clear all items' button to update when items are cleared
 - [ ] Use a parallax effect on the home page to show the features and reveal the getting started button
 - [ ] Add ajax loaders to buttons that make socket calls
 - [ ] Password recovery/reset

### 0.2

 - [ ] Create a logo
 - [ ] Add a favicon
 - [ ] Improve email templates
 - [ ] User Profile page

### 0.2.1

 - [ ] Facebook login
 - [ ] Item cache
 - [ ] Auto-fill list item from cache

### 0.2.2

 - [ ] Drag reorder list items
 - [ ] Categories
 - [ ] Sort by category

### 0.3

 - [ ] Barcode scanning
 - [ ] barcode item relation caching
 - [ ] Custom 403, 404, and 500 pages


