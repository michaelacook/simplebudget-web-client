import React from "react"
import { Button, Container, Header, List, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"

export default function ManageBills({ bills }) {
  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Manage Bills", path: "/bills" },
        ]}
      />
      <Segment raised className="mt-1" style={{ padding: "35px" }}>
        <Header as="h1">Manage Bills</Header>
        {bills ? (
          <span>Hi</span>
        ) : (
          <React.Fragment>
            <Header as="h5">You haven't added any bills yet.</Header>
            <Button as={Link} to="/bills/new">
              Add Bill
            </Button>
          </React.Fragment>
        )}
      </Segment>
    </Container>
  )
}
