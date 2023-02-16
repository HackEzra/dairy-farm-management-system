/*Dashboard3 Init*/
 
"use strict"; 
$(document).ready(function() {
	/*Toaster Alert*/
	$.toast({
		heading: 'Well done!',
		text: '<p>Welcome to Diary Farm Shop Management System.</p>',
		position: 'top-right',
		loaderBg:'#5e7d8a',
		class: 'jq-toast-primary',
		hideAfter: 3500, 
		stack: 6,
		showHideTransition: 'fade'
	});
	
	/*Owl Carousel*/
	$('#owl_demo_1').owlCarousel({
		items: 1,
		animateOut: 'fadeOut',
		loop: true,
		margin: 10,
		autoplay: true,
		mouseDrag: false,
		dots:false

	});
});

/*ApexCharts Start*/
var trigoStrength = 3;
var iteration = 11;

function getRandom() {
  var i = iteration;
  return (
    (Math.sin(i / trigoStrength) * (i / trigoStrength) +
      i / trigoStrength +
      1) *
    (trigoStrength * 2)
  );
}
function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      (Math.sin(i / trigoStrength) * (i / trigoStrength) +
        i / trigoStrength +
        1) *
      (trigoStrength * 2);

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}

var optionsArea = {
  chart: {
    height: 395,
    type: 'area',
    background: '#fff',
    stacked: true,
    offsetY: 10,
    zoom: {
       enabled: false
    },
	toolbar: {
	   show: false
	}
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: false
      }
    }
  },
  stroke: {
    curve: 'straight'
  },
  colors: ["#00acf0", '#ffbf36'],
  series: [{
      name: "Adwords Views",
      data: [15, 26, 20, 33, 27, 43, 17, 26, 19]
    },
    {
      name: "Adwords Clicks",
      data: [33, 21, 42, 19, 32, 25, 36, 29, 49]
    }
  ],
  fill: {
    type: 'gradient',
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.9,
      opacityTo: 0.4,
      stops: [0, 100, 100, 100]
    }
  },
  markers: {
    size: 0,
    style: 'hollow',
    strokeWidth: 8,
    strokeColor: "#fff",
    strokeOpacity: 0.25,
  },
  labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002', '01/21/2002', '01/22/2002', '01/23/2002'],
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false
    }
  },
  legend: {
    offsetY: 0,
    position: 'top',
    horizontalAlign: 'right'
  }
}
var chartArea = new ApexCharts(document.querySelector('#area_adwords'), optionsArea);
chartArea.render();

var optionsColumn = {
    chart: {
    height: 350,
    type: "bar",
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000
      }
    },
    events: {
      animationEnd: function(chartCtx) {
        const newData = chartCtx.w.config.series[0].data.slice();
        newData.shift();
        window.setTimeout(function() {
          chartCtx.updateOptions(
            {
              series: [
                {
                  name: "Load Average",
                  data: newData
                }
              ],
              xaxis: {
                min: chartCtx.minX,
                max: chartCtx.maxX
              },
              subtitle: {
                text:
                  parseInt(getRangeRandom({ min: 1, max: 20 })).toString() + "%"
              }
            },
            false,
            false
          );
        }, 300);
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 0
  },
  colors: ['#00acf0'],
  series: [
    {
      name: "Load Average",
      data: generateMinuteWiseTimeSeries(
        new Date("12/12/2016 00:20:00").getTime(),
        12,
        {
          min: 10,
          max: 110
        }
      )
    }
  ],
  title: {
    text: "Load Average",
    align: "left",
    style: {
      fontSize: "12px"
    }
  },
  subtitle: {
    text: "20%",
    floating: true,
    align: "right",
    offsetY: 0,
    style: {
      fontSize: "22px"
    }
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.6,
      stops: [0, 100]
    }
  },
  xaxis: {
    type: "datetime",
    range: 2700000
  },
  legend: {
    show: true
  }
};
var chartColumn = new ApexCharts(
  document.querySelector("#columnchart"),
  optionsColumn
);
chartColumn.render();
window.setInterval(function() {
  iteration++;
chartColumn.updateSeries([
    {
      name: "Load Average",
      data: [
        ...chartColumn.w.config.series[0].data,
        [chartColumn.w.globals.maxX + 210000, getRandom()]
      ]
    }
  ]);
}, 2500);
var ts2 = 1484418600000;
var dates = [];
var spikes = [5, -5, 3, -3, 8, -8]
for (var i = 0; i < 120; i++) {
  ts2 = ts2 + 86400000;
  var innerArr = [ts2, dataSeries[1][i].value];
  dates.push(innerArr)
}

