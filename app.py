from flask import Flask, render_template, sessions
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)

with open('config.json', 'r') as c:
    params = json.load(c)['params']

local_server = params['local_server']

if (local_server):
    app.config['SQLALCHEMY_DATABASE_URI'] = params['local_uri']
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = params['prod_uri']

# initialization
db = SQLAlchemy(app)

class Details(db.Model):
    '''
        ID, f_name, l_name, dob, hire_date, department, designation,
         salary, manager
    '''
    ID = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(50), nullable=False)
    l_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.String(12), nullable=False)
    hire_date = db.Column(db.String(12), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    designation = db.Column(db.String(50), nullable=False)
    salary = db.Column(db.Float(10))
    manager = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"[{self.ID},{self.f_name}, {self.l_name}, {self.dob}, {self.hire_date}, {self.department}, {self.designation}, {self.salary}, {self.manager}]"


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/fetchEmployee/<string:empId>')
def fetchEmp(empId):
    eid = int(empId)

    employeeDetails = Details.query.get(eid)

    row = { "firstName": str(employeeDetails.f_name),
    "lastName": str(employeeDetails.l_name),
    "dob": str(employeeDetails.dob), 
    "hireDate": str(employeeDetails.hire_date), 
    "department": str(employeeDetails.department), 
    "designation": str(employeeDetails.designation), 
    "salary": str(employeeDetails.salary), 
    "manager": str(employeeDetails.manager) 
    }
    emp_json = json.dumps(row)

    return emp_json


if __name__ == '__main__':
    app.run(debug=True)

