/*Dashboard3 Init*/
 
"use strict"; 
$(document).ready(function() {
});

/*ApexCharts Start*/
window.Apex = {
  stroke: {
	width: 3
  },
  markers: {
	size: 0
  },
  tooltip: {
	fixed: {
	  enabled: true,
	}
  }
};
    
var randomizeArray = function (arg) {
  var array = arg.slice();
  var currentIndex = array.length,
	temporaryValue, randomIndex;

  while (0 !== currentIndex) {

	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
  }

  return array;
}

// data for the sparklines that appear below header area
var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
var spark1 = {
	chart: {
	type: 'area',
	height: 100,
	sparkline: {
	  enabled: true
	},
},
	colors: ['#00acf0'],
	stroke: {
		curve: 'straight',
		colors: ['#00acf0'],
	},
	fill: {
		opacity: 0.5,
		colors: ['#00acf0'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}
var spark2 = {
	chart: {
		type: 'area',
		height: 100,
		sparkline: {
		  enabled: true
		},
	},
	colors: ['#ffbf36'],
	stroke: {
		curve: 'straight',
		colors: ['#ffbf36'],
	},
	fill: {
		opacity: 0.5,
		colors: ['#ffbf36'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}
var spark3 = {
	chart: {
		type: 'area',
		height: 100,
		sparkline: {
		  enabled: true
		},
	},
	colors: ['#22af47'],
	stroke: {
		curve: 'straight',
		colors: ['#22af47'],
	},
	fill: {
		opacity: 0.5,
		colors: ['#22af47'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}
var spark4 = {
	chart: {
	type: 'area',
	height: 50,
	sparkline: {
	  enabled: true
	},
},
	colors: ['#00acf0'],
	stroke: {
		curve: 'straight',
		colors: ['#00acf0'],
	},
	fill: {
		opacity: 0.1,
		colors: ['#00acf0'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}
var spark5 = {
	chart: {
		type: 'area',
		height: 50,
		sparkline: {
		  enabled: true
		},
	},
	colors: ['#00acf0'],
	stroke: {
		curve: 'straight',
		colors: ['#00acf0'],
	},
	fill: {
		opacity: 0.1,
		colors: ['#00acf0'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}
var spark6 = {
	chart: {
		type: 'area',
		height: 50,
		sparkline: {
		  enabled: true
		},
	},
	colors: ['#00acf0'],
	stroke: {
		curve: 'straight',
		colors: ['#00acf0'],
	},
	fill: {
		opacity: 0.1,
		colors: ['#00acf0'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}
var spark7 = {
	chart: {
		type: 'area',
		height: 50,
		sparkline: {
		  enabled: true
		},
	},
	colors: ['#00acf0'],
	stroke: {
		curve: 'straight',
		colors: ['#00acf0'],
	},
	fill: {
		opacity: 0.1,
		colors: ['#00acf0'],
	},
	series: [{
		data: randomizeArray(sparklineData)
	}],
	xaxis: {
	crosshairs: {
	  width: 1
	},
	},
	yaxis: {
		min: 0
	}
}

var spark1 = new ApexCharts(document.querySelector("#sparkline_1"), spark1);
spark1.render();
var spark2 = new ApexCharts(document.querySelector("#sparkline_2"), spark2);
spark2.render();
var spark3 = new ApexCharts(document.querySelector("#sparkline_3"), spark3);
spark3.render();
var spark4 = new ApexCharts(document.querySelector("#sparkline_4"), spark4);
spark4.render();
var spark5 = new ApexCharts(document.querySelector("#sparkline_5"), spark5);
spark5.render();
var spark6 = new ApexCharts(document.querySelector("#sparkline_6"), spark6);
spark6.render();
var spark7 = new ApexCharts(document.querySelector("#sparkline_7"), spark7);
spark7.render();
var lastDate = 0;

var data = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
function getDayWiseTimeSeries(baseval, count, yrange) {
	var i = 0;
	while (i < count) {
		var x = baseval;
		var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

		data.push({
			x, y
		});
		lastDate = baseval
		baseval += TICKINTERVAL;
		i++;
	}
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
	min: 10,
	max: 90
})

function getNewSeries(baseval, yrange) {
	var newDate = baseval + TICKINTERVAL;
	lastDate = newDate

	for(var i = 0; i< data.length - 10; i++) {
		// IMPORTANT
		// we reset the x and y of the data which is out of drawing area
		// to prevent memory leaks
		data[i].x = newDate - XAXISRANGE - TICKINTERVAL
		data[i].y = 0
	}
	
	data.push({
		x: newDate,
		y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
	})
   
}

function resetData(){
	// Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
	data = data.slice(data.length - 10, data.length);
}

var options1 = {
	chart: {
		height:335,
		type: 'line',
		animations: {
			enabled: true,
			easing: 'linear',
			dynamicAnimation: {
				speed: 1000
			}
		},
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		}
	},
	colors: ['#ffbf36'],
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	series: [{
		data: data
	}],
	markers: {
		size: 0
	},
	xaxis: {
		type: 'datetime',
		range: XAXISRANGE,
	},
	yaxis: {
		max: 100
	},
	legend: {
		show: false
	},
}
var chart1 = new ApexCharts(
	document.querySelector("#e_chart_2"),
	options1
);
chart1.render();

window.setInterval(function () {
	getNewSeries(lastDate, {
		min: 10,
		max: 90
	})
	chart1.updateSeries([{
		data: data
	}])
}, 1000);
var options2 = {
		chart: {
			height: 380,
			type: 'radar',
			toolbar: {
				show: false
			},
		},
		colors: ['#00acf0'],
		series: [{
			name: 'Series 1',
			data: [80, 50, 30, 40, 100, 20],
		}],
		labels: ['January', 'February', 'March', 'April', 'May', 'June']
	}
var chart2 = new ApexCharts(
	document.querySelector("#e_chart_6"),
	options2
);
chart2.render();
   
var options3 = {
	chart: {
		height: 300,
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false
		},
		zoom: {
			enabled: true
		}
	},
	colors: ["#00acf0", '#ffbf36','#22af47'],
	responsive: [{
		breakpoint: 480,
		options: {
			legend: {
				show:false
			}
		}
	}],
	plotOptions: {
		bar: {
			horizontal: false,
		},
	},
	series: [{
		name: 'PRODUCT A',
		data: [44, 55, 41, 67, 22, 43]
	},{
		name: 'PRODUCT B',
		data: [13, 23, 20, 8, 13, 27]
	},{
		name: 'PRODUCT C',
		data: [11, 17, 15, 15, 21, 14]
	}],
	xaxis: {
		type: 'datetime',
		categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
	},
	legend: {
		show:false
	},
	fill: {
		opacity: 1
	},
}
var chart3 = new ApexCharts(
	document.querySelector("#e_chart_7"),
	options3
);
chart3.render();
/*ApexCharts End*/
    
	
/*****E-Charts function start*****/
var echartsConfig = function() { 
	if( $('#e_chart_1').length > 0 ){
		var eChart_1 = echarts.init(document.getElementById('e_chart_1'));
		var option = {
			tooltip: {
				show: true,
				backgroundColor: '#fff',
				borderRadius:6,
				padding:6,
				axisPointer:{
					lineStyle:{
						width:0,
					}
				},
				textStyle: {
					color: '#324148',
					fontFamily: '"Roboto", sans-serif',
					fontSize: 12
				}	
			},
			series: [
				{
					name:'',
					type:'pie',
					radius : '90%',
					color: ["#00acf0", '#ffbf36','#22af47'],
					data:[
						{value:435, name:''},
						{value:679, name:''},
						{value:848, name:''},
					],
					label: {
						normal: {
							formatter: '{b}\n{d}%'
						},
				  
					}
				}
			]
		};
		eChart_1.setOption(option);
		eChart_1.resize();
	}
}

/*****Resize function start*****/
var echartResize;
$(window).on("resize", function () {
	/*E-Chart Resize*/
	clearTimeout(echartResize);
	echartResize = setTimeout(echartsConfig, 200);
}).resize(); 
/*****Resize function end*****/

/*****Function Call start*****/
echartsConfig();
/*****Function Call end*****/