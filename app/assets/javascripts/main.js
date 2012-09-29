requirejs.config({
  shim: {
    marker: {
      exports: 'Marker'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
        deps: [ 'underscore', 'jquery' ],
        exports: 'Backbone'
    }
  },
  paths: {
    async: 'require.async'
  }
});

define('gmaps', [ 'async!https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false' ], function() {
  return google.maps;
});

require([ 'modernizr', 'app/boot' ]);
