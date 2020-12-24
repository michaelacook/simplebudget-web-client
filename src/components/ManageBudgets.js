import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Container, Header, List, Segment } from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"
import ConfirmDeleteBudgetModal from "./modals/ConfirmDeleteBudgetModal"

export default ({ budgets, deleteBudget }) => {
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
          {budgets ? (
            budgets.map((budget) => (
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
