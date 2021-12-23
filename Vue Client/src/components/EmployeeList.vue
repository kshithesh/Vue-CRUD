<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by firstname"
          v-model="firstname"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-primary"
            type="button"
            @click="searchFirstname()"
          >
            Search
          </button>
          <button
            id="remove-all"
            class="m-3 btn btn-sm btn-danger"
            @click="removeAllEmployees"
          >
            Remove All
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(employees, index) in employees"
          :key="index"
          @click="setActiveEmployees(employees, index)"
        >
          {{ employees.firstname }}
        </li>
      </ul>
    </div>
    <div class="current-info">
      <div class="col-md-6">
        <div v-if="currentEmployees">
          <h4>Employee</h4>
          <div>
            <label><strong>Firstname:</strong></label>
            {{ currentEmployees.firstname }}
          </div>
          <div>
            <label><strong>Lastname:</strong></label>
            {{ currentEmployees.lastname }}
          </div>
          <div>
            <label><strong>Email:</strong></label> {{ currentEmployees.email }}
          </div>
          <div>
            <label><strong>Phone:</strong></label> {{ currentEmployees.phone }}
          </div>

          <a
            id="edit-button"
            class="m-3 btn btn-sm btn-danger"
            :href="'/employees/' + currentEmployees.id"
          >
            Edit
          </a>
        </div>
        <div v-else>
          <br />
          <p>Please click on a employee</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import employeesDataService from "../services/EmployeeDataService";

export default {
  name: "employees-list",
  data() {
    return {
      employees: [],
      currentEmployees: null,
      currentIndex: -1,
      firstname: "",
    };
  },
  methods: {
    retrieveEmployees() {
      employeesDataService
        .getAll()
        .then((response) => {
          this.employees = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveEmployees();
      this.currentEmployees = null;
      this.currentIndex = -1;
    },

    setActiveEmployees(employees, index) {
      this.currentEmployees = employees;
      this.currentIndex = index;
    },

    removeAllEmployees() {
      employeesDataService
        .deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchFirstname() {
      employeesDataService
        .findByFirstName(this.firstname)
        .then((response) => {
          this.employees = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveEmployees();
  },
};
</script>

<style lang="scss">
.list {
  text-align: left;
  max-width: auto;
}

.list-group {
  position: fixed;
  margin-top: 210px;
  left: 22%;
  height: 400px;
  width: 300px;
  @include box-shadow;
  overflow: hidden;
  overflow-y: scroll;
}
.form-control {
  margin-right: 10px;
}
.input-group-append {
  margin-left: 10px;
}
.current-info {
  margin-top: 100px;
  margin-left: 50%;
}
</style>
