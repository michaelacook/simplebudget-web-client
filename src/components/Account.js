import React, { Fragment, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import AccountMenu from "./AccountMenu"
import AccountDetails from "./AccountDetails"
import FinancialProfile from "./FinancialProfile"

export default ({ user, bills, deleteUser }) => {
  const { slug } = useParams()
  const history = useHistory()

  if (!slug) {
    history.push("/account/details")
  }

  return (
    <Fragment>
      <AccountMenu />
      {slug === "details" || !slug ? (
        <AccountDetails user={user} deleteUser={deleteUser} />
      ) : (
        <FinancialProfile user={user} bills={bills} />
      )}
    </Fragment>
  )
}
