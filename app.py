from flask import Flask, render_template, sessions, request
from flask_sqlalchemy import SQLAlchemy
import json
from flask_cors import CORS

from werkzeug.utils import redirect

app = Flask(__name__)
CORS(app)

with open("config.json", "r") as c:
    params = json.load(c)["params"]

local_server = params["local_server"]

if local_server:
    app.config["SQLALCHEMY_DATABASE_URI"] = params["local_uri"]
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = params["prod_uri"]

# initialization
db = SQLAlchemy(app)


class Details(db.Model):
    """
    ID, f_name, l_name, dob, hire_date, department, designation,
     salary, manager
    """

    ID = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(50), nullable=False)
    l_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.String(12), nullable=False)
    gender = db.Column(db.String(6), nullable=False)
    hire_date = db.Column(db.String(12), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    designation = db.Column(db.String(50), nullable=False)
    salary = db.Column(db.Float(10))
    manager = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"[{self.ID},{self.f_name}, {self.l_name}, {self.dob}, {self.hire_date}, {self.department}, {self.designation}, {self.salary}, {self.manager}]"


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/fetchEmployee/<string:empId>")
def fetchEmp(empId):
    try:
        eid = int(empId)
    except ValueError:
        print("Input was not a valid integer")

    employeeDetails = Details.query.get(eid)
    # if there is no record for eid in the DB
    if employeeDetails == None:
        return json.dumps({})

    row = {
        "firstName": str(employeeDetails.f_name),
        "lastName": str(employeeDetails.l_name),
        "dob": str(employeeDetails.dob),
        "gender": str(employeeDetails.gender),
        "hireDate": str(employeeDetails.hire_date),
        "department": str(employeeDetails.department),
        "designation": str(employeeDetails.designation),
        "salary": str(employeeDetails.salary),
        "manager": str(employeeDetails.manager),
    }
    emp_json = json.dumps(row)

    return emp_json


@app.route("/edit/<string:eid>", methods=["POST"])
def edit(eid):
    try:
        eid = int(eid)
    except ValueError:
        print("Input was not a valid integer")

    if request.method == "POST":
        emp = Details.query.get(eid)
        print( emp)
        if emp == None:
            print("caught invalid id in backend")
            return json.dumps({})
        newData = json.loads(request.data)
        emp.f_name = newData["firstName"]
        emp.l_name = newData["lastName"]
        emp.gender = newData["gender"]
        emp.department = newData["department"]
        emp.designation = newData["designation"]
        emp.salary = newData["salary"]
        emp.manager = newData["manager"]
        db.session.commit()
        response = json.dumps({"msg": "Updated Employee information!"})
    return response


if __name__ == "__main__":
    app.run(debug=True)
