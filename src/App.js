import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Cookies from "js-cookie"
import Navbar from "./components/Navbar"
import Login from "./views/Login"
import Signup from "./views/Signup"
import Account from "./views/Account"
import Dashboard from "./views/Dashboard"
import NewBudget from "./views/NewBudget"
import Settings from "./views/Settings"
import AddExpense from "./views/AddExpense"
import EditExpenditure from "./views/EditExpenditure"
import ManageBudgets from "./views/ManageBudgets"
import EditBudget from "./views/EditBudget"
import ViewBudget from "./views/ViewBudget"
import ViewSpending from "./views/ViewSpending"
import ViewStatistics from "./views/ViewStatistics"
import ManageBills from "./views/ManageBills"
import AddBill from "./views/AddBill"
import Editbill from "./views/EditBill"
import PrivateRoute from "./components/PrivateRoute"
import EditAccount from "./views/EditAccount"

export default function App() {
  const [user, setUser] = useState(null)
  const [budgets, setBudgets] = useState(null)
  const [bills, setBills] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user") || null))
    const budgets = Cookies.get("budgets")
    const bills = Cookies.get("bills")
    if (budgets) {
      setBudgets(JSON.parse(budgets))
    } else {
      getBudgets(user)
    }
    if (bills) {
      setBills(JSON.parse(bills))
    } else {
      getBills(user)
    }
  }, [])

  /**
   * Log out of the current session
   */
  function logout() {
    setUser(null)
    setBudgets(null)
    setBills(null)
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
   * @return {Promise} fetch request
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
      response.json().then((bills) => {
        setBills(bills)
        Cookies.set("bills", JSON.stringify(bills))
      })
    }
  }

  /**
   * Send GET request with Basic Auth header to get a single bill
   * @param {Number} id - bill PK
   * @param {Object} user
   */
  function getBill(id, user) {
    return HTTPRequest(`http://localhost:5000/bill/${id}`, "get", user)
  }

  /**
   * Send POST request with Basic Auth header to add a bill
   * @param {Object} user
   * @param {Object} payload
   * @return {Promise} fetch request
   */
  function addBill(user, payload) {
    return HTTPRequest("http://localhost:5000/bill", "post", user, payload)
  }

  /**
   * Send PUT request with Basic Auth header to update a bill
   * @param {Object} user
   * @param {Number} id - bill PK
   * @param {Object} payload - new data
   * @return {Promise}
   */
  function updateBill(user, id, payload) {
    return HTTPRequest(`http://localhost:5000/bill/${id}`, "put", user, payload)
  }

  /**
   * Send DELETE request with Basic Auth header to delete a bill, then update state
   * @param {Number} id - bill PK
   */
  function deleteBill(id) {
    HTTPRequest(`http://localhost:5000/bill/${id}`, "delete", user).then(() => {
      const newBillsState = bills.filter((bill) => bill.id !== id)
      setBills(newBillsState)
      Cookies.set("bills", JSON.stringify(newBillsState))
    })
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
   * Send GET request with Basic Auth header to get a single budget
   * @param {Number} id
   */
  function getBudget(id) {
    return HTTPRequest(`http://localhost:5000/budget/${id}`, "get", user)
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
   * Send POST request with Basic Auth header to add a category for a budget
   * @param {Object} payload - data to add
   */
  function addCategory(payload) {
    return HTTPRequest(
      "http://localhost:5000/budget/category/new",
      "post",
      user,
      payload
    )
  }

  /**
   * Send DELETE request with Basic Auth header to delete category
   * @param {Number} id - category id
   */
  function deleteCategory(id) {
    return HTTPRequest(
      `http://localhost:5000/budget/category/${id}/delete`,
      "delete",
      user
    )
  }

  /**
   * Send PUT request with Basic Auth header
   * @param {Number} id budget id
   * @param {Object} payload - data to add
   */
  function updateBudget(id, payload) {
    return HTTPRequest(
      `http://localhost:5000/budget/${id}/update`,
      "put",
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
   * Send PUT request with Basic Auth header to update a user
   * @param {Number} id
   * @param {Object} payload
   * @param {Object} user
   */
  function updateUser(id, payload, user) {
    return HTTPRequest(
      `http://localhost:5000/user/${id}/update`,
      "put",
      user,
      payload
    )
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
   * @param {Function} setError
   * @return {Promise} authenticated user
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
   * Get a single expenditure
   * @param {Number} id - expenditure PK
   */
  function getExpenditure(id) {
    return HTTPRequest(`http://localhost:5000/expenditures/${id}`, "get", user)
  }

  /**
   * Send a POST request with Basic Auth header to add one or more expenditure
   * @param {Array} expenditures
   * @return {Promise} fetch request
   */
  function addExpenditure(expenditures) {
    return HTTPRequest(
      "http://localhost:5000/expenditures/new",
      "post",
      user,
      expenditures
    )
  }

  /**
   * Send PUT request with Basic Auth header to update an expenditure
   * @param {Number} id - expenditure PK
   * @param {Object} payload
   * @return {Promise} fetch requets
   */
  function updateExpenditure(id, payload) {
    return HTTPRequest(
      `http://localhost:5000/expenditures/${id}`,
      "put",
      user,
      payload
    )
  }

  /**
   * Send DELETE request with Basic Auth header to delete an expenditure
   * @param {Number} id - expenditure PK
   * @return {Promise} fetch request
   */
  function deleteExpenditure(id) {
    return HTTPRequest(
      `http://localhost:5000/expenditures/${id}`,
      "delete",
      user
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
          <EditBudget
            user={user}
            budgets={budgets}
            setBudgets={setBudgets}
            getBudget={getBudget}
            addNewCategory={addCategory}
            updateBudget={updateBudget}
            deleteBudget={deleteBudget}
            deleteCategory={deleteCategory}
          />
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
        <PrivateRoute user={user} path="/expenditures/:id" exact>
          <EditExpenditure
            user={user}
            budgets={budgets}
            getExpenditure={getExpenditure}
            updateExpenditure={updateExpenditure}
            deleteExpenditure={deleteExpenditure}
          />
        </PrivateRoute>
        <PrivateRoute user={user} path="/statistics" exact>
          <ViewStatistics />
        </PrivateRoute>
        <Route path="/login" exact>
          <Login login={login} getBudgets={getBudgets} getBills={getBills} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute user={user} path="/account/edit">
          <EditAccount user={user} setUser={setUser} updateUser={updateUser} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/account/:slug?" exact>
          <Account user={user} bills={bills} deleteUser={deleteUser} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/settings" exact>
          <Settings />
        </PrivateRoute>
        <PrivateRoute user={user} path="/bills" exact>
          <ManageBills bills={bills} deleteBill={deleteBill} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/bills/new">
          <AddBill
            user={user}
            bills={bills}
            setBills={setBills}
            addBill={addBill}
          />
        </PrivateRoute>
        <PrivateRoute user={user} path="/bills/:id">
          <Editbill
            user={user}
            bills={bills}
            getBill={getBill}
            setBills={setBills}
            updateBill={updateBill}
          />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
