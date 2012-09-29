define([
  'jquery',
  'gmaps',
  'lib/events',
  'app/views/deal_map',
  'app/views/deal_list'
], function($, gmaps, events, Map, List) {

  new Map().render();

  if (Modernizr.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      events.trigger('user:located', new gmaps.LatLng(position.coords.latitude, position.coords.longitude));
    });
  }
});
