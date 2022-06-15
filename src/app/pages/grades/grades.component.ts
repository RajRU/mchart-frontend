import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import Chart from 'chart.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  subjects = []
  scoreData: any;
  orignalScore: any;
  id: any;

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

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { 
    // console.log();
    this.id = this.activatedRoute.snapshot.params.id
  }

  ngOnInit() {
    this.apiService.getScore().subscribe((res: any) => {
      this.scoreData = res.data;
      this.orignalScore = res.data;
      // this.scoreOrignal = res.data;
      // this.getScoreData();
      this.subjects = this.scoreData.map(item => item.subject).filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.scoreData.filter(res => res.studentID === '3566797'));
      // && res.subject === 'Spelling'



      this.scoreData = this.scoreData.filter(res => res.studentID === this.id)

      this.getChartData();

      this.getChartsData();

    })
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

  getChartData() {

    let subjects = this.scoreData.map(item => item.subject).filter((value, index, self) => self.indexOf(value) === index);

    let color = {
      'Automatiseren (extra)': this.random_rgba(), 
      'Rekenen': this.random_rgba(), 
      'Spelling': this.random_rgba(), 
      'Taal': this.random_rgba(), 
      'Woordenschat (extra)': this.random_rgba(), 
      'Begrijpend Lezen': this.random_rgba(), 
      'Technisch Lezen': this.random_rgba(), 
      'Schrijven': this.random_rgba(), 
      'Studievaardigheden': this.random_rgba(), 
      'Matematica 2015/2016': this.random_rgba()
    }


    let chartClass = document.getElementById('chart-subjeccc');
    let label = this.scoreData.map(item => item.endDate).filter((value, index, self) => self.indexOf(value) === index);
    label.sort((a: any, b: any) => {
      return <any>new Date(a) - <any>new Date(b);
    })
    let datasets = []
    subjects.forEach(e => {
      let g = this.scoreData.filter(r => r.subject === e);
      // console.log(g);
      let dae = [null, null, null, null, null, null, null, null, null, null]
      g.forEach(element => {
        dae[label.indexOf(element.endDate)] = element.correctAdaptive
      });
      // label.indexOf()
      datasets.push({
        label: e,
        data: dae,
        borderColor: color[e],
      })
    });

    label = label.map(r => {
      let mydate = new Date(r);
      return (mydate.getMonth() + 1) + '/' + mydate.getFullYear();
    })

    let data = {
      labels: label,
      datasets: datasets,
    };

    new Chart(chartClass, {
			type: 'line',
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

  getChartsData() {

    let subjects = this.scoreData.map(item => item.subject).filter((value, index, self) => self.indexOf(value) === index);

    let color = {
      'Automatiseren (extra)': this.random_rgba(), 
      'Rekenen': this.random_rgba(), 
      'Spelling': this.random_rgba(), 
      'Taal': this.random_rgba(), 
      'Woordenschat (extra)': this.random_rgba(), 
      'Begrijpend Lezen': this.random_rgba(), 
      'Technisch Lezen': this.random_rgba(), 
      'Schrijven': this.random_rgba(), 
      'Studievaardigheden': this.random_rgba(), 
      'Matematica 2015/2016': this.random_rgba()
    }


    let chartClass = document.getElementById('chart-subjeccct');
    let label = this.scoreData.map(item => item.endDate).filter((value, index, self) => self.indexOf(value) === index);
    label.sort((a: any, b: any) => {
      return <any>new Date(a) - <any>new Date(b);
    })    
    
    let datasets = []
    subjects.forEach(e => {
      let g = this.scoreData.filter(r => r.subject === e);
      // console.log(g);
      let dae = [null, null, null, null, null, null, null, null, null, null]
      g.forEach(element => {
        dae[label.indexOf(element.endDate)] = element.correctAnswers
      });
      // label.indexOf()
      datasets.push({
        label: e,
        data: dae,
        borderColor: color[e],
      })
    });    
    label = label.map(r => {
      let mydate = new Date(r);
      return (mydate.getMonth() + 1) + '/' + mydate.getFullYear();
    })

    let data = {
      labels: label,
      datasets: datasets,
    };

    new Chart(chartClass, {
			type: 'line',
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

  // 3566797

  modelChangeFn(e) {    
    if (e.length) {
      this.scoreData = this.orignalScore.filter(re => re.subject === e);
    } else {
      this.scoreData = this.orignalScore;      
    }
    this.getChartsData();
    this.getChartData();
  }

}
