
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Login from "views/examples/Login.js";
import Browser from "./views/examples/Browser"
import Results from "./views/examples/Results";
import RegisterCompany from  "./views/examples/RegisterCompany";
import CompanyList from "./views/examples/CompanyList";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    show: true
  },
  {
    path: "/search",
    name: "Search",
    icon: "fa fa-search text-red",
    component: Browser,
    layout: "/admin",
    show: true
  },
  {
    path: "/profile",
    name: "Company Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    show: true
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    show: false
  },
  {
    path: "/results",
    name: "Results",
    icon: "fa fa-search text-green",
    component: Results,
    layout: "/admin",
    show: false
  },
  {
    path: "/register-company",
    name: "Register company",
    icon: "ni ni-single-02 text-blue",
    component: RegisterCompany,
    layout: "/admin",
    show: false,
    admin: true
  },

  {
    path: "/company-list",
    name: "Company list",
    icon: "ni ni-single-02 text-gray",
    component: CompanyList,
    layout: "/admin",
    show: false,
    admin: true
  },

];
export default routes;
