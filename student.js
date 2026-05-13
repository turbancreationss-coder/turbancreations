import { db } from "./firebase.js";

import {

  collection,
  addDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const form =
document.getElementById("studentForm");


form.addEventListener("submit",

async (e)=>{

  e.preventDefault();

  const studentData = {

    name:
    document.getElementById("name").value,

    fatherName:
    document.getElementById("fatherName").value,

    phone:
    document.getElementById("phone").value,

    email:
    document.getElementById("email").value,

    course:
    document.getElementById("course").value,

    batch:
    document.getElementById("batch").value,

    address:
    document.getElementById("address").value,

    notes:
    document.getElementById("notes").value,

    status:"Pending",

    createdAt:
    new Date()

  };


  try{

    await addDoc(

      collection(db,"students"),

      studentData

    );

    alert(
      "Student Registered Successfully"
    );

    form.reset();

  }

  catch(error){

    console.error(error);

    alert(
      "Error Saving Data"
    );

  }

});
