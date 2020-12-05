import React, { useState } from "react"
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  const [amount, setAmount] = useState("")
  const [budget, setBudget] = useState("")
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
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState([])
  const [titles, setTitles] = useState([
    { key: 1, text: "Personal", value: "personal" },
    { key: 2, text: "Business", value: "business" },
  ])

  /**
   * Set budget state based on budget dropdown value
   * @param {Object} data
   */
  const handleBudgetDropdownChange = (data) => {
    setBudget(
      budgets.find((budget) => budget.title.toLowerCase() === data.value)
    )
  }

  /**
   * Clear state variables needed after adding to payload
   */
  const clearState = () => {
    setAmount("")
    setCategory("")
    setDate(new Date())
  }

  /**
   * Add a new expenditure to the payload
   */
  const addToPayload = () => {
    setPayload([
      ...payload,
      {
        budget,
        category,
        amount,
        date,
      },
    ])
    clearState()
  }

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
              onChange={(e, data) => handleBudgetDropdownChange(data)}
            ></Form.Select>
            <Form.Select
              label="Category"
              options={budget.categories}
              placeholder="Category"
              onChange={(e, data) => setCategory(data.value)}
            ></Form.Select>
            <Form.Input
              label="Amount"
              placeholder="E.g 25.56"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></Form.Input>
            <Form.Input
              type="date"
              label="Date"
              value={date}
              onChange={(e, data) => setDate(data.value)}
            />
          </Form.Group>
          <Button onClick={addToPayload}>Add</Button>
        </Form>
        <Divider />
        <Button loading={loading} onClick={(e) => setLoading(!loading)} primary>
          Done
        </Button>
      </Segment>
    </Container>
  )
}
