import React, { useState } from "react"
import { Button, Container, Form, Header, Segment } from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  const [payload, setPayload] = useState({})
  const [titles, setTitles] = useState([
    { key: 1, text: "Personal", value: "personal" },
    { key: 2, text: "Business", value: "business" },
  ])
  const [budgets, setBudgets] = useState([
    {
      title: "Personal",
      categories: [
        { key: 1, text: "Car", value: "car" },
        { key: 2, text: "Groceries", value: "groceries" },
      ],
    },
    {
      title: "Business",
      categories: [
        { key: 1, text: "Internet", value: "internet" },
        { key: 2, text: "Debit Machine", value: "debit machine" },
      ],
    },
  ])
  const [budget, setBudget] = useState(budgets[1])

  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Expenditures", path: "/expenditures" },
          { name: "New", path: "/expenditures/new" },
        ]}
      />
      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h2">Add Expenses</Header>
        <Form className="mt-1" fluid>
          <Form.Group>
            <Form.Select
              label="Budget"
              options={titles}
              placeholder="Budget"
            ></Form.Select>
            <Form.Select
              label="Category"
              options={budget.categories}
              placeholder="Category"
            ></Form.Select>
            <Form.Input label="Amount" placeholder="E.g 25.56"></Form.Input>
          </Form.Group>
          <Button>Add</Button>
        </Form>
      </Segment>
    </Container>
  )
}
