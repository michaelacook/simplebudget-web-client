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
    const user = JSON.parse(Cookies.get("user"))
    const {
      firstName,
      lastName,
      email,
      password,
      createdAt,
      updatedAt,
      Budgets,
    } = user
    setUser(
      user
        ? {
            firstName,
            lastName,
            email,
            password,
            createdAt,
            updatedAt,
          }
        : null
    )
    setBudgets(Budgets ? Budgets : null)
  }, [])

  /**
   * Log out of the current session
   */
  const logout = () => {
    setUser(null)
    Cookies.remove("user")
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
          <Login login={setUser} />
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
