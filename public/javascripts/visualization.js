// Generated by CoffeeScript 1.4.0

define("visualization", function() {
  return $(document).ready(function() {
    var $dataSource, $visualization, $yAxis, generateGraph, pullDataFromGoogleSpreadsheet;
    pullDataFromGoogleSpreadsheet = function(url) {
      return Tabletop.init({
        key: url,
        callback: generateGraph,
        simpleSheet: true
      });
    };
    generateGraph = function(dataset, tabletop) {
      var graph, hoverDetail, keys, labels, slider, xAxis, yAxis;
      keys = _.keys(dataset[0]);
      labels = {
        x: keys[0].charAt(0).toUpperCase() + keys[0].slice(1),
        y: keys[1].charAt(0).toUpperCase() + keys[1].slice(1)
      };
      dataset = _.map(dataset, function(data, key) {
        return {
          x: parseInt(data[keys[0]], 10),
          y: parseFloat(data[keys[1]], 10)
        };
      });
      graph = new Rickshaw.Graph({
        element: document.querySelector("#visualization"),
        width: 940,
        height: 250,
        series: [
          {
            color: "#00ADEF",
            stroke: "rgba(0,0,0,0.15)",
            name: labels.y,
            data: dataset
          }
        ]
      });
      graph.render();
      hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph,
        xFormatter: function(x) {
          return labels.x + ": " + x;
        },
        yFormatter: function(y) {
          return y;
        }
      });
      yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        orientation: "left",
        element: document.getElementById("y-axis")
      });
      xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph
      });
      yAxis.render();
      xAxis.render();
      return slider = new Rickshaw.Graph.RangeSlider({
        graph: graph,
        element: document.querySelector("#slider")
      });
    };
    $dataSource = $("#google-spreadsheet");
    $visualization = $("#visualization");
    $yAxis = void 0;
    pullDataFromGoogleSpreadsheet($dataSource.val());
    $("button#regenerate").on("click", function() {
      $yAxis = $yAxis || $("#y-axis");
      $yAxis.html("");
      $visualization.html("");
      return pullDataFromGoogleSpreadsheet($dataSource.val());
    });
    return {
      load: function() {
        return console.log("Hello!");
      }
    };
  });
});
