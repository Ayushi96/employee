console.log("included js file of employee ")

const url = 'emp_data.json'
const flaskapi_url = 'http://127.0.0.1:5000/fetchEmployee/'

async function loadData(url) {
    console.log(url)
    const response = await fetch(url)
    console.log("response is ", response)
    let data = await response.json();
    // console.log("data within loadData function ", data );
    return data;
}

async function fetchEmployee(id){
    console.log("called fetchEmployee()");
    const url_emp = flaskapi_url + id
    data = await loadData(url_emp)
    console.log("data from the backend is => ", data);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let dob = data.dob;
    let hireDate = data.hireDate;
    let department = data.department;
    let designation = data.designation;
    let salary = data.salary;
    let manager = data.manager;
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("DOB").value = dob;
    document.getElementById("hireDate").value = hireDate;
    document.getElementById("department").value = department;
    document.getElementById("salary").value = salary;
    document.getElementById("manager").value = manager;
    document.getElementById("designation").value = designation;

}

function handleSearch(){
    console.log("calling the new handle search")
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





