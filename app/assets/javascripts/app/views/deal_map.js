define([
  'lib/events',
  'jquery',
  'backbone',
  'gmaps'
], function(events, $, Backbone, gmaps) {
  
  return Backbone.View.extend({
    
    el: '#map',
    
    initialize: function() {
      events.on('user:located', this.to, this);
    },

    render: function() {
      this.gmap = new gmaps.Map(this.$el.get(0), {
        zoom: 12,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.gplaces = new google.maps.places.PlacesService(this.gmap);
    },

    clear_places: function() {
    },

    render_places: function(latlng) {
      this.clear_places();
      this.gplaces.search({
        location: latlng, 
        radius: 10000,
        types: [ 'bar' ]
      }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          _(results).each(function(place) {
            this.render_place(place);
          }.bind(this));
        } 
      }.bind(this));
    },

    render_place: function(place) {
      new gmaps.Marker({
        map: this.gmap,
        position: place.geometry.location,
        title: place.name
      });
    },

    to: function(latlng) {
      if (!this.gmap) return;
      this.gmap.setCenter(latlng);
      this.render_places(latlng);
    }
  });
});

