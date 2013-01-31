;(function() {

    (function ($) {
        brite.registerView("LineChart",  {
        	loadTmpl : true,
			emptyParent : true,
			parent:".MainScreen-main"
		}, {
        	create:function (data, config) {
                var $html = app.render("tmpl-LineChart");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                
                var data = generateData();
			
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
		
				var svg = d3.select(".LineChart").append("svg")
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
			}
        });
        
        // --------- Helper Functions ---------- //
		function generateData() {
			var data = [];
			var i = 20;
	
			while (i--) {
				var date = new Date();
				date.setDate(date.getDate() - i);
				date.setHours(0, 0, 0, 0);
				var obj = {'value' : Math.round(Math.random()*1200), 'date' : date};
				data.push(obj);
			}
			return data;
		}
		// --------- /Helper Functions ---------- //
        
    })(jQuery);
})();
