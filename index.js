console.log("included js file ")

const url = 'emp_data.json'

async function loadData(url){
    const response = await fetch(url)
    let data = await response.json();
    // console.log("data within loadData function ", data );
   return data;
}


async function populateData(id){
    // let id = iid.toString()
    console.log("id string ", id)
    data = await loadData(url)
    // stringData = JSON.stringify(data)
    // console.log(stringData);

    // console.log("data inside populate Data function ", data);
    let empData = document.getElementById("empData");

    let firstName = data[id].firstName;
    let lastName = data[id].lastName;
    let dob = data[id].dob;
    let hireDate = data[id].hireDate;
    let department = data[id].department;
    let designation = data[id].designation;
    let salary = data[id].salary;
    let manager = data[id].manager;
    empData.innerHTML = `<div class="mb-3">
    <label for="firstName" class="form-label">First Name :</label>
    <input type="text" class="form-control" id="firstName" value=${firstName}>
  </div>
    <label for="lastName" class="form-label">Last Name :</label>
    <input type="text" class="form-control" id="firstName" value=${lastName}>
  </div>
    <label for="DOB" class="form-label">DOB :</label>
    <input type="text" class="form-control" id="DOB" value=${dob}>
  </div>
    <label for="hireDate" class="form-label">Hire Date :</label>
    <input type="text" class="form-control" id="hireDate" value=${hireDate}>
  </div>
    <label for="department" class="form-label">Department :</label>
    <input type="text" class="form-control" id="department" value=${department}>
  </div>
    <label for="designation" class="form-label">Designation :</label>
    <input type="text" class="form-control" id="designation" value=${designation}>
  </div>
    <label for="salary" class="form-label">Salary :</label>
    <input type="text" class="form-control" id="salary" value=${salary}>
  </div>
    <label for="manager" class="form-label">Manager :</label>
    <input type="text" class="form-control" id="manager" value=${manager}>
  </div>
  
  `
    console.log("first name ", firstName)
}

function handleSearch(){
    let empData = document.getElementById("empData");
    empData.innerHTML = ''
    const empId = document.getElementById('empId').value;
    console.log("emp id ", empId);
    populateData(empId)

}



