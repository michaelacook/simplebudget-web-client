import React, { useState } from "react"
import { Container, Segment } from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Budgets", path: "/budgets" },
          { name: "Manage", path: "/budgets/manage" },
        ]}
      />
    </Container>
  )
}
