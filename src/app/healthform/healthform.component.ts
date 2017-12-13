import { Component, OnInit, animate } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
//import { relative } from 'path';

@Component({
  selector: 'app-healthform',
  templateUrl: './healthform.component.html',
  styleUrls: ['./healthform.component.css']
})
export class HealthformComponent implements OnInit {

  healthForm: FormGroup;
  coverage_amount: string = '';
  rqdMsg: string = 'This field is required';
  submitted: boolean = false;
  selectedCover: string = '';
  selectedCoverList: boolean = false;
  coverError: boolean = false;
  memberError: boolean = false;
  cityError: boolean = false;
  selectedMember: string = '';
  selectedCity: string = '';
  selectedMemberlist: boolean = false;
  selectedCitylist: boolean = false;
  childCount: any;
  is_spouse: string;
  items: any;
  healthCover: boolean = false;
  whomCover: boolean = false;
  cityList: boolean = false;
  childItems: any;
  showMemberSec: boolean = false;
  showpolicyholderSec: boolean = false;
  removeCoverChip: boolean = true;
  removePlanChip: boolean = true;
  coverChip: string = '';
  planChip: string = '';
  adultAges: any = Array(83);
  childAges: any = Array(25);

  cover_amount = [
    { amount: '1 Lakh', literal: '100000' },
    { amount: '2 Lakhs', literal: '200000' },
    { amount: '6 Lakhs', literal: '600000' },
    { amount: '7 Lakhs', literal: '700000' },
    { amount: '7.5 Lakhs', literal: '750000' },
    { amount: '10 Lakhs', literal: '1000000' },
    { amount: '15 Lakhs', literal: '1500000' },
    { amount: '20 Lakhs', literal: '2000000' },
    { amount: '25 Lakhs', literal: '2500000' },
    { amount: '30 Lakhs', literal: '3000000' },
    { amount: '50 Lakhs', literal: '5000000' },
    { amount: '60 Lakhs', literal: '6000000' },
    { amount: '1 Crore', literal: '10000000' },
    { amount: '1.5 Crores', literal: '15000000' }
  ];

  plan_type_name = [
    { type: "2A2C", name: "Self + Spouse + 2 Children" },
    { type: "2A3C", name: "Self + Spouse + 3 Children" },
    { type: "2A4C", name: "Self + Spouse + 4 Children" },
    { type: "1A1C", name: "Self + 1 Child" },
    { type: "1A2C", name: "Self + 2 Children" },
    { type: "1A3C", name: "Self + 3 Children" },
    { type: "1A4C", name: "Self + 4 Children" }
  ];


  member_details = {
    "1A": { "child": "0", "adult": "1", "spouce": "n", "total": "1" },
    "2A": { "child": "0", "adult": "2", "spouce": "y", "total": "2" },
    "2A1C": { "child": "1", "adult": "2", "spouce": "y", "total": "3" },
    "2A2C": { "child": "2", "spouce": "y", "total": "4" },
    "2A3C": { "child": "3", "spouce": "y", "total": "5" },
    "2A4C": { "child": "4", "spouce": "y", "total": "6" },
    "1A1C": { "child": "1", "spouce": "n", "total": "2" },
    "1A2C": { "child": "2", "spouce": "n", "total": "3" },
    "1A3C": { "child": "3", "spouce": "n", "total": "4" },
    "1A4C": { "child": "4", "spouce": "n", "total": "5" }
  };


  /* Cover Amount */
  coverAmount(event, amount, literal, item) {
    //set selected item to new variable
    this.selectedCover = item;

    //check wether item selected from list or button
    if (typeof this.selectedCover == 'object') {
      this.selectedCoverList = true;
    } else {
      this.selectedCoverList = false;
    }

    //add data in form data
    this.healthForm.patchValue({ coverage_amount: amount });
    this.healthForm.patchValue({ coverage_amount_literal: literal });
    this.coverError = false;
    if (this.cover_amount.findIndex(x => x.literal == literal) !== -1) {
      this.coverChip = this.healthForm.value['coverage_amount'];
    } else {
      this.coverChip = '';
    }
    console.log(this.healthForm.value);
  }
  /* /Cover Amount */

  /* Member Details */

  removeChip(type, name) {
    this.healthForm.value[type] = '';
    this.healthForm.value[name] = '';
    if (type == "coverage_amount") {
      this.coverChip = '';
      this.selectedCoverList = false;
    } else {
      this.planChip = '';
      this.selectedMemberlist = false;
    }
    console.log(this.healthForm.value);
  }
  /* Member Details */

  /* Member Details */
  memberDetails(event, type, name, item) {
    //console.log(event, type, name, item);

    //set selected item to new variable
    this.selectedMember = item;

    //check wether item selected from list or button
    if (typeof this.selectedMember == 'object') {
      this.selectedMemberlist = true;
    } else {
      this.selectedMemberlist = false;
    }

    //add data in form data
    this.healthForm.patchValue({ plan_type: type });
    this.healthForm.patchValue({ plan_type_name: name });

    if (this.plan_type_name.findIndex(x => x.type == type) !== -1) {
      this.planChip = this.healthForm.value['plan_type_name'];
    } else {
      this.planChip = '';
    }

    if (this.healthForm.value["plan_type"] != '') {
      this.showMemberSec = true;
      document.getElementById('healthform_cont').setAttribute("style", "position: relative; height: auto");
      document.getElementById('navbar').setAttribute("style", "position:relative;background-color: #fcbc23;");

      //$('html, body').animate({scrollTop:$(".sc_top").offset().top -20},100);
      //var elmnt = document.getElementById("bcd");
      //elmnt.scrollIntoView({behavior: "smooth", block: "end"});
      //   setTimeout(function(){ window.scrollTo(0, document.getElementById('abc').offsetTop+60);

      //   console.log(document.getElementById('abc').offsetTop);
      // }, 10);

    }
    this.memberError = false;

    this.updateMember();
    console.log(this.healthForm.value);
  }
  /* /Member Details */

