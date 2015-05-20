/*jslint node: true*/
/*globals sails*/

/**
 * HTTP Service
 *
 * Returns basic host information
 */

module.exports = {

  /**
   * Get the site's base URL
   *
   * TODO: currently only returns localhost
   * 
   * @return {string} The base URL
   */
  getBaseUrl: function () {
    var usingSSL = sails.config.ssl && sails.config.ssl.key && sails.config.ssl.cert,
      port = sails.config.proxyPort || sails.config.port,
      protocol = (usingSSL ? 'https' : 'http') + '://',
      hostname = (sails.getHost() || 'localhost'),
      suffix = port === 443 ? '' : ':' + port;

    return protocol + hostname + suffix;
  },

};