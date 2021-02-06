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
import Breadcrumb from "../components/Breadcrumb"

export default function AddExpense(props) {
  const [amount, setAmount] = useState("")
  const [budget, setBudget] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState([])
  const [error, setError] = useState("")
  const [saveButtonText, setSaveButtonText] = useState("Save")

  const budgetTitles = props.budgets.map((budget) => {
    return {
      key: budget.id,
      text: budget.title,
      value: budget.title,
    }
  })

  /**
   * Handle click to save expenditures
   */
  function handleSave() {
    setLoading(true)
    props
      .addExpenditure(payload)
      .then(() => {
        setLoading(false)
        setAmount("")
        setDate("")
        setPayload([])
        setSaveButtonText("Saved!")
      })
      .catch((error) => setError(error))
  }

  /**
   * Set budget state based on budget dropdown value
   * @param {Object} data
   */
  function handleBudgetDropdownChange(data) {
    setBudget(props.budgets.find((budget) => budget.title === data.value))
  }

  /**
   * Add a category to state
   * @param {Object} data - select element data
   */
  function handleSetCategory(data) {
    const categoryId = data.value
    const category = budget.Categories.find(
      (category) => category.id === categoryId
    )
    setCategory(category)
  }

  /**
   * Add a new expenditure to the http payload
   */
  function addToPayload() {
    const newPayLoad = payload
    const [year, month, day] = date.split("-")
    newPayLoad.push({
      userId: props.user.id,
      budgetId: budget.id,
      categoryId: category.id,
      title: category.title,
      amount,
      date,
      year,
      month,
      day,
    })
    setPayload(newPayLoad)
    setAmount("")
  }

  /**
   * Remove an expenditure from state
   * @param {Number} i - expenditure index
   */
  function removeFromPayload(i) {
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
              fluid
              type="date"
              label="Date"
              value={date}
              onChange={(e, data) => setDate(data.value)}
            />
            <Form.Select
              fluid
              label="Budget"
              options={budgetTitles}
              placeholder="Budget"
              onChange={(e, data) => handleBudgetDropdownChange(data)}
            ></Form.Select>
            <Form.Select
              fluid
              label="Category"
              options={budget.Categories}
              placeholder="Category"
              onChange={(e, data) => handleSetCategory(data)}
            ></Form.Select>
            <Form.Input
              fluid
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
                      {item.title}, ${item.amount}
                    </List.Description>
                    <List.Description>{item.date}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </React.Fragment>
        ) : null}
        <Divider />
        <Button compact size="big" loading={loading} onClick={handleSave}>
          <Icon name="save" />
          {saveButtonText}
        </Button>
      </Segment>
    </Container>
  )
}
