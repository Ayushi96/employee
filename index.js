console.log("included js file ")

const url = 'https://reqres.in/api/users'

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
    let allEmp = data["data"];
    // stringData = JSON.stringify(data)
    // console.log(stringData);

    // console.log("data inside populate Data function ", data);
    let empData = document.getElementById("empData");
    let emoployee = allEmp.find((emp) => {
        if(emp.id == id){
            return emp;
        }

    });
    console.log("matching employee ", emoployee);

    let firstName = emoployee["first_name"];
    let lastName = emoployee["last_name"];
    let email = emoployee["email"];
    let avatar = emoployee["avatar"];

    empData.innerHTML = `
    <div class="form-group flex-v-center my-2">
        <div class="row">
            <label for="firstName" class="form-label col">First Name :</label>
            <input type="text" class="form-control col" id="firstName" value=${firstName}>
            <label for="lastName" class="form-label col">Last Name :</label>
            <input type="text" class="form-control col" id="firstName" value=${lastName}>
            <label for="email" class="form-label col">Email :</label>
            <input type="email" class="form-control col" id="email" value=${email}>
        </div>
    </div>
    
    <img src=${avatar} alt='Employee Image' class="col" width="150">
    
  `
    // console.log("data ", data["data"]);
}

function handleSearch() {
    let empData = document.getElementById("empData");
    empData.innerHTML = ''
    const empId = document.getElementById('empId').value;
    console.log("emp id ", empId);
    populateData(empId)

}



