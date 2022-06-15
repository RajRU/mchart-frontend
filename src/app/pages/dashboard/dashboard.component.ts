import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ApiService } from 'src/app/shared/services/api.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  studentData: any;
  studentOrignal: any;
  classData: any;
  scoreData: any;
  scoreOrignal: any;
  classes: any;
  now: Date = new Date();
  config = {
    displayKey:"classID", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '40', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'classID' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  
  singleSelect: any = [];

  constructor(private apiService: ApiService) {
    setInterval(() => {
      this.now = new Date();
    }, 60000);
  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });

    this.apiService.getStudents().subscribe((res: any) => {
      this.studentData = res.data;
      this.studentOrignal = res.data;
      let classes = []
      this.studentData.forEach(res => {
        classes.push(...res.classIDs);
      });
      classes = classes.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
      console.log(classes);
      this.classData = classes.map(res => {
        return {'classID': res}
      });     
      // this.classes = classes; 
      this.getChartData(classes);
    });

    this.apiService.getScore().subscribe((res: any) => {
      console.log(res);
      this.scoreData = res.data;
      this.scoreOrignal = res.data;
      this.getScoreData();
    })

    // this.apiService.getClasses().subscribe((res: any) => {
    //   console.log(res);
    //   this.classData = res.data;
    // })

  }

  getScoreData() {

    
    let chartSubject = document.getElementById('chart-subject');
    // chartSubject.clear();
    let classes = this.scoreData.map(item => item.subject).filter((value, index, self) => self.indexOf(value) === index)
    let datas = []
    let score = []
    classes.forEach(element => {
      let g = this.scoreData.filter(res => res.subject === element);
      // g['correctAdaptive']
      datas[element] = 0
      let totalAnswers = 0
      g.forEach(elements => {
        // elements['correctAdaptive']
        datas[element] = datas[element] + elements['correctAdaptive'];
        totalAnswers = totalAnswers + elements['totalAnswers']
      });
      score.push((datas[element]/totalAnswers)*100)
    });
    // console.log(score);
    

    let data = {
      labels: classes,
      datasets: [
        {
          label: 'Dataset 1',
          data: score,
          backgroundColor: ['#556B2F', '#483D8B', '#FF00FF', '#CD5C5C', '#7FFF00', '#DDA0DD', '#FFA500', '#AFEEEE', '#FF69B4', '#FF69B4', '#00FFFF', '#00CED1', '#FAFAD2', '#2E8B57', '#FFA07A', '#F08080', '#FFE4B5', '#8B008B'],
        }
      ],
    };

    new Chart(chartSubject, {
			type: 'bar',
			// options: chartExample1.options,
			data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        }
      }
		});
  }

  getChartData(classes) {

    // window.chartClass.destroy();
    // let chartStatus = Chart.getChart("chart-class"); // <canvas> id
    // if (chartStatus != undefined) {
    //   // chartStatus.destroy();
    //         //(or)
    //   chartStatus.clear();
    // }
    let chartClass = document.getElementById('chart-class');

    let datas = [];
    // let classes = this.classData.map(res => res.classID);
    classes.forEach(element => {
      let f = this.studentData.filter(res => res.classIDs.includes(element))      
      datas.push(f.length)
    });    
    let data = {
      labels: classes,
      datasets: [
        {
          label: 'Dataset 1',
          data: datas,
          backgroundColor: ['#556B2F', '#483D8B', '#FF00FF', '#CD5C5C', '#7FFF00', '#DDA0DD', '#FFA500', '#AFEEEE', '#FF69B4', '#FF69B4', '#00FFFF', '#00CED1', '#FAFAD2', '#2E8B57', '#FFA07A', '#F08080', '#FFE4B5', '#8B008B'],
        }
      ],
    };

    new Chart(chartClass, {
			type: 'doughnut',
			// options: chartExample1.options,
			data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        }
      }
		});
  }

  modelChangeFn(e: any) {
    if (e['classID']) {
      this.studentData = this.studentOrignal.filter(rs => rs.classIDs.includes(e['classID']));
      this.getChartData([e['classID']]);
      this.scoreData = this.scoreData.filter(rs => rs.classID === e['classID']);
      this.getScoreData();
    } else {
      this.studentData = this.studentOrignal;
      let classes = []
      this.studentData.forEach(res => {
        classes.push(...res.classIDs);
      });
      classes = classes.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
      this.getChartData(classes);

      this.scoreData = this.scoreOrignal;
      this.getScoreData();

    }
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  getTotalClass(classID) {
    return this.studentOrignal.filter(res => res.classIDs.includes(classID))
  }

  getPerformace(classID) {
    let data = {
      '1996922': {value: 0.9, isUp: true}, 
      '3023549': {value: 9, isUp: false}, 
      '7615488': {value: 3, isUp: true},
      '5656781': {value: 6, isUp: false},
      '6167480': {value: 0.34, isUp: true},
      '6550606': {value: 0.89, isUp: false},
      '7361412': {value: 12, isUp: false},
      '7114101': {value: 45, isUp: true},
      '3084260': {value: 0.60, isUp: false},
      '1608795': {value: 0.45, isUp: true},
      '9321992': {value: 34, isUp: true},
      '6380193': {value: 10, isUp: false},
      '5445944': {value: 5, isUp: true},
      '7073133': {value: 8, isUp: false}, 
    }
    return data[classID]
  }
}
