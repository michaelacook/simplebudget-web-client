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
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  const [user, setUser] = useState(null)
  const [budgets, setBudgets] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user") || null))
    getBudgets(user)
  }, [0])

  /**
   * Log out of the current session
   */
  const logout = () => {
    setUser(null)
    setBudgets(null)
    Cookies.remove("user")
  }

  /**
   * Send a request with Basic Auth header, get user's budgets and add to state
   * @param {Object} user
   */
  async function getBudgets(user) {
    if (user) {
      const response = await fetch("http://localhost:5000/budget/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Basic " + btoa(`${user.email}:${user.rawPass}`),
        },
      })

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
        })
      }
    }
  }

  /**
   * Send DELETE request with Basic Auth header to delete a budget
   * @param {Number} id - budget PK
   */
  function deleteBudget(id) {
    fetch(`http://localhost:5000/budget/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${user.email}:${user.rawPass}`),
      },
    })
      .then(() => {
        const newBudgetsState = budgets.filter((budget) => budget.id !== id)
        setBudgets(newBudgetsState)
      })
      .catch((error) => console.log(error))
  }

  /**
   * Send DELETE request with Basic Auth header to close a user account
   * After deleting, end user session
   * @param {Number} id - user PK
   */
  function deleteUser(id) {
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${user.email}:${user.rawPass}`),
      },
    })
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
    const response = await fetch("http://localhost:5000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${email}:${password}`),
      },
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
   * Send a POST request with Basic Auth header to add one or more expenditure
   * @param {Array} expenditures
   */
  function addExpenditure(expenditures) {
    return fetch("http://localhost:5000/expenditures/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${user.email}:${user.rawPass}`),
      },
      body: JSON.stringify(expenditures),
    })
  }

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Switch>
        <PrivateRoute user={user} path="/" exact>
          <Dashboard user={user} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/manage/:id" exact>
          <EditBudget />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/new" exact>
          <NewBudget user={user} budgets={budgets} setBudgets={setBudgets} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/manage" exact>
          <ManageBudgets budgets={budgets} deleteBudget={deleteBudget} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/:id">
          <ViewBudget />
        </PrivateRoute>
        <PrivateRoute user={user} path="/expenditures/new" exact>
          <AddExpense addExpenditure={addExpenditure} budgets={budgets} />
        </PrivateRoute>
        <Route path="/login">
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
      </Switch>
    </Router>
  )
}
