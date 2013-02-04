;(function() {

    (function ($) {
        brite.registerView("PieChart",  {
        	loadTmpl : true,
			emptyParent : true,
			parent:".MainScreen-main"
		}, {
        	create:function (data, config) {
                var $html = app.render("tmpl-PieChart");
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
			
			showView: function(){
				var view = this;
				var $e = view.$el;
				
				//clean first
				$e.bEmpty();
				var html;
				if(view.viewName == 'summary'){
					html = app.render("tmpl-PieChart-Summary")
				}else{
					return false;
				}
		
				$e.append($(html));
				
				var openObj = {
					data: [],
					color: "#6cc927"
				};
				
				var tdata = [];
					tdata.push({name:"Chrome",value:20});
					tdata.push({name:"Opera",value:15});
					tdata.push({name:"Safari",value:20});
					tdata.push({name:"Firefox",value:15});
					tdata.push({name:"IE",value:30});
				
				openObj.data = tdata;
				showSummaryView.call(view,openObj);
				
				return true;
			}
        });
        
        function showSummaryView(dataAll){
        	var data = dataAll.data
        	var view = this;
			var $e = view.$el;
        	var $container = $e.find(".PieChartSummary");
        	if(typeof dataAll == "undefined"){
				$container.html("");
				$container.append("<div class='noData'>No Data!</div>");
			}else{
				//clear container
				$container.empty();
				$container.append("<div class='fstCon'></div>");
			
				app.DrawD3Chart("pie","fstCon",dataAll,{});
			}
		}
        
    })(jQuery);
})();
