const fetchEmployee_url = 'http://127.0.0.1:5000/fetchEmployee/'
const editEmp_url = 'http://127.0.0.1:5000/edit/'

async function loadData(url, reqType, reqBody) {
    let response;
    if (reqType == 'post') {
        response = await fetch(url, { method: reqType, body: JSON.stringify(reqBody) })
    }
    else {
        response = await fetch(url)
    }
    let data = await response.json();
    return data;
}

async function fetchEmployee(id) {
    const url_emp = fetchEmployee_url + id
    data = await loadData(url_emp, 'GET', '')

    if (data.firstName) {

        document.getElementById("firstName").value = data.firstName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("DOB").value = data.dob;
        document.getElementById(data.gender).checked = true;
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
    // check for valid empId ( currently the db only has 3 employee ids: 1, 2, 3)
    // kept empId > 4 for testing invalid entry in db case
    if (isNaN(empId) || empId < 1 || empId == '') {

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

async function editEmployee() {
    const empId = document.getElementById('empId').value;
    if (isNaN(empId) || empId < 1 || empId == '') {
        alert("Invalid Employee Id. Try agian!")
        return;
    }
        let editUrl = editEmp_url + empId
        let inputGender = document.getElementById("Female").checked ? "Female" : "Male"

        let newData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            // dob: document.getElementById("DOB").value,
            gender: inputGender,
            // hireDate: document.getElementById("hireDate").value,
            department: document.getElementById("department").value,
            salary: document.getElementById("salary").value,
            manager: document.getElementById("manager").value,
            designation: document.getElementById("designation").value,
        }
        console.log(newData)
        response = await loadData(editUrl, "post", newData)
        console.log("response from edit api was => ", response)
        if (response.msg) {
            alert("Updated data for emp id: " + empId);
        }
        else {
            alert("No data found for emp id: " + empId)
        }
    }
  

    
