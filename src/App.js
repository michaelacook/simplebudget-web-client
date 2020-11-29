import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Account from "./components/AccountMenu"
import AccountDetails from "./components/AccountDetails"
import FinancialProfile from "./components/FinancialProfile"

export default function App() {
  const [user, setUser] = useState(true)

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/account/details" exact>
          <AccountDetails />
        </Route>
        <Route path="/account/finances" exact>
          <FinancialProfile />
        </Route>
      </Switch>
    </Router>
  )
}
