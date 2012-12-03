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
      this.info_window = new google.maps.InfoWindow({ content: '' });
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
      var marker = new gmaps.Marker({
        map: this.gmap,
        position: place.geometry.location,
        title: place.name
      });
      this.setup_info_window(marker, place);
    },

    setup_info_window: function(marker, place) {
      google.maps.event.addListener(marker, 'click', function() {
        this.info_window.setContent(Marker.render('info_window', place));
        this.info_window.open(this.gmap, marker);
      }.bind(this));
    },

    to: function(latlng) {
      if (!this.gmap) return;
      this.gmap.setCenter(latlng);
      this.render_places(latlng);
    }
  });
});

