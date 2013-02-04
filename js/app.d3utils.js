var app = app || {};


(function($) {
	
	app.DrawD3Chart = function(type,templateName,data,config){
		data = data.data || {};
		var template = "." + templateName;
		if(type == "line"){
			var margin = {top: 10, right: 10, bottom: 20, left: 50},
				width = 900,
				height = 450;
			
			var max = d3.max(data, function(d) { return d.value });
			var min = 0;
							
			var x = d3.time.scale().range([0, width - margin.left * 2]).domain([data[0].date, data[data.length - 1].date]);
			var y = d3.scale.linear().range([height - margin.left * 2, 0]).domain([min, max]);
				
			var xAxis = d3.svg.axis().scale(x).tickSize(-370).tickPadding(10);
			var yAxis = d3.svg.axis().scale(y).orient('left').tickSize(-820).tickPadding(10)
				
			var line = d3.svg.line()
				.x(function(d,i) { return x(data[i].date); })
				.y(function(d,i) { return y(data[i].value); });
				
			var svg = d3.select(template).append("svg")
					.datum(data)
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr('class', 'viz')
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
						
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height-80) + ")")
					.call(xAxis);
			
				svg.append("g")
					.attr("class", "y axis")
					.call(yAxis);
			
				svg.append("path")
					.attr("class", "line")
					.attr("d", line);
						
				for(var i=0 ;i<data.length;i++){
					svg.append("circle")
						.attr("class", "dot")
						.attr("cx", (line.x())(data,i))
						.attr("cy", (line.y())(data,i))
						.attr("r", 3.5);
				}
		}else if(type == "pie"){
			var width = 960,
		    	height = 500,
		    	radius = Math.min(width, height) / 2;
		    	
		    var color = d3.scale.category20();
		    
		    var arc = d3.svg.arc()
			    .outerRadius(radius - 10)
			    .innerRadius(0);
			
			var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) { return d.value; });
			
			var svg = d3.select(template)
				.append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  	.append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		    
			var arcs = svg.selectAll(".arc")
			    .data(pie(data))
			    .enter().append("g")
			    .attr("class", "arc");
		
			arcs.append("path")
			    .attr("d", arc)
			    .style("fill", function(d,i) { return color(i); });
			
			arcs.append("text")
			    .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
			    .attr("dy", ".35em")
			    .attr("text-anchor", "middle")
			    .text(function(d, i) { return d.data.name + ":" + d.data.value; });	

		}
		
	}

})(jQuery);
