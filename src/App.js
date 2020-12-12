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

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user") || null))
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
        <Route path="/" exact>
          <Dashboard user={user} />
        </Route>
        <Route path="/budgets/manage/:id" exact>
          <EditBudget />
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
          <Login login={setUser} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/account/:slug?">
          <Account user={user} />
        </Route>
        <Route path="/settings" exact>
          <Settings />
        </Route>
      </Switch>
    </Router>
  )
}
