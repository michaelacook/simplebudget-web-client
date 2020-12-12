import React, { Fragment, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import AccountMenu from "./AccountMenu"
import AccountDetails from "./AccountDetails"
import FinancialProfile from "./FinancialProfile"

export default ({ user }) => {
  const { slug } = useParams()
  const history = useHistory()

  if (!slug) {
    history.push("/account/details")
  }

  return (
    <Fragment>
      <AccountMenu />
      {slug === "details" || !slug ? (
        <AccountDetails user={user} />
      ) : (
        <FinancialProfile user={user} />
      )}
    </Fragment>
  )
}
