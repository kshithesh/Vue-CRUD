import {createRouter, createWebHistory } from "vue-router";

export default new createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            alias: "/employees",
            name: "employees",
            component: () => import("./components/EmployeeList")
        },
        {
            path: "/employees/:id",
            name: "employee-details",
            component: () => import("./components/Employees") 
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddEmployee")
        }
    ]
});