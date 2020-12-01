import React from "react"
import { Button, Container, Grid, Segment } from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Budgets", path: "/budgets" },
          { name: "New", path: "/budgets/new" },
        ]}
      />
    </Container>
  )
}
