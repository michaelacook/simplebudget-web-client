import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Container,
  Header,
  Icon,
  List,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"
import ConfirmDeleteBudgetModal from "./modals/ConfirmDeleteBudgetModal"

export default () => {
  const [budgets, setBudget] = useState([
    {
      title: "My Personal Budget",
      description: "My personal budget for monthly expenses.",
      id: 1,
    },
    { title: "Side Hustle", description: "For my freelance business.", id: 2 },
  ])
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
        <Header as="h2">Manage Budgets</Header>
        <List divided relaxed className="mt-2">
          {budgets.map((budget) => (
            <List.Item style={{ marginBottom: "12px" }}>
              <List.Content>
                <List.Content floated="right">
                  <Button
                    as={Link}
                    to={`/budgets/manage/${budget.id}/`}
                    compact
                    icon="edit"
                    color="green"
                  />
                  <ConfirmDeleteBudgetModal />
                </List.Content>
                <List.Header>{budget.title}</List.Header>
                <List.Description>{budget.description}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  )
}
