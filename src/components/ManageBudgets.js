import React, { useState } from "react"
import { Container, Header, Segment } from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  const [budgets, setBudgets] = useState({
    // budgets data go here    
  })

  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Budgets", path: "/budgets" },
          { name: "Manage", path: "/budgets/manage" },
        ]}
      />
      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h2">Manage Budgets</Header>
      </Segment>
    </Container>
  )
}
