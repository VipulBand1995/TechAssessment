import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {CricketService} from '../cricket.service';
import { MatDialog } from '@angular/material/dialog';
import { TblStudentDetails } from '../../Models/StudentDetails.model';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cricket',
  templateUrl: './cricket.component.html',
  styles: [
  ]
})
export class CricketComponent implements OnInit {
  @ViewChild('alertDialog') alertDialog: TemplateRef<any>;
  @ViewChild('alertDialog1') alertDialog1: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  imageName: any;
  dateOfBirth: Date;
  studentName: any;
  fatherName: any;
  gender: any;
  course: any;
  address: any;
  email: any;
  contact: any;
  studentDetails: any[] = [];
  TblStudentDetails = new TblStudentDetails();
  imageFile: File = null;
  imagebase64textString = '';

  StudentHeaderList = [
    { DisplayName: 'Students Name', BindingValue: 'studentName'},
    { DisplayName: 'Fathers Name', BindingValue: 'fatherName' },
    { DisplayName: 'DOB', BindingValue: 'dob' },
    { DisplayName: 'Gender', BindingValue: 'gender' },
    { DisplayName: 'Course', BindingValue: 'course' },
    { DisplayName: 'Mobile Nummber', BindingValue: 'contact' },
    { DisplayName: 'Submitted On', BindingValue: 'createdDtTm' }
  ];

  constructor(private cricketService: CricketService,private dialog: MatDialog,private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.GetStudenDetails(); 
  }


  imageUpload(image) {
    this.imageFile = image.target.files;
    const files = this.imageFile[0];
    const reader: FileReader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(files);
  }
  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.imagebase64textString = btoa(binaryString);
    this.imageName = this.generateImage(this.imagebase64textString);
  }
  generateImage(childImageName) {
    const childImage = 'data:image/jpg;base64,' + childImageName;
    return this.sanitizer.bypassSecurityTrustResourceUrl(childImage);
  }

  saveDetails() {
    if(this.TblStudentDetails.studentName == undefined || this.TblStudentDetails.fatherName == undefined || this.TblStudentDetails.dob == undefined || this.TblStudentDetails.gender == undefined || this.TblStudentDetails.course == undefined || this.TblStudentDetails.contact == undefined || this.TblStudentDetails.address == undefined || this.TblStudentDetails.email == undefined) {
      this.dialog.open(this.alertDialog);
    } else {
      if (this.imagebase64textString !== '') {
        this.TblStudentDetails.imageName = this.imagebase64textString;
      }
      this.TblStudentDetails.dob = new Date(this.TblStudentDetails.dob + 'UTC');
      this.cricketService.AddStudenDetails(this.TblStudentDetails).subscribe((result: TblStudentDetails) => {
        this.dialog.open(this.alertDialog1);
        this.GetStudenDetails();
      });
    }
  }

  GetStudenDetails() {
    this.cricketService.GetStudenDetails().subscribe((result: TblStudentDetails[]) => {
      this.studentDetails = result;
      this.studentDetails.forEach((student: any) => {
        student.gender = (student.gender == true) ? 'Male' : 'Female';
        student.dob = this.DateFormat(new Date(student.dob));
        student.createdDtTm = this.DateFormat(new Date(student.createdDtTm));
      });
    });
  }

  DateFormat(reqDate: Date) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(reqDate, 'dd-MM-yyyy');
  }

  DeleteStudent(data) {
    var objTblStudentDetails: TblStudentDetails = data;
    console.log('hey',objTblStudentDetails.studentID)
    this.cricketService.DeleteStudent(objTblStudentDetails.studentID).subscribe((result: TblStudentDetails) => {
      this.GetStudenDetails();
      this.dialog.open(this.deleteDialog);
    });
  }

  GetselectedItem(data) {
    var objTblStudentDetails: TblStudentDetails = data;
    this.cricketService.GetStudent(objTblStudentDetails.studentID).subscribe((result: TblStudentDetails) => {
      const datePipe = new DatePipe('en-US');
      var dob = result.dob.toString();
      dob = dob.split('T')[0];
      console.log('hey',dob);
      this.TblStudentDetails.dob = new Date(dob);
      this.imageName = this.generateImage(result.imageName);
      this.TblStudentDetails = result;
    });
  }

  Reset() {
    this.TblStudentDetails = new TblStudentDetails();
  }
}
