import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import {
  Button,
  Container,
  Form,
  Header,
  Message,
  Pagination,
  Segment,
  Table,
  Popup,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default function ViewSpending({ getExpenditures, user, budgets }) {
  const history = useHistory()
  const state = history.location.state
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
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [budget, setBudget] = useState("")
  const [expenditures, setExpenditures] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [dateText, setDateText] = useState(
    `${month ? months[month] : ""} ${day ? day : ""} ${year}`
  )
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const accountCreated = Number(user.createdAt.split("-")[0])
  const currentYear = new Date().getFullYear()
  const yearSelectOptions = Array.from(
    new Array(currentYear - accountCreated + 1)
  )
    .map((_, i) => ({
      key: i,
      value: accountCreated + i,
      text: accountCreated + i,
    }))
    .reverse()
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
    text: "Any",
    value: "any",
  })
  const monthSelectOptions = Array.from(new Array(12)).map((_, i) => ({
    key: i + 1,
    value: i + 1,
    text: months[i + 1],
  }))
  monthSelectOptions.unshift({
    key: "placeholder",
    text: "Any",
    value: "any",
  })
  const budgetsSelectOptions = budgets.map((budget) => ({
    key: budget.id,
    value: budget.id,
    text: budget.title,
  }))
  budgetsSelectOptions.unshift({
    key: "placeholder",
    text: "Any",
    value: "any",
  })

  // if history.location.state is not undefined set state to incoming state
  useEffect(() => {
    if (state) {
      getExpenditures(
        state.year,
        state.month ? state.month : null,
        state.day ? state.day : null,
        state.budget.id ? state.budget.id : null
      )
        .then((result) => {
          if (!result.length) {
            return setError(
              "There are no results for the selected filter options."
            )
          }
          const pages = chunkArray(result, 10)
          setExpenditures(pages)
          setNumberOfPages(pages.length)
        })
        .finally(() => setLoading(false))
        .catch((error) => setError(error.message))
    }
  }, [])

  function chunkArray(array, size) {
    if (array.length <= size) {
      return [array]
    }
    let result = []
    for (let value of array) {
      let lastArray = result[result.length - 1]
      if (!lastArray || lastArray.length === size) {
        result.push([value])
      } else {
        lastArray.push(value)
      }
    }
    return result
  }

  function handleGetExpenditures() {
    setExpenditures([])
    setError("")
    if (!year) {
      return setError("Please select a year.")
    }
    if (!month && day) {
      return setError("Please select a month.")
    }
    setDateText(`${month ? months[month] : ""} ${day ? day : ""} ${year}`)
    setCurrentPage(1)
    setLoading(true)
    getExpenditures(
      year,
      month ? month : null,
      day ? day : null,
      budget.id ? budget.id : null
    )
      .then((result) => {
        if (!result.length) {
          return setError(
            "There are no results for the selected filter options."
          )
        }
        const pages = chunkArray(result, 10)
        setExpenditures(pages)
        setNumberOfPages(pages.length)
      })
      .finally(() => setLoading(false))
      .catch((error) => setError(error.message))
  }

  /**
   * Send current view state when redirecting to edit expenditure
   * Allows state to be passed back to persist current selections
   * @param {Object} e - synthetic DOM event
   * @param {Number} expenditureId - PK for expenditure
   */
  function exportStateToEditExpenditure(e, expenditureId) {
    e.preventDefault()
    history.push({
      pathname: `/expenditures/${expenditureId}`,
      state: {
        currentPage,
        budget,
        year,
        month,
        day,
      },
    })
  }

  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "View Spending", path: "/expenditures/new" },
        ]}
      />

      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h1">Spending for {dateText}</Header>
        <Form className="mt-2">
          <Form.Group widths="equal">
            <Form.Select
              fluid
              options={budgetsSelectOptions}
              placeholder="Budgets"
              onChange={(e, data) =>
                setBudget(
                  data.value === "any"
                    ? ""
                    : budgets.find((budget) => budget.id === data.value)
                )
              }
            />
            <Form.Select
              fluid
              placeholder="Year"
              options={yearSelectOptions}
              onChange={(e, data) => setYear(data.value)}
            />
            <Form.Select
              fluid
              placeholder="Month"
              options={monthSelectOptions}
              onChange={(e, data) =>
                setMonth(data.value === "any" ? "" : data.value)
              }
            />
            <Form.Select
              fluid
              placeholder="Day"
              options={daySelectOptions}
              onChange={(e, data) =>
                setDay(data.value === "any" ? "" : data.value)
              }
            />
            <Form.Field fluid>
              <Button
                onClick={handleGetExpenditures}
                loading={loading}
                style={{ padding: "12.2px 15px" }}
              >
                Go
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
        {expenditures.length ? (
          <Table celled selectable stackable striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Budget</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Month</Table.HeaderCell>
                <Table.HeaderCell>Day</Table.HeaderCell>
                <Table.HeaderCell>Year</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {expenditures[currentPage - 1].map((expenditure) => (
                <Table.Row key={expenditure.id}>
                  <Table.Cell>{expenditure.Budget.title}</Table.Cell>
                  <Table.Cell>{expenditure.Category.title}</Table.Cell>
                  <Popup
                    content="Click to edit expenditure"
                    trigger={
                      <Table.Cell
                        selectable
                        onClick={(e) =>
                          exportStateToEditExpenditure(e, expenditure.id)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        ${expenditure.amount.toFixed(2)}
                      </Table.Cell>
                    }
                  />
                  <Table.Cell>{months[expenditure.month]}</Table.Cell>
                  <Table.Cell>{expenditure.day}</Table.Cell>
                  <Table.Cell>{expenditure.year}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            {numberOfPages > 1 ? (
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="6">
                    <Pagination
                      onPageChange={(e, data) =>
                        setCurrentPage(data.activePage)
                      }
                      boundaryRange={0}
                      defaultActivePage={1}
                      ellipsisItem={null}
                      firstItem={null}
                      lastItem={null}
                      siblingRange={1}
                      totalPages={numberOfPages}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            ) : null}
          </Table>
        ) : null}
        {error ? (
          <Message compact className="mt-1" color="yellow">
            {error}
          </Message>
        ) : null}
      </Segment>
    </Container>
  )
}