  createItem(cntlr_name) {
    console.log(cntlr_name);
    var name = cntlr_name;
    if (cntlr_name == 'child_gender') {
      return this.fb.group({
        'child_gender': new FormControl('', [Validators.required]),
        'child_dob': new FormControl('', [Validators.required])
      });
    }
    if (cntlr_name == 'spouce_gender') {
      return this.fb.group({
        'spouce_gender': new FormControl('', [Validators.required]),
        'spouce_dob': new FormControl('', [Validators.required])
      });
    }
  }


  /* update member */
  updateMember() {
    this.is_spouse = this.member_details[this.healthForm.value["plan_type"]].spouce;
    this.childCount = parseInt(this.member_details[this.healthForm.value["plan_type"]].child, 10);

    var spouceItem = this.healthForm.get('spouces') as FormArray;
    console.log("spouceItem.length", spouceItem.length);
    if (this.is_spouse == 'y' && spouceItem.length == 0) {
      this.addMember('spouce_gender', 'spouces', 1);
    } else if (this.is_spouse == 'n') {
      this.removeMember('spouce_gender', 'spouces', 1);
    }

    var childItem = this.healthForm.get('childs') as FormArray;
    if (childItem.length != 0) {
      var childItemCount = childItem.length - this.childCount;
      console.log("childItemCount", childItemCount);
      if (childItemCount > 0) {
        console.log("removeMember");
        this.removeMember('child_gender', 'childs', childItemCount);
      } else {
        console.log("addMember");
        this.addMember('child_gender', 'childs', -childItemCount);
      }

    } else {
      this.addMember('child_gender', 'childs', this.childCount);
    }

  }
  /* /update member */

  /* Remove Member */
  removeMember(cntlr_name, name, count) {
    this.items = this.healthForm.get(name) as FormArray;
    console.log("hello", count);
    var itemLength = this.items.length;
    // var itemLength = -count;
    console.log("itemLength", itemLength);
    for (var i = 0; i < count; i++) {
      console.log("itemLength-i-1", itemLength - i - 1);
      this.items.removeAt(itemLength - i - 1);
    }

  }
  /* /Remove Member */

  /* Add Member */
  addMember(cntlr_name, name, count) {
    this.items = this.healthForm.get(name) as FormArray;
    console.log("hello", this.items.length);

    if (count > 0) {
      this.items = this.healthForm.get(name) as FormArray;
      for (var i = 0; i < count; i++) {
        //console.log("hello5");
        this.items.push(this.createItem(cntlr_name));
      }
      this.setSpouseGender();
    }


  }
  /* /Add Member */

  /* Set Spouse Gender */
  setSpouseGender() {
    console.log("data");
    if (this.healthForm.value["spouces"] != '') {
      const controlSpouces = <FormArray>this.healthForm.get('spouces');
      if (this.healthForm.value["cust_gender"] == 'male') {
        controlSpouces.controls[0].get('spouce_gender').setValue('female');
      }

      if (this.healthForm.value["cust_gender"] == 'female') {
        controlSpouces.controls[0].get('spouce_gender').setValue('male');
      }
    }
    console.log("data", this.healthForm);
  }


  /* City Details */
  cityDetails(event, id, name, item) {
    console.log(event, id, name, item);

    //set selected item to new variable
    this.selectedCity = item;

    //check wether item selected from list or button
    //this.selectedCitylist = true;

    //add data in form data
    this.healthForm.patchValue({ cust_city: id });
    this.healthForm.patchValue({ cust_state: name.split(",")[1] });
    this.healthForm.patchValue({ cust_city_name: name });

    if (this.healthForm.value["cust_city_name"] != '') {
      this.showpolicyholderSec = true;
    }
    console.log(this.healthForm.value);
  }
  /* /City Details */

  constructor(private fb: FormBuilder) {

    this.healthForm = fb.group({
      'cust_name': new FormControl('', [Validators.required]),
      'cust_mobile': new FormControl('', [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
      'cust_email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)])),
      'cust_gender': new FormControl('', [Validators.required]),
      'cust_dob': new FormControl('', [Validators.required]),
      'spouces': this.fb.array([]),
      'childs': this.fb.array([]),
      'coverage_amount': new FormControl(''),
      'coverage_amount_literal': new FormControl(''),
      'plan_type': new FormControl(''),
      'plan_type_name': new FormControl(''),
      "cust_state": new FormControl(''),
      "cust_city": new FormControl(''),
      "cust_city_name": new FormControl(''),
      "product_name": 'Health Insurance',
      "product_type": 'Mediclaim',
      "search_source": '',
      "cust_guid": '',
      "agree": 'agree',
    });

    //this.healthForm.patchValue({cust_dob: ' '});

  }


  updateHealthForm(data) {

    if (this.healthForm.valid) {

      this.submitted = false;
      this.coverError = false;
      this.memberError = false;
      this.cityError = false;



      console.log(this.healthForm.value, data);
      //console.log("post1",post);

    } else {

      console.log(data, data['childs'].length);


      this.submitted = true;
      if (data['coverage_amount'] == '') {
        this.coverError = true;
      } else {
        this.coverError = false;
      }

      if (data['plan_type'] == '') {
        this.memberError = true;
      } else {
        this.memberError = false;
      }

      if (data['cust_state'] == '') {
        this.cityError = true;
      } else {
        this.cityError = false;
      }

    }
  }

  ngOnInit() {

  }

  



}
