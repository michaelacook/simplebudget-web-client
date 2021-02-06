import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Container,
  Dimmer,
  Header,
  List,
  Loader,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "../components/Breadcrumb"

export default function BudgetView() {
  const [budget, setBudget] = useState("")
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/budget/${id}`)
      .then((response) => response.json())
      .then((data) => setBudget(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Dimmer active>
        <Loader content="Loading..." />
      </Dimmer>
    )
  }

  if (budget) {
    return (
      <Container>
        <Breadcrumb
          sections={[
            { name: "Dashboard", path: "/" },
            { name: "Budgets", path: "/budgets/manage" },
            { name: budget.title, path: `/budgets/${id}` },
          ]}
        />
        <Segment raised className="mt-2" style={{ padding: "35px" }}>
          <Header as="h1">{budget.title}</Header>
          <p>{budget.description}</p>
          <List divided size="huge">
            {budget.Categories.map((category) => (
              <List.Item key={category.id}>
                <List.Content floated="right">{category.amount}</List.Content>
                <List.Content>{category.title}</List.Content>
              </List.Item>
            ))}
            <List.Item key="last" style={{ fontWeight: "bold" }}>
              <List.Content floated="right">
                ${budget.total.toFixed(2)}
              </List.Content>
              <List.Content>Total</List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
    )
  }
}
