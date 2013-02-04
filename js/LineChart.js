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
                
                var viewName = "summary";
				view.viewName = viewName;
				view.reportType = "BATCH";
                
                view.showView(viewName);
			},
			
			getAllData: function(viewBy){
				var view = this;
				var dfd = $.Deferred();
				app.getSummary(view.reportType,"common",viewBy).done(function(data){
					var dataSet = {};
					if(data.items!=null){
						dataSet = data.items[0];
					}
					dfd.resolve(dataSet);
				});
				return dfd.promise();
			},
			
			showView: function(){
				var view = this;
				var $e = view.$el;
				
				//clean first
				$e.bEmpty();
				var html;
				if(view.viewName == 'summary'){
					html = app.render("tmpl-LineChart-Summary")
				}else{
					return false;
				}
		
				$e.append($(html));
				
				//chrome does not support read data from file
				//view.getAllData("day").done(function(dataAll){
					//showSummaryView.call(view,dataAll);
				//});
				
				var openObj = {
					data: [],
					color: "#6cc927"
				};
				openObj.data = generateData();
				showSummaryView.call(view,openObj);
				
				return true;
			}
        });
        
        function showSummaryView(dataAll){
        	var data = dataAll.data
        	var view = this;
			var $e = view.$el;
        	var $container = $e.find(".LineChartSummary");
        	if(typeof dataAll == "undefined"){
				$container.html("");
				$container.append("<div class='noData'>No Data!</div>");
			}else{
				//clear container
				$container.empty();
				$container.append("<div class='fstCon'></div>");
			
	        	//init series
				var openObj = {
					data: [],
					color: "#6cc927"
				};
				
				for (var i = 0; i < data.length; i++) {
					openObj.data.push({'date':new Date(data[i].date),'value':data[i].opens});
				}
			
				app.DrawD3Chart("line","fstCon",openObj,{});
			}
		}

	// --------- Helper Functions ---------- //
	function generateData() {
		var data = [];
		var i = 20;

		while (i--) {
			var date = new Date();
			date.setDate(date.getDate() - i);
			date.setHours(0, 0, 0, 0);
			var obj = {'opens' : Math.round(Math.random()*1200), 'date' : date};
			data.push(obj);
		}
		return data;
	}
	// --------- /Helper Functions ---------- //
        
    })(jQuery);
})();
