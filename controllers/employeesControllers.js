const data= {};
data.employees = require('../data/employees.json');

const getAllEmployees = (req, res) =>{
    res.json(data.employees);
};

const addEmployee = (req, res) =>{
    res.json({
        "fistName": req.body.firstName,
        "lastName": req.body.lastName
    });
};

const updateEmployee = (req, res) =>{
    res.json({
        "fistName": req.body.firstName,
        "lastName": req.body.lastName
    });
};
 const deleteEmployee = (req, res) =>{
    res.json({
        "id": req.body.id
    });
};

const getEmployee = (req, res) =>{
    res.json({
        "id": req.params.id

    });
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}