const data= {
    employees: require('../model/employees.json'),
    setEmployees: function (data){this.employees = data }
};

const getAllEmployees = (req, res) =>{
    res.json(data.employees);
};

const addEmployee = (req, res) =>{
   const newEmployee = {
       id: data.employees[data.employees.length - 1].id +1 || 1,
       firstName: req.body.firstName,
       lastName: req.body.lastName
   };

   if(!newEmployee.firstName || !newEmployee.lastName){
       return res.status(400).json({'message':'firstname or lastname can not be empty'});
   }

   data.setEmployees([...data.employees,newEmployee]);
   res.status(201).json(data.employees);
};

const updateEmployee = (req, res) =>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
    }
    if(req.body.firstName) employee.firstName = req.body.firstName;
    if(req.body.lastName) employee.lastName = req.body.lastName;

    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    const unsorted = [...filteredArray, employee];
    data.setEmployees(unsorted.sort((a,b) =>{ a.id > b.id ? 1 : a.id < b.id ? -1 :0 }));
    res.json(data.employees);
};
 const deleteEmployee = (req, res) =>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
};

const getEmployee = (req, res) =>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
    }
    res.json(employee);
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}