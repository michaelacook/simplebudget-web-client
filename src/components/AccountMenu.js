import React from "react"
import { Container, Header, Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default () => {
  return (
    <Container className="mt-2">
      <Header as="h1" textAlign="right">
        My Account
      </Header>
      <Menu attached="top" tabular>
        <Menu.Item as={NavLink} to="/account/details" name="Account Details" />
        <Menu.Item
          as={NavLink}
          to="/account/finances"
          name="Financial Profile"
        />
      </Menu>
    </Container>
  )
}
