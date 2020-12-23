import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom"
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
  const history = useHistory()

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
          setBudgets(budgets)
        })
      }
    }
  }

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
          <NewBudget user={user} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/manage" exact>
          <ManageBudgets budgets={budgets} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/budgets/:id">
          <ViewBudget />
        </PrivateRoute>
        <PrivateRoute user={user} path="/expenditures/new" exact>
          <AddExpense />
        </PrivateRoute>
        <Route path="/login">
          <Login login={login} getBudgets={getBudgets} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute user={user} path="/account/:slug?">
          <Account user={user} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/settings" exact>
          <Settings />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
