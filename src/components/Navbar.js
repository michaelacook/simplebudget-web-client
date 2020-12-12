import React from "react"
import { Menu, Container } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import ConfirmLogoutModal from "./modals/ConfirmLogoutModal"

export default ({ user, login, logout, darkmode }) => {
  return (
    <Menu inverted={!darkmode}>
      <Container>
        <Menu.Item
          as={NavLink}
          to="/"
          exact
          name={user ? "dashboard" : "SimpleBudget"}
        />
        {user ? (
          <Menu.Item as={NavLink} to="/budgets" name="My Budgets" />
        ) : null}
        <Menu.Menu position="right">
          {user ? (
            <Menu.Item
              as={NavLink}
              to="/account"
              icon="user"
              name="Account"
            ></Menu.Item>
          ) : null}
          {!user ? <Menu.Item as={NavLink} to="/login" name="login" /> : null}
          {user ? (
            <ConfirmLogoutModal user={user} logout={logout} />
          ) : (
            <Menu.Item as={NavLink} to="/signup" name="sign up" />
          )}
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
