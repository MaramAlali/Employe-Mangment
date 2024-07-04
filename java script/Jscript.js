//تحريك العنوان
let i=1,text="welocme with Employe Mangment -version-1.0.0";

function pTransmation(){
    let p=document.querySelector('p').textContent=text.slice(0,i);
    i++;
    if(i>text.length)
    i=1;
}
setInterval(function(){pTransmation()},150);

//جلب المتغيرات 
let name      =document.getElementById('name');
let department=document.getElementById('department');
let sallary   =document.getElementById('sallary');
let insurance =document.getElementById('insurance');
let tax       =document.getElementById('tax');
let total     =document.getElementById('total');
let btnSave   =document.getElementById('btnSave');
let status    ='save';
let x;

//حساب الراتب واظهاره في مربع النص
function calcSallary(){
    if(sallary.value!=""){
        let result=sallary.value -insurance.value -tax.value;
        total.value=result;
    }
    else{
        total.value=0;
    }
}

//جلب البيانات من اللوكال ستوريج
if(localStorage.employes!=null){
    EmployesArray=JSON.parse(localStorage.employes);
}
else{
     EmployesArray=[];
}
//حفظ البيانات
btnSave.addEventListener('click',function(){
    //التصريح عن اوبجكت لمعلومات الموظف
    let MyEmploye={
        Name:name.value,
        Department:department.value,
        Total:total.value,
        Tax:tax.value,
        INsurance:insurance.value,
        Sallary:sallary.value,

    } 
    if(status ==='save'){
        //اضافة اوبجكت الموظف الى مصفوفة اوبجكتات الموظفين
        EmployesArray.push(MyEmploye);
    }
    else {
        EmployesArray[x]=MyEmploye;
        status='save';
        btnSave.innerHTML="حفظ البيانات";
    }

//التخزين في اللوكال ستوريج الخاصة بالمتصفح نعرف متحول من اجل التخزين 
//وكما نعلم مصفوفة الاوبجكتات تكون جيسون لذلك نحولها لسترينغ
localStorage.setItem('employes',JSON.stringify(EmployesArray));
//عرض البيانات في الجدول
ShowData();
//مسح البيانات من التكسات بعد حفظها

clearData();});

//عرض البيانات
function ShowData(){
    let tData ='';

    for(let i=0;i<EmployesArray.length;i++){
        tData +=`    
            <tr>  
                <td>${i+1}</td>
                <td>${EmployesArray[i].Name}</td>
                <td>${EmployesArray[i].Department}</td>
                <td>${EmployesArray[i].Total}</td>
                <td><button onclick="updateData(${i})"><i class="fa-solid fa-pencil"></i></button></td>
                <td><button onclick="deleteData(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
    }
       document.getElementById('tbody').innerHTML=tData;
       if(tData!='') {     
            thide=document.getElementById('tHide').style.visibility="visible";
       }
      else
            thide=document.getElementById('tHide').style.visibility="hidden";
        
       }   
ShowData();
//مسح البيانات 
function clearData(){
    name.value='';
    department.value='';
    total.value='';
    insurance.value='';
    total.value='';
    sallary.value='';
    tax.value='';
}
///حذف عنصر محدد من البيانات
function deleteData(i){

    EmployesArray.splice(i,1);
    //العنصر الي ضاغط علي وعدد العناصر الي بدي احذفهم
    localStorage.employes=JSON.stringify(EmployesArray);
    //اغادة تخزين المصفوفة مرة اخرى بعد حذف العنصر
    ShowData();
}

//حذف كل البيانات
function clearAll(){
    localStorage.clear();
    //حذف جميع البيانات في اللوكال ستوريج
    EmployesArray.splice(0);
    //حذف جميع العناصر من المصفوفة من دون تحديد دليل معين
    ShowData();
}
function updateData(i){
  name.value       =EmployesArray[i].Name;
  department.value =EmployesArray[i].Department;
  total.value      =EmployesArray[i].Total;
  insurance.value  =EmployesArray[i].INsurance;
  sallary.value    =EmployesArray[i].Sallary;
  tax.value        =EmployesArray[i].Tax;
  btnSave.innerHTML="تعديل البيانات";
  status='update';
  x=i;
  scroll({top:0,behavior:'smooth'})
}


// جلب البحث عن موظف 
let typeSearch="Name";
let departmentSearch=document.getElementById('departmentSearch');

function getSearchType(id){
    if(id=="searchName"){
        typeSearch="Name";
        departmentSearch.placeholder="ادخل اسم الموظف للبحث"

    }
    else{
        typeSearch="Department";
        departmentSearch.placeholder="ادخل اسم القسم للبحث"
    }
    departmentSearch.focus();
}
//القيام بعملية البحث
function searchData(value){
    let tData="";
    if(typeSearch=="Name"){
        
        for(let i=0;i<EmployesArray.length;i++){
            if(EmployesArray[i].Name.includes(value)){
                tData +=`
            <tr>
                <td>${i+1}</td>
                <td>${EmployesArray[i].Name}</td>
                <td>${EmployesArray[i].Department}</td>
                <td>${EmployesArray[i].Total}</td>
                <td><button onclick="updateData(${i})"><i class="fa-solid fa-pencil"></i></button></td>
                <td><button onclick="deleteData(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML=tData;
    }
    else{
        for(let i=0;i<EmployesArray.length;i++){
            if(EmployesArray[i].Department.includes(value)){
                tData +=`   
            <tr>
                <td>${i+1}</td>
                <td>${EmployesArray[i].Name}</td>
                <td>${EmployesArray[i].Department}</td>
                <td>${EmployesArray[i].Total}</td>
                <td><button onclick="updateData(${i})"><i class="fa-solid fa-pencil"></i></button></td>
                <td><button onclick="deleteData(${i})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
            }
        }
        document.getElementById('tbody').innerHTML=tData;
    }
}


