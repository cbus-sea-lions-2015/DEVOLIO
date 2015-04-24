var displayLanguages = function(infoHash, selector){
  var dataset = [];
  for (language in infoHash) {
    if (infoHash.hasOwnProperty(language)) {
      if (language === "null") {
        dataset.push({"label":"other", "value":parseInt(infoHash[language])});
      }
      else {
        dataset.push({"label":language, "value":parseInt(infoHash[language])});
      }
    }
  }

  createPieChart(dataset, selector);
}

var displayGitHubActivity = function(infoHash, selector) {
  var dataset = [
    {"label":"Commits", "value":parseInt(infoHash.commits)},
    {"label":"Pushes", "value":parseInt(infoHash.pushEvents)},
    {"label":"Pulls", "value":parseInt(infoHash.pullEvents)}
  ];
  createPieChart(dataset, selector);
}

var createPieChart = function(dataset, selector){
  var width = $(selector).width();
  var height = width;
  var radius = width/2;
  var color = d3.scale.category20c();

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

  var g = vis.selectAll(".arc")
    .data(pie(dataset))
  .enter().append("g")
    .attr("class", "arc");

  g.append("path")
      .attr("fill", function(d, i) { return color(i); })
    .transition()
      .duration(2000)
      .attrTween("d", tweenPie)
      .each('end',  function(d){

           g.append("svg:text")
          .attr("fill","#333")
          .style("text-transform","uppercase")
          .style("font-size","0.8em")
          .style("font-family", "'Montserrat', sans-serif")
          .style("margin","10")
          .attr("transform", function(d){
          d.innerRadius = 10;
          d.outerRadius = radius;
          if (dataset.length == 1){
            return "translate(" + arc.centroid(d) + ")";
          }
          else {
            return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
          }
      })
            .attr("text-anchor", "middle").text(
              function(d, i) {
                if(dataset[i].value > 0){
                  return dataset[i].label;
                }
              }
            );

          
      });

  function tweenPie(b) {
    var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
    return function(t) { return arc(i(t)); };
  }

  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  }
}
