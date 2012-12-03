Marker.register('info_window', function(place) {
  this
    .div()
      .img({ src: place.icon }, true)
      .p('name: ' + place.name, true)
      .p('address: ' + place.vicinity, true)
      .a({ href: '/venues/' + place.id + '/deals/new' }, 'Add deal', true)
});
