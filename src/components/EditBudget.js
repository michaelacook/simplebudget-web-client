import React, { useState } from "react"
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  const [budget, setBudget] = useState({
    title: "Personal",
    description: "My personal budget for monthly expenses.",
    categories: [
      { title: "rent", amount: 1200 },
      { title: "gas", amount: 60 },
      { title: "student loan", amount: 527 },
      { title: "beer", amount: 30 },
    ],
    total: 1817,
  })
  const [loading, setLoading] = useState(false)

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
        <Header as="h2">Edit Budget</Header>
        {budget ? (
          <Segment raised className="mt-2">
            <Header as="h3">{budget.title}</Header>
            <Divider />
            <Form>
              <Form.TextArea label="Description" value={budget.description}></Form.TextArea>
              <Form.Select
                label="Categories"
                placeholder="Categories"
                options={budget.categories.map((cat, i) => ({
                  key: i,
                  text: cat.title.toUpperCase(),
                  value: cat.title,
                }))}
              />
              <Form.Input label="New Amount" placeholder="E.g 35" />
            </Form>
            <Button className="mt-1" loading={loading} size="large">
              <Icon name="save" />
              Save
            </Button>
            <Button color="red" size="large">
              <Icon name="warning circle" />
              Delete
            </Button>
          </Segment>
        ) : null}
      </Segment>
    </Container>
  )
}
