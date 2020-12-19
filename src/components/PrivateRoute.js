import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

export default function PrivateRoute({
  children,
  componentProps,
  user,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  )
}
