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
import { useParams, useHistory } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"
import ConfirmDeleteExpenseModal from "./modals/ConfirmDeleteExpenseModal"

export default function EditExpenditure({
  user,
  budgets,
  getExpenditure,
  updateExpenditure,
  deleteExpenditure,
}) {
  const { id } = useParams()
  const history = useHistory()
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
  const state = history.location.state

  useEffect(() => {
    getExpenditure(id)
      .then((response) => response.json())
      .then((expenditure) => {
        setBudget(expenditure.budgetId)
        setCategory(expenditure.Category.id)
        setCategories(
          budgets.find((bug) => bug.id === expenditure.budgetId).Categories
        )
        setAmount(expenditure.amount)
        setYear(expenditure.year)
        setMonth(expenditure.month)
        setday(expenditure.day)
      })
  }, [])

  /**
   * Parse and set date state
   * @param {Object} e - synthetic browser event
   */
  function handleChangeDate(e) {
    const [year, month, day] = e.target.value.split("-")
    setYear(year)
    setday(day)
    setMonth(month)
  }

  /**
   * Assemble a payload and send PUT request
   */
  function handlSave() {
    setLoading(true)
    const payload = {}
    if (amount) {
      payload.amount = Number(amount)
    }
    if (year) {
      payload.year = year
      payload.month = month
      payload.day = day
    }
    if (Object.keys(payload).length) {
      payload.userId = user.id
      payload.budgetId = budget
      payload.categoryId = category
      updateExpenditure(id, payload)
        .then(() => {
          setLoading(false)
          setButtonText("Saved!")
        })
        .catch((error) => setError(error))
    }
  }

  /**
   * Send state back to ViewSpending
   * @param {Object} e - synthetic DOM event
   */
  function backToViewPrevious(e) {
    e.preventDefault()
    history.push({
      pathname: "/expenditures/view",
      state,
    })
  }

  function handleDelete() {
    deleteExpenditure(id).then(() => history.push("/expenditures/view"))
  }

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
                categories
                  ? categories.map((cat) => ({
                      key: cat.id,
                      value: cat.id,
                      text: cat.title,
                    }))
                  : null
              }
              label="Category"
              value={category}
              onChange={(e, data) => setCategory(data.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              type="date"
              label="Date"
              onChange={handleChangeDate}
            />
          </Form.Field>
          <Button loading={loading} onClick={handlSave}>
            <Icon name="save" />
            {buttonText}
          </Button>
          <Button onClick={(e) => backToViewPrevious(e)}>Back</Button>
          <ConfirmDeleteExpenseModal handleDelete={handleDelete} />
        </Form>
      </Segment>
    </Container>
  )
}
