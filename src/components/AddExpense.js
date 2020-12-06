import React, { useState } from "react"
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  List,
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
  const [payload, setPayload] = useState("")
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
   * Add a new expenditure to the payload
   */
  const addToPayload = () => {
    setPayload([
      ...payload,
      {
        budget: budget.title,
        category,
        amount,
        date,
      },
    ])
    setAmount("")
  }

  /**
   * Remove an expenditure from state
   * @param {Number} i - expenditure index
   */
  const removeFromPayload = (i) => {
    const newPayload = payload.filter((item, index) => index !== i)
    setPayload(newPayload)
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
        <Form className="mt-1">
          <Form.Group widths="equal">
            <Form.Input
              type="date"
              label="Date"
              value={date}
              onChange={(e, data) => setDate(data.value)}
            />
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
          </Form.Group>
          <Button color="green" size="tiny" onClick={addToPayload}>
            <Icon name="plus" />
            Add
          </Button>
        </Form>
        {payload ? (
          <React.Fragment>
            <List divided style={{ marginTop: "22px" }}>
              {payload.map((item, i) => (
                <List.Item key={i}>
                  <List.Content floated="right">
                    <Button
                      onClick={() => removeFromPayload(i)}
                      size="mini"
                      color="red"
                      float="right"
                      icon="minus"
                    ></Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>{item.budget}</List.Header>
                    <List.Description>
                      {item.category.toUpperCase()}, ${item.amount}
                    </List.Description>
                    <List.Description>{item.date}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </React.Fragment>
        ) : null}
        <Divider />
        <Button
          compact
          size="big"
          loading={loading}
          onClick={(e) => setLoading(!loading)}
        >
          <Icon name="save" />
          Save
        </Button>
      </Segment>
    </Container>
  )
}
