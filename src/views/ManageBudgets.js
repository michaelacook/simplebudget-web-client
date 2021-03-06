import React from "react"
import { Link } from "react-router-dom"
import { Button, Container, Header, List, Segment } from "semantic-ui-react"
import Breadcrumb from "../components/Breadcrumb"
import ConfirmDeleteBudgetModal from "../modals/ConfirmDeleteBudgetModal"

export default function ManageBudgets({ budgets, deleteBudget }) {
  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Manage", path: "/budgets/manage" },
        ]}
      />
      <Segment raised="true" className="mt-2" style={{ padding: "35px" }}>
        <Header as="h2">Manage Budgets</Header>
        <List divided relaxed className="mt-2">
          {budgets ? (
            budgets.map((budget) => (
              <List.Item key={budget.id} style={{ marginBottom: "12px" }}>
                <List.Content>
                  <List.Content floated="right">
                    <Button
                      as={Link}
                      to={`/budgets/manage/${budget.id}/`}
                      icon="edit"
                      fd
                    />
                    <ConfirmDeleteBudgetModal
                      deleteBudget={deleteBudget}
                      budgetId={budget.id}
                    />
                  </List.Content>
                  <List.Header as={Link} to={`/budgets/${budget.id}`}>
                    {budget.title}
                  </List.Header>
                  <List.Description>{budget.description}</List.Description>
                </List.Content>
              </List.Item>
            ))
          ) : (
            <React.Fragment>
              <Header as="h5">You have not yet created any budgets.</Header>
              <Button as={Link} to="/budgets/new">
                Create New Budget
              </Button>
            </React.Fragment>
          )}
        </List>
      </Segment>
    </Container>
  )
}
