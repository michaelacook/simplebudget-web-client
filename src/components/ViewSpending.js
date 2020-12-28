import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  Button,
  Container,
  Form,
  Header,
  Sidebar,
  Table,
} from "semantic-ui-react"

export default function ViewSpending({ getExpenditures, user, budgets }) {
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  }
  const [budget, setBudget] = useState(budgets[0])
  const [expenditures, setExpenditures] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [day, setDay] = useState("")
  const [dateText, setDateText] = useState(
    `${month ? months[month] : ""} ${day ? day : ""} ${year}`
  )
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const accountCreated = Number(user.createdAt.split("-")[0])
  const currentYear = new Date().getFullYear()
  const yearSelectOptions = Array.from(
    new Array(currentYear - accountCreated + 1)
  ).map((_, i) => ({
    key: i,
    value: accountCreated + i,
    text: accountCreated + i,
  }))
  yearSelectOptions.unshift({
    key: "placeholder",
    text: "Select One",
    value: "",
  })
  const daySelectOptions = Array.from(new Array(31)).map((_, i) => ({
    key: i + 1,
    value: i + 1,
    text: i + 1,
  }))
  daySelectOptions.unshift({
    key: "placeholder",
    text: "Select One",
    value: "",
  })
  const monthSelectOptions = Array.from(new Array(12)).map((_, i) => ({
    key: i + 1,
    value: i + 1,
    text: months[i + 1],
  }))
  monthSelectOptions.unshift({
    key: "placeholder",
    text: "Select One",
    value: "",
  })
  const budgetsSelectOptions = budgets.map((budget) => ({
    key: budget.id,
    value: budget.id,
    text: budget.title,
  }))

  function handleGetExpenditures() {
    setDateText(`${month ? months[month] : ""} ${day ? day : ""} ${year}`)
    setLoading(true)
    getExpenditures(
      year,
      month ? month : null,
      day ? day : null,
      budget.id ? budget.id : null
    )
      .then((result) => {
        setExpenditures(result)
      })
      .finally(() => setLoading(false))
      .catch((error) => setError(error))
  }

  function handleChangeBudget(data) {
    const budget = budgets.find((budget) => budget.id === data.value)
    setBudget(budget)
  }

  useEffect(() => {
    handleGetExpenditures()
  }, [])

  return (
    <Container>
      <Header as="h1" className="mt-3">
        Spending for {dateText}
      </Header>

      <Form>
        <Form.Group widths="equal">
          <Form.Select
            // width={9}
            options={budgetsSelectOptions}
            placeholder="Budgets"
            onChange={(e, data) => handleChangeBudget(data)}
          />
          <Form.Select
            placeholder="Year"
            options={yearSelectOptions}
            // width={4}
            onChange={(e, data) => setYear(data.value)}
          />
          <Form.Select
            placeholder="Month"
            options={monthSelectOptions}
            // width={4}
            onChange={(e, data) => setMonth(data.value)}
          />
          <Form.Select
            placeholder="Day"
            options={daySelectOptions}
            // width={4}
            onChange={(e, data) => setDay(data.value)}
          />
        </Form.Group>
        <Button onClick={handleGetExpenditures} loading={loading}>
          Go
        </Button>
      </Form>

      {expenditures.length ? (
        <Table celled stackable selectable striped className="mt-2">
          <Table.Header>
            <Table.HeaderCell>Budget</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Month</Table.HeaderCell>
            <Table.HeaderCell>Day</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {expenditures.map((expenditure) => (
              <Table.Row>
                <Table.Cell>{expenditure.Budget.title}</Table.Cell>
                <Table.Cell>{expenditure.Category.title}</Table.Cell>
                <Table.Cell>{expenditure.amount}</Table.Cell>
                <Table.Cell>{months[expenditure.month]}</Table.Cell>
                <Table.Cell>{expenditure.day}</Table.Cell>
                <Table.Cell>{expenditure.year}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>There are no expenditures for the selected month, day or year.</p>
      )}
    </Container>
  )
}
