const flaskapi_url = 'http://127.0.0.1:5000/fetchEmployee/'

async function loadData(url) {
    const response = await fetch(url)
    let data = await response.json();
    return data;
}

async function fetchEmployee(id){
    const url_emp = flaskapi_url + id
    data = await loadData(url_emp)
    console.log("data from the backend is => ", data);
    document.getElementById("firstName").value = data.firstName;
    document.getElementById("lastName").value = data.lastName;
    document.getElementById("DOB").value = data.dob;
    document.getElementById("hireDate").value = data.hireDate;
    document.getElementById("department").value = data.department;
    document.getElementById("salary").value = data.salary;
    document.getElementById("manager").value = data.manager;
    document.getElementById("designation").value = data.designation;

}

function handleSearch(){
    const empId = document.getElementById('empId').value;
    console.log("empID = ", typeof(empId));
    if(empId < 1 || empId > 3 || empId == ''){

        document.getElementById('invalidInput').innerHTML = `
        <div class="alert alert-danger" role="alert">
        Invalid Input! Try again.
        </div>
        `
        return;
    }
    else{
        document.getElementById('invalidInput').innerHTML = ``
    }
    console.log("emp id ", empId);
    fetchEmployee(empId);

}