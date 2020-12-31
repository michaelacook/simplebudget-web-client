import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Cookies from "js-cookie"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Account from "./components/Account"
import Dashboard from "./components/Dashboard"
import NewBudget from "./components/NewBudget"
import Settings from "./components/Settings"
import AddExpense from "./components/AddExpense"
import ManageBudgets from "./components/ManageBudgets"
import EditBudget from "./components/EditBudget"
import ViewBudget from "./components/ViewBudget"
import ViewSpending from "./components/ViewSpending"
import ViewStatistics from "./components/ViewStatistics"
import ManageBills from "./components/ManageBills"
import AddBill from "./components/AddBill"
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  const [user, setUser] = useState(null)
  const [budgets, setBudgets] = useState(null)
  const [bills, setBills] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user") || null))
    const budgets = Cookies.get("budgets")
    if (budgets) {
      setBudgets(JSON.parse(budgets))
    } else {
      getBudgets(user)
    }
  }, [0])

  /**
   * Log out of the current session
   */
  function logout() {
    setUser(null)
    setBudgets(null)
    Cookies.remove("user")
    Cookies.remove("budgets")
    Cookies.remove("bills")
  }

  /**
   * Send a server request
   * @param {String} url - resource
   * @param {String} method - HTTP verb
   * @param {Object} user - send Basic Auth header if user present
   * @param {Object} body - send HTTP payload if present
   * @return {Func} fetch request
   */
  function HTTPRequest(url, method, user, body = null) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    }
    if (user) {
      headers["Authorization"] =
        "Basic " + btoa(`${user.email}:${user.rawPass}`)
    }
    const options = {
      method: method.toUpperCase(),
      headers,
    }
    if (body) {
      options["body"] = JSON.stringify(body)
    }
    return fetch(url, options)
  }

  /**
   * Get all a user's bills, set bills state
   * @param {Object} user
   * @return {Promise} bills
   */
  async function getBills(user) {
    const response = await HTTPRequest(
      "http://localhost:5000/bill",
      "get",
      user
    )
    if (response.status !== 200) {
      return null
    } else {
      response.json().then((bills) => setBills(bills))
    }
  }

  /**
   * Send a request with Basic Auth header, get user's budgets and add to state
   * @param {Object} user
   */
  async function getBudgets(user) {
    const response = await HTTPRequest(
      "http://localhost:5000/budget/all",
      "get",
      user
    )
    if (response.status !== 200) {
      return null
    } else {
      response.json().then((budgets) => {
        budgets.forEach((budget) => {
          budget.Categories.forEach((category) => {
            category.key = category.id
            category.text = category.title
            category.value = category.id
          })
        })
        setBudgets(budgets)
        Cookies.set("budgets", JSON.stringify(budgets))
      })
    }
  }

  /**
   * Send POST request with Basic Auth header to add a new budget
   * @param {Object} payload
   * @return fetch request
   */
  function addBudget(payload) {
    return HTTPRequest(
      "http://localhost:5000/budget/new",
      "post",
      user,
      payload
    )
  }

  /**
   * Send DELETE request with Basic Auth header to delete a budget
   * @param {Number} id - budget PK
   */
  function deleteBudget(id) {
    HTTPRequest(`http://localhost:5000/budget/${id}/delete`, "delete", user)
      .then(() => {
        const newBudgetsState = budgets.filter((budget) => budget.id !== id)
        setBudgets(newBudgetsState)
        Cookies.set("budgets", JSON.stringify(newBudgetsState))
      })
      .catch((error) => console.log(error))
  }

  /**
   * Send DELETE request with Basic Auth header to close a user account
   * After deleting, end user session
   * @param {Number} id - user PK
   */
  function deleteUser(id) {
    HTTPRequest(`http://localhost:5000/user/${id}`, "delete", user)
      .then(() => {
        setUser(null)
        setBudgets(null)
      })
      .catch((error) => console.log(error))
  }

  /**
   * Get a user based on credentials, send request with Basic Auth header, authenticate user session
   * @param {String} email
   * @param {String} password
   * @param {Boolean} checkbox
   * @param {Func} setError
   * @return {Object} authenticated user
   */
  async function login(email, password, checkbox, setError) {
    const response = await HTTPRequest("http://localhost:5000/user", "get", {
      email,
      rawPass: password,
    })
    if (response.status !== 200) {
      response.json().then((data) => setError(data))
    } else {
      const user = await response.json()
      const expires = checkbox ? 365 : 1
      user.rawPass = password
      Cookies.set("user", JSON.stringify(user), { expires })
      setUser(user)
      return user
    }
  }

  /**
   * Send a GET request with Basic Auth header to get all expenditures
   * @param {Number} year
   * @param {Number} month
   * @param {Number} day
   * @param {Number} budgetId
   * @param {Number} id
   * @return {Promise} expenditures
   */
  async function getExpenditures(
    year,
    month = null,
    day = null,
    budgetId = null,
    id = null
  ) {
    const path = `http://localhost:5000/expenditures${
      id ? "/" + id : ""
    }?year=${year}${month ? "&month=" + month : ""}${
      day ? "&day=" + day : ""
    }&userId=${user.id}${budgetId ? "&budgetId=" + budgetId : ""}`
    const response = await HTTPRequest(path, "get", user)
    if (response.status !== 200) {
      return null
    }
    const expenditures = await response.json()
    return expenditures
  }

  /**
   * Send a POST request with Basic Auth header to add one or more expenditure
   * @param {Array} expenditures
   * @return fetch request
   */
  function addExpenditure(expenditures) {
    return HTTPRequest(
      "http://localhost:5000/expenditures/new",
      "post",
      user,
      expenditures
    )
  }

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Switch>
        <PrivateRoute user={user} path="/" exact>
          <Dashboard user={user} logout={logout} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/manage/:id" exact>
          <EditBudget />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/new" exact>
          <NewBudget
            user={user}
            budgets={budgets}
            setBudgets={setBudgets}
            addBudget={addBudget}
          />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/manage" exact>
          <ManageBudgets budgets={budgets} deleteBudget={deleteBudget} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/:id">
          <ViewBudget />
        </PrivateRoute>
        <PrivateRoute user={user} path="/expenditures/view" exact>
          <ViewSpending
            user={user}
            budgets={budgets}
            getExpenditures={getExpenditures}
          />
        </PrivateRoute>
        <PrivateRoute user={user} path="/expenditures/new" exact>
          <AddExpense
            user={user}
            addExpenditure={addExpenditure}
            budgets={budgets}
          />
        </PrivateRoute>
        <PrivateRoute user={user} path="/statistics" exact>
          <ViewStatistics />
        </PrivateRoute>
        <Route path="/login" exact>
          <Login login={login} getBudgets={getBudgets} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute user={user} path="/account/:slug?">
          <Account user={user} deleteUser={deleteUser} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/settings" exact>
          <Settings />
        </PrivateRoute>
        <PrivateRoute user={user} path="/bills" exact>
          <ManageBills />
        </PrivateRoute>
        <PrivateRoute user={user} path="/bills/new">
          <AddBill user={user} />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
