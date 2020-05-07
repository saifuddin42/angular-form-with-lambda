/* Project Members: Neel Naravnkar, Saifuddin Telia, Vishwajeet Paradkar
 * 
 * This file is the typescript component file for the form page.
 * ngOnInit is used for validation and onsubmit is used for sending data to aws dynamodb
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  SERVER_URL = "https://ffpktcedbf.execute-api.us-east-1.amazonaws.com/Prod/survey";
  uploadForm: FormGroup;
  
  customerFirstNameControl;
  customerLastNameControl;
  contactemailControl;
  addressstreetControl;
  addresscityControl;
  addressstateControl;
  addresszipControl;
  contactphoneControl;

  http: any;


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {

  }


  ngOnInit() {
    this.uploadForm = new FormGroup({
      customerFirstName: new FormControl(null, [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern("^[a-zA-Z]*$")]),
      customerLastName: new FormControl(null, [Validators.required, Validators.minLength(2),
      Validators.maxLength(30), Validators.pattern("^[a-zA-Z]*$")]),
      addressstreet: new FormControl(null, Validators.required),
      addresscity: new FormControl(null, Validators.required),
      addressstate: new FormControl(null, Validators.required),
      addresszip: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern("^[0-9]*$")]),
      contactphone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]),
      contactemail: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      Date: new FormControl(null),
      student: new FormControl(null),
      location: this.formBuilder.control(null),
      campus: this.formBuilder.control(null),
      dorm: this.formBuilder.control(null),
      sports: this.formBuilder.control(null),
      atmosphere: this.formBuilder.control(null),
      interest: this.formBuilder.control('Other'),
      referral: this.formBuilder.control('Likely')
    });

    this.customerFirstNameControl = this.uploadForm.get('customerFirstName');
    this.customerLastNameControl = this.uploadForm.get('customerLastName');
    this.contactemailControl = this.uploadForm.get('contactemail');
    this.addressstreetControl = this.uploadForm.get('addressstreet');
    this.addresscityControl = this.uploadForm.get('addresscity');
    this.addressstateControl = this.uploadForm.get('addressstate');
    this.addresszipControl = this.uploadForm.get('addresszip');
    this.contactphoneControl = this.uploadForm.get('contactphone');
    this.contactemailControl = this.uploadForm.get('contactemail');
  }

onSubmit() {
  const formData = new FormData();

  var abt_global = "";
  var abt_us = "";
  var Student = this.uploadForm.get('student').value;
  var Loc = this.uploadForm.get('location').value;
  var campus = this.uploadForm.get('campus').value;
  var dorm = this.uploadForm.get('dorm').value;
  var sports = this.uploadForm.get('sports').value;
  var atmos = this.uploadForm.get('atmosphere').value;

  if (Student == null) {
    Student = false;
  }

  if (Loc == null) {
    Loc = false;
  }

  if (campus == null) {
    campus = false;
  }

  if (dorm == null) {
    dorm = false;
  }

  if (sports == null) {
    sports = false;
  }

  if (atmos == null) {
    atmos = false;
  }

  var a = "";
  var b = "";
  var c = "";
  var d = "";
  var e = "";
  var f = "";
  var x = "";

  if (Student.toString().localeCompare('true') == 0) {
    Student = "Student";
    a = a.concat(Student, ",");
  }
  if (Loc.toString().localeCompare('true') == 0) {
    Loc = "Location";
    b = b.concat(Loc, ",");
  }
  if (campus.toString().localeCompare('true') == 0) {
    campus = "Campus";
    c = c.concat(campus, ",");
  }
  if (dorm.toString().localeCompare('true') == 0) {
    dorm = "Dorm";
    d = d.concat(dorm, ",");
  }
  if (sports.toString().localeCompare('true') == 0) {
    sports = "Sports";
    e = e.concat(sports, ",");
  }
  if (atmos.toString().localeCompare('true') == 0) {
    atmos = "Atmosphere";
    f = f.concat(atmos, ",");
  }

  abt_global = x.concat(a, b, c, d, e, f);


  /*var test = {  
    "first_name": this.uploadForm.get('customerFirstName').value,
    "last_name":this.uploadForm.get('customerLastName').value,
    "street_Addr": this.uploadForm.get('addressstreet').value,
    "city":this.uploadForm.get('addresscity').value,
    "state":this.uploadForm.get('addressstate').value,
    "ZIP":this.uploadForm.get('addresszip').value,
    "tel_NO":this.uploadForm.get('contactphone').value,
    "e_Mail":this.uploadForm.get('contactemail').value,
    "dat":this.uploadForm.get('Date').value,
    "abt_Campus":this.uploadForm.get('student').value,
    "uni_Ist":this.uploadForm.get('interest').value,
    "recommendation":this.uploadForm.get('referral').value
  }*/

  var test = {  
    "FirstName": this.uploadForm.get('customerFirstName').value,
    "LastName":this.uploadForm.get('customerLastName').value,
    "StreetAddr": this.uploadForm.get('addressstreet').value,
    "City":this.uploadForm.get('addresscity').value,
    "State":this.uploadForm.get('addressstate').value,
    "Zip":this.uploadForm.get('addresszip').value,
    "Tel_No":this.uploadForm.get('contactphone').value,
    "E_mail":this.uploadForm.get('contactemail').value,
    "Dat":this.uploadForm.get('Date').value,
    "Abt_Campus":abt_global,
    "Uni_List":this.uploadForm.get('interest').value,
    "Recommendation":this.uploadForm.get('referral').value,      
  }

  this.httpClient.post<any>(this.SERVER_URL,test).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
  
}
  url(url: any, postData: any) {
    throw new Error("Method not implemented.");
  }
}