var options2 = {
  chart: {
	type: 'area',
	stacked: false,
	height: 330,
	zoom: {
	  type: 'x',
	  enabled: true
	},
	toolbar: {
		show: false
	}
  },
  colors: ['#5e7d8a'],
  dataLabels: {
	enabled: false
  },
  series: [{
	name: 'XYZ MOTORS',
	data: dates,
  }],
  markers: {
	size: 0,
  },
  fill: {
	type: 'gradient',
	colors: ['#5e7d8a'],
	gradient: {
	  shadeIntensity: 1,
	  inverseColors: false,
	  opacityFrom: 0.5,
	  opacityTo: 0,
	  stops: [0, 90, 100]
	},
  },
  yaxis: {
	min: 20000000,
	max: 250000000,
	labels: {
	  formatter: function (val) {
		return (val / 1000000).toFixed(0);
	  },
	},
	title: {
	  text: 'Price'
	},
  },
  xaxis: {
	type: 'datetime',
  },

  tooltip: {
	shared: false,
	y: {
	  formatter: function (val) {
		return (val / 1000000).toFixed(0)
	  }
	}
  },
  legend: {
	labels: {
	  useSeriesColors: true
	},
	markers: {
	  customHTML: [
		function() {
		  return ''
		}, function() {
		  return ''
		}, function() {
		  return ''
		}
	  ]
	}
  }
}
var chart2 = new ApexCharts(
  document.querySelector("#e_chart_2"),
  options2
);
chart2.render();

var options4 = {
  chart: {
	type: 'line',
	width: 100,
	height: 35,
	sparkline: {
	  enabled: true
	}
  },
  colors: ['#5e7d8a'],
  series: [{
	data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
  }],
  tooltip: {
	fixed: {
	  enabled: false
	},
	x: {
	  show: false
	},
	y: {
	  title: {
		formatter: function (seriesName) {
		  return ''
		}
	  }
	},
	marker: {
	  show: false
	}
  }
    }
var chart4 = new ApexCharts(
	document.querySelector("#sparkline_1"),
	options4
);
chart4.render();

var options5 = {
  chart: {
	type: 'line',
	width: 100,
	height: 35,
	sparkline: {
	  enabled: true
	}
  },
  colors: ['#5e7d8a'],
  series: [{
	data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
  }],
  tooltip: {
	fixed: {
	  enabled: false
	},
	x: {
	  show: false
	},
	y: {
	  title: {
		formatter: function (seriesName) {
		  return ''
		}
	  }
	},
	marker: {
	  show: false
	}
  }
    }
new ApexCharts(document.querySelector("#sparkline_2"), options5).render();

var options6 = {
  chart: {
	type: 'line',
	width: 100,
	height: 35,
	sparkline: {
	  enabled: true
	}
  },
  colors: ['#5e7d8a'],
  series: [{
	data: [22, 14, 2,27, 12, 15,7, 75, 20, 15, 12]
  }],
  tooltip: {
	fixed: {
	  enabled: false
	},
	x: {
	  show: false
	},
	y: {
	  title: {
		formatter: function (seriesName) {
		  return ''
		}
	  }
	},
	marker: {
	  show: false
	}
  }
    }
new ApexCharts(document.querySelector("#sparkline_3"), options6).render();

var options7 = {
  chart: {
	type: 'line',
	width: 100,
	height: 35,
	sparkline: {
	  enabled: true
	}
  },
  colors: ['#5e7d8a'],
  series: [{
	data: [10, 14, 2,47, 12, 15,17, 5, 10,25,2]
  }],
  tooltip: {
	fixed: {
	  enabled: false
	},
	x: {
	  show: false
	},
	y: {
	  title: {
		formatter: function (seriesName) {
		  return ''
		}
	  }
	},
	marker: {
	  show: false
	}
  }
    }
new ApexCharts(document.querySelector("#sparkline_4"), options7).render();
/*ApexCharts End*/