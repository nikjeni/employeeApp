import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm;
  constructor(private router: Router, private fb: FormBuilder, private service: DataServiceService) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]/gi)]],
      city: [''],
      address1: [''],
      address2: [''],
      postalcode: ['']
    })
    console.log('asda', this.employeeForm);
  }
  ngOnInit(): void {
  }

  submit() {
    let id = 0;
    console.log(this.employeeForm.value);
    let obj = {
      id: this.service.dummyData.data.length + 1, name: this.employeeForm.get('name').value, phone: this.employeeForm.get('phone').value, 'address': {
        'city': this.employeeForm.get('city').value, 'address_line1': this.employeeForm.get('address1').value,
        'address_line2': this.employeeForm.get('address2').value, postal_code: this.employeeForm.get('postalcode').value
      }
    };

    this.service.dummyData.data.push(obj);
    this.router.navigateByUrl('/employees');
  }

}
