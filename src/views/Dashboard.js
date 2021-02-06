import React from "react"
import { Container, Grid, Header, Button, Icon } from "semantic-ui-react"
import { Link, useHistory } from "react-router-dom"
import Reminder from "../components/Reminder"

export default ({ user }) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()

  return (
    <Container>
      <Header as="h2" style={{ marginTop: "25px" }}>
        {user ? `Welcome, ${user.firstName}` : null}
      </Header>
      <Grid padded stackable style={{ marginTop: "50px" }}>
        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/budgets/new"
            raised
            size="big"
          >
            <Icon name="add" style={{ color: "mediumSeaGreen " }} />
            Create New Budget
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/budgets/manage"
            raised
            size="big"
          >
            <Icon name="edit" style={{ color: "indianRed " }} />
            Manage Budgets
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/expenditures/new"
            raised
            size="big"
          >
            <Icon name="dollar" style={{ color: "darkOrange " }} />
            Record Expenditures
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/bills"
            raised
            size="big"
          >
            <Icon name="chart pie" style={{ color: "darkOrchid " }} />
            Manage Bills
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/bills/new"
            raised
            size="big"
          >
            <Icon name="add" style={{ color: "mediumSeaGreen " }} />
            Record Bills
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/statistics"
            raised
            size="big"
          >
            <Icon name="chart bar" style={{ color: "mediumAquaMarine " }} />
            View Statistics
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/expenditures/view"
            raised
            size="big"
          >
            <Icon name="money" style={{ color: "dodgerBlue " }} />
            View Spending
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/settings"
            raised
            size="big"
          >
            <Icon name="setting" style={{ color: "salmon " }} />
            App Settings
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
