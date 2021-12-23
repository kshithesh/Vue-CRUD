<template>
  <div v-if="currentEmployees" class="edit-form">
    <h4>Employees</h4>
    <form>
      <div class="form-group">
        <label for="firstname">Firstname</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          v-model="currentEmployees.firstname"
        />
      </div>
      <div class="form-group">
        <label for="lastname">lastname</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model="currentEmployees.lastname"
        />
      </div>
      <div class="form-group">
        <label for="email">EMail</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="currentEmployees.email"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="currentEmployees.phone"
        />
      </div>
    </form>

    <button class="btn btn-danger" @click="deleteEmployees">Delete</button>

    <button type="submit" class="btn btn-success" @click="updateEmployees">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Employees...</p>
  </div>
</template>

<script>
import employeesDataService from "../services/EmployeeDataService";

export default {
  name: "employees",
  data() {
    return {
      currentEmployees: null,
      message: "",
    };
  },
  methods: {
    getEmployees(id) {
      employeesDataService
        .get(id)
        .then((response) => {
          this.currentEmployees = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateEmployees() {
      employeesDataService
        .update(this.currentEmployees.id, this.currentEmployees)
        .then((response) => {
          console.log(response.data);
          this.message = "The employees was updated successfully!";
          location.href = "/employees";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteEmployees() {
      employeesDataService
        .delete(this.currentEmployees.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "employees" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getEmployees(this.$route.params.id);
  },
};
</script>

<style lang="scss">
.edit-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  @include box-shadow;
  box-sizing: border-box;
}
.btn {
  margin: 10px;
}
</style>