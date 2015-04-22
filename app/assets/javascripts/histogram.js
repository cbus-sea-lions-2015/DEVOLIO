var parseHistogram = function(infoHash) {
  var dataset = [];
  var dateArray = [];
  for (property in infoHash) {
    if (infoHash.hasOwnProperty(property)) {
      var d = new Date(d3.time.format("%Y-%m-%d").parse(infoHash[property].date.substring(0, 10)))
      dateArray.push(d);

    }
  }
    result = { };
    for(i = 0; i < dateArray.length; ++i) {
      if(!result[dateArray[i]]) {
        result[dateArray[i]] = 0;
      }
      ++result[dateArray[i]];
    }


  for (property in result){
    dataset.push({'x':Date.parse(property.toString()), 'y':result[property]});
  }
  debugger;
  displayHistogram(dataset);
}

var displayHistogram = function(lineData){
  var vis = d3.select("#js-histogram"),
  WIDTH = 1000,
  HEIGHT = 500,
  MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  },
  xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
      return d.x;
    }),
    d3.max(lineData, function (d) {
      return d.x;
    })
  ]),

  yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
      return d.y;
    }),
    d3.max(lineData, function (d) {
      return d.y;
    })
  ]),

  xAxis = d3.svg.axis()
    .scale(xRange)
    .tickSize(5)
    .tickSubdivide(true),

  yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient("left")
    .tickSubdivide(true);


  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  })
  .interpolate('basis');

  vis.append("svg:path")
    .attr("d", lineFunc(lineData))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none")

}


