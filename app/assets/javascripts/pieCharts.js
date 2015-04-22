var displayLanguages = function(infoHash, selector){
  var dataset = [];

  for (language in infoHash) {
    if (infoHash.hasOwnProperty(language)) {
      dataset.push({"label":language, "value":parseInt(infoHash[language])});
    }
  }

  createPieChart(dataset, selector);
}

var createPieChart = function(dataset, selector){
  var width = 400;
  var height = 400;
  var radius = height/2;
  var color = d3.scale.category20b();

  var vis = d3.select(selector)
    .append("svg:svg")
    .data([dataset])
    .attr("width", width)       
    .attr("height", height)
    .append("svg:g")
    .attr("transform", "translate(" + radius + "," + radius + ")")

  var arc = d3.svg.arc()
      .outerRadius(radius);

  var pie = d3.layout.pie()
      .value(function(d) { return d.value; });

  var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("svg:g")
    .attr("class", "slice");

  arcs.append("svg:path")
    .attr("fill", function(d, i) { return color(i); } )
    .attr("d", arc);

  arcs.append("svg:text").attr("transform", function(d){
    d.innerRadius = 0;
    d.outerRadius = radius;
    return "translate(" + arc.centroid(d) + ")";})
      .attr("text-anchor", "middle").text( 
        function(d, i) {
          if(dataset[i].value > 0){
            return dataset[i].label;
          }
        }
      ); 
}
