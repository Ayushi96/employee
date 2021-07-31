import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeApiServiceService } from './Services/employee-api-service.service';
import { Employee } from './model/employee.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  empId = new FormControl('');
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl({value: '', disabled: true}),
    hireDate: new FormControl({value: '', disabled: true}),
    department: new FormControl(''),
    designation: new FormControl(''),
    salary: new FormControl(''),
    manager: new FormControl(''),
    gender: new FormControl(''),
  });
  constructor(private readonly apiService: EmployeeApiServiceService) {}

  handleSearch() {
    const eid = this.empId.value;
    if (isNaN(eid) || eid < 1 || eid == '') {
      alert('Invalid Employee Id. Try agian!');
      return;
    }
    console.log('searching for employee ', typeof eid);
    this.apiService.getEmployeeData(eid).subscribe((empData: Employee) => {
      console.log('data from the fetchEmployee api is => ', empData);
      this.employeeForm.patchValue(empData);
    });
  }

  handleEdit() {
    const eid = this.empId.value;
    if (isNaN(eid) || eid < 1 || eid == '') {
      alert('Invalid Employee Id. Try agian!');
      return;
    }
    this.apiService.editEmployeeData(eid, this.employeeForm.value).subscribe(message => alert(message));
  }
}
