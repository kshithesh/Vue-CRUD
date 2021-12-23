<template>
  <div class="submit-form">
      <h2>Enter Employee Details</h2>
    <div v-if="!submitted">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="firstname"
          required
          v-model="employees.firstname"
          name="firstname"
          placeholder="First Name"
        />
      </div>

      <div class="form-group">
        <input
          class="form-control"
          id="lastname"
          required
          v-model="employees.lastname"
          name="lastname"
          placeholder="Last Name"
        />
      </div>

      <div class="form-group">
        <input
          class="form-control"
          id="email"
          required
          v-model="employees.email"
          name="email"
          placeholder="email"
        />
      </div>

      <div class="form-group">
        <input
          class="form-control"
          id="phone"
          required=true
          minlength="10"
          v-model="employees.phone"
          name="phone"
          placeholder="phone"
        />
      </div>

      <button @click="saveEmployees" id="submit-button" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEmployees">Add</button>
      <button class="btn btn-success" @click="goToEvents()">Employees List</button>
    </div>
  </div>
</template>

<script>
import employeesDataService from "../services/EmployeeDataService";

export default {
  name: "add-employees",
  data() {
    return {
      employees: {
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
      },
      submitted: false
    };
  },
  methods: {
      goToEvents: function () {
        location.href='/employees'
    },
    saveEmployees() {
      var data = {
        firstname: this.employees.firstname,
        lastname: this.employees.lastname,
        email: this.employees.email,
        phone: this.employees.phone
      };

      employeesDataService.create(data)
        .then(response => {
          this.employees.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newEmployees() {
      this.submitted = false;
      this.employees = {};
    }
  }
};
</script>

<style lang="scss">
.submit-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  background: $box-back;
  box-sizing: border-box;
  @include box-shadow;
}
.form-group {
    padding: 10px;
}
</style>