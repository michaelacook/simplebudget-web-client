import React, { useState, useEffect } from "react"
import {
  Button,
  Container,
  Dropdown,
  Form,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react"
import { useParams } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"

export default function EditExpenditure({ user, budgets, getExpenditure }) {
  const { id } = useParams()
  const [budget, setBudget] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setday] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [buttonText, setButtonText] = useState("Save")
  const [categories, setCategories] = useState("")

  useEffect(() => {
    getExpenditure(id)
      .then((response) => response.json())
      .then((expenditure) => {
        setBudget(expenditure.budgetId)
        setCategory(expenditure.Category)
        setCategories(
          budgets.find((bug) => bug.id === expenditure.budgetId).Categories
        )
        setAmount(expenditure.amount)
        setYear(expenditure.year)
        setMonth(expenditure.month)
        setday(expenditure.day)
      })
  }, [])

  function handleChangeBudget(budgetId) {
    setBudget(budgetId)
    setCategories(budgets.find((bug) => bug.id === budgetId).Categories)
  }

  const budgetsSelectOptions = budgets.map((budget) => ({
    key: budget.id,
    value: budget.id,
    text: budget.title,
  }))

  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "View Spending", path: "/expenditures/view" },
          { name: "Edit Expenditure", path: `/expenditure/${id}` },
        ]}
      />

      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h1">Edit Expenditure</Header>
        <Form>
          <Form.Field width="8">
            <Dropdown
              fluid
              selection
              options={budgetsSelectOptions}
              value={budget}
              onChange={(e, data) => handleChangeBudget(data.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Dropdown
              fluid
              selection
              options={
                categories.length
                  ? categories.map((cat) => ({
                      key: cat.id,
                      value: cat.id,
                      text: cat.title,
                    }))
                  : null
              }
              label="Category"
              value={
                categories.length
                  ? categories.find((cat) => cat.title === category.title).id ||
                    null
                  : null
              }
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              type="number"
              label="Amount"
              value={Number(amount).toFixed(2)}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              type="date"
              label="Date"
              //   value={}
              //   onChange={(e) => setDate}
            />
          </Form.Field>
          <Button loading={loading}>
            <Icon name="save" />
            {buttonText}
          </Button>
        </Form>
      </Segment>
    </Container>
  )
}
