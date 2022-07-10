import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  studentData: any;
  id: any;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { 
    this.id = this.activatedRoute.snapshot.params.id
  }

  ngOnInit() {
    this.apiService.getStudents().subscribe((res: any) => {
      this.studentData = res.data;
      this.studentData = this.studentData.filter(r => r.classIDs.includes(this.id));
    });
  }

  

}
