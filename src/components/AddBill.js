import React, { useState } from "react"
import { Button, Container, Form, Header, Segment } from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default function AddBill({ user, addBill }) {
  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Manage Bills", path: "/bills" },
          { name: "New", path: "/bills/new" },
        ]}
      />
      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h1">Record Bills</Header>
      </Segment>
    </Container>
  )
}
