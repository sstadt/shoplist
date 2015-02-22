/*jslint node: true*/
/*globals sails*/

var nodemailer = require("nodemailer");

module.exports = {

  send: function (to, frm, pw, subj, msg, callback) {

    // create reusable transport method (opens pool of SMTP connections)
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: frm,
        pass: pw
      }
    });

    // setup e-mail data with unicode symbols
    var options = {
      from: sails.config.globals.site.title + " <" + frm + ">", // sender address
      to: to, // list of receivers
      subject: subj, // Subject line
      text: msg, // plaintext body
      html: msg // html body
    };

    // send mail with defined transport object
    // @todo: this doesn't return anything to the function, will have to log errors or something
    transporter.sendMail(options, callback);
  }

};