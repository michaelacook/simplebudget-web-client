import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Account from "./components/Account"
import Dashboard from "./components/Dashboard"
import NewBudget from "./components/NewBudget"
import Settings from "./components/Settings"
import AddExpense from "./components/AddExpense"
import ManageBudgets from "./components/ManageBudgets"

export default function App() {
  const [user, setUser] = useState({
    firstName: "Michael",
    lastName: "Cook",
    email: "mcook0775@gmail.com",
  })

  /**
   * Log out of the current session
   */
  const logout = () => {
    setUser(false)
  }

  /**
   * Start a user session
   */
  const login = () => {
    setUser(true)
  }

  return (
    <Router>
      <Navbar user={user} login={login} logout={logout} />
      <Switch>
        <Route path="/" exact>
          <Dashboard user={user} />
        </Route>
        <Route path="/budgets/new" exact>
          <NewBudget />
        </Route>
        <Route path="/budgets/manage" exact>
          <ManageBudgets />
        </Route>
        <Route path="/expenditures/new" exact>
          <AddExpense />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/account/:slug?">
          <Account />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
      </Switch>
    </Router>
  )
}
