console.log("included js file of employee ")

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
    document.getElementById("firstName").value = firstName;
    document.getElementById("lastName").value = lastName;
    document.getElementById("DOB").value = dob;
    document.getElementById("hireDate").value = hireDate;
    document.getElementById("department").value = department;
    document.getElementById("salary").value = salary;
    document.getElementById("manager").value = manager;
    document.getElementById("designation").value = designation;

}

function handleSearch() {
    let empData = document.getElementById("empData");
    //empData.innerHTML = ''
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
    populateData(empId)

}



