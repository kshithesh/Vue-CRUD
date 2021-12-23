const db = require("../models");
const Employees = db.employees;

exports.create = (req,res) => {
    if (!req.body.firstname) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
        const employee = new Employees({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    });
    
      employee
        .save(employee)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Employee."
          });
        });
};
exports.findAll = (req,res) => {
   const firstname = req.query.firstname;
  var condition = firstname ? { firstname: { $regex: new RegExp(firstname), $options: "i" } } : {};

  Employees.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
};
exports.findOne = (req,res) => {
    const id = req.params.id;

  Employees.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employee with id=" + id });
    });
};
exports.update = (req,res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Employees.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Employee with id=${id}. Employee was not found!`
            });
          } else res.send({ message: "Employee was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Employee with id=" + id
          });
        });
};
exports.delete = (req,res) => {
    const id = req.params.id;

  Employees.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};
exports.deleteAll = (req,res) => {
    Employees.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employees were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all employees."
      });
    });
};