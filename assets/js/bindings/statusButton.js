/*jslint browser: true*/
/*globals define*/

define(['knockout'], function (ko) {

  function toggleLoadingIcon(button, isLoading) {
    button.find('.fa-spin').toggle(isLoading).siblings('.fa').toggle(!isLoading);
  }

  ko.bindingHandlers.statusButton = {
    init: function (element, valueAccessor) {
      var loading = ko.unwrap(valueAccessor()),
        el = $(element);

      el.prepend('<i class="fa fa-spin fa-spinner"></i> ');
      toggleLoadingIcon(el, loading);
    },
    update: function (element, valueAccessor) {
      var loading = ko.unwrap(valueAccessor()),
        el = $(element);

      toggleLoadingIcon(el, loading);
    }
  };

});