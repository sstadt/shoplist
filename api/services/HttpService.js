/*jslint node: true*/
/*globals sails*/

module.exports = {
  getBaseUrl: function () {
    var usingSSL = sails.config.ssl && sails.config.ssl.key && sails.config.ssl.cert,
      port = sails.config.proxyPort || sails.config.port,
      protocol = (usingSSL ? 'https' : 'http') + '://',
      hostname = (sails.getHost() || 'localhost'),
      suffix = port === 443 ? '' : ':' + port;

    return protocol + hostname + suffix;
  },
};