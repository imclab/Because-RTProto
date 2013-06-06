// Generated by CoffeeScript 1.4.0

define(["d3view"], function(D3View) {
  var MarkerView;
  return MarkerView = D3View.extend({
    tagName: 'g',
    engaged: false,
    initialize: function(options) {
      D3View.prototype.initialize.call(this, options);
      this.model.get('x').addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, _.bind(this.onPositionChanged, this));
      this.model.get('y').addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, _.bind(this.onPositionChanged, this));
      this.model.get('color').addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, _.bind(this.onColorChanged, this));
      this.dispatcher.on('tool:engage', _.bind(this.onToolEngage, this));
      this.dispatcher.on('tool:move', _.bind(this.onToolMove, this));
      return this.dispatcher.on('tool:release', _.bind(this.onToolRelease, this));
    },
    onPositionChanged: function(rtEvent) {
      return this.d3el.attr({
        'transform': "matrix(1 0 0 1 " + (this.model.get('x').getText()) + " " + (this.model.get('y').getText()) + ")"
      });
    },
    onColorChanged: function(rtEvent) {
      var _ref;
      return this.markerCircleElement.attr({
        'fill': ((_ref = this.model.get('color')) != null ? _ref.getText() : void 0) || 'gray'
      });
    },
    onToolEngage: function(ev, tool) {
      var matrix, target, x, y;
      target = d3.select(ev.target);
      if (target.attr('data-object-id') === this.model.id) {
        if (tool === 'delete') {
          this.dispatcher.trigger('marker:delete', this.model);
        }
        if (tool === 'move') {
          this.engaged = true;
          matrix = this.d3el.attr('transform').slice(7, -1).split(' ');
          x = matrix[4] !== 'NaN' ? parseInt(matrix[4], 10) : 0;
          y = matrix[5] !== 'NaN' ? parseInt(matrix[5], 10) : 0;
          this.offsetX = ev.clientX - this.el.offsetLeft - x;
          return this.offsetY = ev.clientY - this.el.offsetTop - y;
        }
      }
    },
    onToolMove: function(ev, tool) {
      var target, x, y;
      target = d3.select(ev.target);
      if (this.engaged) {
        if (tool === 'move') {
          x = ev.clientX - this.el.offsetLeft - this.offsetX;
          y = ev.clientY - this.el.offsetTop - this.offsetY;
          return this.d3el.attr('transform', "matrix(1 0 0 1 " + x + " " + y + ")");
        }
      }
    },
    onToolRelease: function(ev, tool) {
      var matrix, target;
      target = d3.select(ev.target);
      if (this.engaged) {
        if (tool === 'move') {
          matrix = this.d3el.attr('transform').slice(7, -1).split(' ');
          this.model.get('x').setText(matrix[4]);
          this.model.get('y').setText(matrix[5]);
          return this.engaged = false;
        }
      }
    },
    render: function() {
      var _ref;
      this.d3el.attr({
        'id': this.model.id,
        'x': 0,
        'y': 0,
        'transform': "matrix(1 0 0 1 " + (this.model.get('x').getText()) + " " + (this.model.get('y').getText()) + ")",
        'data-type': 'marker',
        'data-object-id': this.model.id
      });
      if (!this.markerCircleElement) {
        this.markerCircleElement = this.d3el.append('circle');
        return this.markerCircleElement.attr({
          'r': 5,
          'cx': 5,
          'cy': 5,
          'fill': ((_ref = this.model.get('color')) != null ? _ref.getText() : void 0) || 'gray',
          'stroke': 'none',
          'data-type': 'marker-circle',
          'data-object-id': this.model.id
        });
      }
    }
  });
});
