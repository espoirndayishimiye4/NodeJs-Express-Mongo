const express = require('express');
const router = express.Router();
const path = require('path');

const employeesController = require('../controllers/employeesControllers');


router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.addEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

    router.route('/:id')
    .get(employeesController.getEmployee)

module.exports = router;