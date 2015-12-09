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
 - Miscellaneous bug fixes

### 0.1.4

 - Redesigned home page
 - Improved UI feedback during async requests
 - Implemented password recovery

### 0.1.4.1

 - miscellaneous fixes and optimization to user, registration, and login workflows

# In Development

### 0.2

 - [ ] Create a logo
 - [ ] Add a favicon
 - [ ] Add a logged-out navbar
 - [ ] Center login/registration forms and put full screen background images on them
 - [ ] User Profile page

#### User Profile Page

##### config options

 - avatar
 - name
 - email ?
 - password
 - ask before logging me out

### 0.2.0.1

 - [ ] add avatars and larger listings when sharing a list

### 0.2.1

 - [ ] Categories
 - [ ] Sort by category
 - [ ] Drag re-order

### 0.2.2

 - [ ] Facebook login
 - [ ] Item cache
 - [ ] Auto-fill list item from cache

### 0.2.3

 - [ ] Improve email templates
 - [ ] Custom 403, 404, and 500 pages

### 0.3

 - [ ] Barcode scanning
 - [ ] barcode item relation caching

# Project Setup

```
npm install -g sails
cd /path/to/project/root
npm install && bower install
```

Create the file `config/local.js` and paste the following into it, replacing the values in quotes with your testing data.

```javascript
module.exports = {

  email: {
    noreply: {
      address: 'gmail address to use for requests',
      password: 'Gmail API password'
    }
  },

  hash: 'replace with some hash value',

};
```

Make sure you have mongod running on the default port and start the app with the command `sails lift`


