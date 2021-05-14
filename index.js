console.log("included js file ")

const url = 'emp_data.json'

async function loadData(url) {
    const response = await fetch(url)
    let data = await response.json();
    // console.log("data within loadData function ", data );
    return data;
}


async function populateData(id) {
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
    empData.innerHTML = `
    <div class="form-group flex-v-center my-2">
        <div class="row">
            <label for="firstName" class="form-label col">First Name :</label>
            <input type="text" class="form-control col" id="firstName" value=${firstName}>
            <label for="lastName" class="form-label col">Last Name :</label>
            <input type="text" class="form-control col" id="firstName" value=${lastName}>
        </div>
    </div>
    <div class="form-group flex-v-center my-2">
        <div class="row">
            <label for="DOB"  class="form-label col">DOB :</label>
            <input type="text" class="form-control col" id="DOB" value=${dob}>
            <label for="hireDate" class="form-label col">Hire Date :</label>
            <input type="text" class="form-control col" id="hireDate" value=${hireDate}>
            
        </div>
    </div>
    <div class="form-group flex-v-center my-2">
        <div class="row">
            <label for="department" class="form-label col">Department :</label>
            <input type="text" class="form-control col" id="department" value=${department}>
            <label for="designation" class="form-label col">Designation :</label>
            <input type="text" class="form-control col" id="designation" value='${designation}'>
            
        </div>
    </div>

    <div class="form-group flex-v-center my-2">
        <div class="row">
            <label for="salary" class="form-label col">Salary :</label>
            <input type="text" class="form-control col" id="salary" value=${salary}>
            <label for="manager" class="form-label col">Manager :</label>
            <input type="text" class="form-control col" id="manager" value=${manager}>
            
        </div>
    </div>
    
  
  `
    console.log("designation ", designation)
}

function handleSearch() {
    let empData = document.getElementById("empData");
    empData.innerHTML = ''
    const empId = document.getElementById('empId').value;
    console.log("emp id ", empId);
    populateData(empId)

}



