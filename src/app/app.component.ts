import { Component } from '@angular/core';
import { timeout } from '../../node_modules/@types/q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = '';
  phone= '';
  bb= '0';
  nrSelect= '0';
  barbers : any[]=[];
  customers : any[]=[];
  list : any[]=[];
  id : number=0;
  Service: string='queue';
  averageTime=15;
  liveDate:string='';

  constructor() {
    this.startTime();
  }

  startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.liveDate = (h<12? 13 : h-12) + ":" + m + ":" + s + " " + (h<12?"AM" :"PM");
    setTimeout(()=>{    //<<<---    using ()=> syntax
      this.startTime();
 }, 500);
    
  }
  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  ngOnInit () {
    this.GetBarbers();
  }

  changed(ev)
  {
   this.bb= ev;
  }

  choosed(ev)
  {
    this.list=[];
   if(ev=='0') 
    this.list= this.customers
    else{
    for(var index=0;index<this.customers.length; index++){
    if(this.customers[index].barberId==ev)
      this.list.push(this.customers[index])
    }
  }
  }

  onSelect(lst){
  this.id= lst.id;
  this.name= lst.customername;
  this.phone= lst.phone;
  this.nrSelect= lst.barberId;
  }

   Clear(){
  this.id= 0;
  this.name= '';
  this.phone= '';
  this.nrSelect= '0';
  this.bb=  '0';
    this.Service='queue';
  }

onsubmit(){
  if((this.Service=='waiting' || this.Service=='chair') && this.nrSelect=='0'){
   alert('Please select barber');
   }
   else{
  if(this.id!=0){
    for(var index=0;index<this.customers.length; index++){
    if(this.customers[index].id==this.id){
      this.customers[index].customername=this.name;
      this.customers[index].phone=this.phone;
      this.customers[index].barberId=this.nrSelect;
      this.customers[index].bname=this.GetBarberName(this.bb);
      this.customers[index].service=this.Service;
    }
    }
  }
  else{
  this.customers.push({
    "id":this.customers.length + 1,
    "customername":this.name,
    "phone":this.phone,
    "barberId" :this.bb,
    "bname":this.GetBarberName(this.bb),
    "service" :this.Service,
    "arrival":new Date()
  });
  }
  this.list=this.customers;
  this.id= 0;
  this.Clear();
   }
}

GetBarberName(id)
{
  var name="";
  for(var index=0;index<this.barbers.length && name==""; index++){
  if(this.barbers[index].id==id)
    name=this.barbers[index].name;
  }
  return name;
}

GetCustomer(id)
{
  let c=null;
  for(var index=0;index<this.customers.length && name==null; index++){
  if(this.customers[index].id==id)
    c=this.customers[index];
  }
  return c;
}

  GetBarbers()
  {
     this.barbers =[ {
    "id":0,
    "name":"unspecified",
    "isfree":true,
    "isworking": true
  },{
    "id":1,
    "name":"barber1",
    "isfree":true,
    "isworking": true
  },
  {
    "id":2,
    "name":"barber2",
    "isfree":true,
    "isworking": true
  },
  {
    "id":3,
    "name":"barber3",
    "isfree":true,
    "isworking": true
  }];
  }
}
