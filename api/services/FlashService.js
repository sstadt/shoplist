


function updateMessageType(type, req, msg) {
  if (!req.session.flash) {
    req.session.flash = { msg: {} };
    req.session.flash.msg[type] = [msg];
  } else if (req.session.flash.msg[type]) {
    req.session.flash.msg[type].push(msg);
  } else {
    req.session.flash.msg[type] = [msg];
  }
}

module.exports = {

  // TODO: These should take either a string or an array for 'msg', currently only takes a string

  error: function (req, msg) {
    updateMessageType('error', req, msg);
  },
  warning: function (req, msg) {
    updateMessageType('warning', req, msg);
  },
  success: function (req, msg) {
    updateMessageType('success', req, msg);
  }
};