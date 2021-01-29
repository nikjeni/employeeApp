import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {


  ngOnInit(): void {
  }

  title = 'employeeApp';
  employeeData: any = [];
  searchInput = new FormControl('');

  constructor(private service: DataServiceService, private router: Router) {
    this.employeeData = service.dummyData.data;
    this.searchInput.valueChanges.subscribe((values) => {
      if (values) {
        this.employeeData = service.dummyData.data.filter((val, ind, arr) => {
          return val.address.city.toLowerCase().search(values) == 0 || val.name.toLowerCase().search(values) == 0;
        });
      } else {
        this.employeeData = service.dummyData.data;
      }
    })
  }

  addEmployee() {
    this.router.navigateByUrl('/employees/add');
  }
  editEmployee(data) {
    this.router.navigate(['/employees/edit', data.id]);
  }

}
