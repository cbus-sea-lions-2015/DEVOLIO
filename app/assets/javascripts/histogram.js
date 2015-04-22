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
    for(i = dateArray.length - 1; i >= 0; --i) {
      if(!result[dateArray[i]]) {
        result[dateArray[i]] = 0;
      }
      ++result[dateArray[i]];
    }

  for (property in result){
    dataset.push({'x':Date.parse(property.toString()), 'y':result[property]});
  }
  displayHistogram(dataset);
}

var displayHistogram = function(lineData){
  var parentWidth = $("#js-histogram").width();
  var vis = d3.select("#js-histogram")
    .append("svg:svg")
    .attr("width", parentWidth)
    .attr("height", parentWidth/4)
    .append("svg:g"),
    WIDTH = parentWidth,
    HEIGHT = parentWidth/4,
    MARGINS = {
      top:0,
      right:0,
      bottom:0,
      left:0
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
    .tickSize(2)
    .tickSubdivide(true)
    .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); }),

  yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(2)
    .orient("left")
    .tickSubdivide(true);

  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .attr("fill","#727272")
    .call(xAxis);

  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .attr("fill","#727272")
    .call(yAxis);

  var lineFunc = d3.svg.line()
  .x(function (d) {
    return xRange(d.x);
  })
  .y(function (d) {
    return yRange(d.y);
  })
  .interpolate('linear');

  vis.append("svg:path")
    .attr("d", lineFunc(lineData))
    .attr("stroke", "#FF5722")
    .attr("stroke-width", 1)
    .attr("fill", "none");
}



