const flaskapi_url = 'http://127.0.0.1:5000/fetchEmployee/'

async function loadData(url) {
    const response = await fetch(url)
    let data = await response.json();
    return data;
}

async function fetchEmployee(id) {
    const url_emp = flaskapi_url + id
    data = await loadData(url_emp)
   
    if(data.firstName) {
        
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("DOB").value = data.dob;
        document.getElementById("hireDate").value = data.hireDate;
        document.getElementById("department").value = data.department;
        document.getElementById("salary").value = data.salary;
        document.getElementById("manager").value = data.manager;
        document.getElementById("designation").value = data.designation;
    }
    else {
        alert("No data found for emp id: " + id);
    }
}



/*
* This function is the handler for search button for finding Employee details
*/
function handleSearch() {
    const empId = document.getElementById('empId').value;
    console.log("empID = ", typeof (empId));
    // check for valid empId ( currently the db only has 3 employee ids: 1, 2, 3)
    // kept empId > 4 for testing invalid entry in db case
    if (isNaN(empId) || empId < 1 || empId > 4 || empId == '') {

        // document.getElementById('invalidInput').innerHTML = `
        // <div class="alert alert-danger" role="alert">
        // Invalid Employee Id! Try again.
        // </div>
        // `
        alert("Invalid Employee Id. Try agian!")
        return;
    }
    // else {
    //     document.getElementById('invalidInput').innerHTML = ``
    // }
    fetchEmployee(empId);

}