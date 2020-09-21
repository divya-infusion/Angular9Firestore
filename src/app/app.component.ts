import { Component, OnInit } from '@angular/core';
import { app } from 'firebase';
import { CrudService } from '../app/services/crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Firestore CRUD Operations Students App';

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  constructor(private crudService: CrudService) { }

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {

      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          // tslint:disable-next-line: no-string-literal
          isEdit: false,
          // tslint:disable-next-line: no-string-literal
          Name: e.payload.doc.data()['Name'],
          // tslint:disable-next-line: no-string-literal
          Age: e.payload.doc.data()['Age'],
          // tslint:disable-next-line: no-string-literal
          Address: e.payload.doc.data()['Address'],
        };
        // tslint:disable-next-line: semicolon
      })
      console.log(this.students);

    });
  }

  // tslint:disable-next-line: typedef
  CreateRecord() {
    // tslint:disable-next-line: prefer-const
    let record = {};
    // tslint:disable-next-line: no-string-literal
    record['Name'] = this.studentName;
    // tslint:disable-next-line: no-string-literal
    record['Age'] = this.studentAge;
    // tslint:disable-next-line: no-string-literal
    record['Address'] = this.studentAddress;
    this.crudService.create_NewStudent(record).then(resp => {
      // tslint:disable-next-line: quotemark
      this.studentName = "";
      this.studentAge = undefined;
      // tslint:disable-next-line: quotemark
      this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  // tslint:disable-next-line: typedef
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }

  // tslint:disable-next-line: typedef
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  // tslint:disable-next-line: typedef
  UpdateRecord(recordRow) {
    // tslint:disable-next-line: prefer-const
    let record = {};
    // tslint:disable-next-line: no-string-literal
    record['Name'] = recordRow.EditName;
    // tslint:disable-next-line: no-string-literal
    record['Age'] = recordRow.EditAge;
    // tslint:disable-next-line: no-string-literal
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
