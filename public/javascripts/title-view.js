// Generated by CoffeeScript 1.4.0

define(function() {
  var TitleView;
  return TitleView = Backbone.View.extend({
    initialize: function(options) {
      Backbone.View.prototype.initialize.call(this, options);
      this.dispatcher = options.dispatcher;
      return this.model.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, _.bind(this.onTitleChanged, this));
    },
    render: function(options) {
      debugger;      return this.$el.text(this.model.getText());
    },
    onTitleChanged: function(rtEvent) {
      return this.$el.text(this.model.getText());
    }
  });
});
