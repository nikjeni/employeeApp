import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  id;
  constructor(private routse: ActivatedRoute, private fb: FormBuilder, private router: Router, private service: DataServiceService) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]/gi)]],
      city: [''],
      address1: [''],
      address2: [''],
      postalcode: ['']
    })
  }

  ngOnInit(): void {
    this.id = this.routse.snapshot.paramMap.get('id');
    let obj = this.service.dummyData.data.find((val, ind) => val.id == +this.id);
    this.employeeForm.get('name').setValue(obj.name);
    this.employeeForm.get('phone').setValue(obj.phone);
    this.employeeForm.get('city').setValue(obj.address.city);
    this.employeeForm.get('address1').setValue(obj.address.address_line1);
    this.employeeForm.get('address2').setValue(obj.address.address_line2);
    this.employeeForm.get('postalcode').setValue(obj.address.postal_code);
  }

  update() {
    let obj = {
      id: this.id, name: this.employeeForm.get('name').value, phone: this.employeeForm.get('phone').value, 'address': {
        'city': this.employeeForm.get('city').value, 'address_line1': this.employeeForm.get('address1').value,
        'address_line2': this.employeeForm.get('address2').value, postal_code: this.employeeForm.get('postalcode').value
      }
    };
    let index = this.service.dummyData.data.findIndex(x => x.id === this.id);
    this.service.dummyData.data.splice(index, 1, obj);
    this.router.navigateByUrl('/employees');
  }

}
