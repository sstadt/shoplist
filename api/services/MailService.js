/*jslint node: true*/
/*globals sails*/

/**
 * Mail Service
 *
 * Functions related to sending mail
 */

var nodemailer = require("nodemailer");

module.exports = {

  /**
   * Send a mail message from Gmail
   *
   * @param  {string}   to       The recipient email address
   * @param  {string}   frm      The sender email address
   * @param  {string}   pw       The sender email password
   * @param  {string}   subj     The email subject
   * @param  {string}   msg      The email message body
   * @param  {Function} callback The function to execute once the service has completed the send operation
   */
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