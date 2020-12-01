import React from "react"
import { Card, Container, Grid, Header, Button, Icon } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"

export default ({ user }) => {
  const history = useHistory()

  // redirect to login page if user is not authenticated
  if (!user) {
    history.push("/login")
  }

  return (
    <Container>
      <Header as="h2" style={{ marginTop: "25px" }}>
        Welcome, {user.firstName}
      </Header>
      {/* <Breadcrumb size="big" sections={["Home", "Dashboard"]} /> */}

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
            <Icon
              size="large"
              name="add"
              style={{ color: "mediumSeaGreen " }}
            />
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
            <Icon size="large" name="edit" style={{ color: "indianRed " }} />
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
            <Icon size="large" name="dollar" style={{ color: "darkOrange " }} />
            Record Expenditures
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/finances/manage"
            raised
            size="big"
          >
            <Icon
              size="large"
              name="chart pie"
              style={{ color: "darkOrchid " }}
            />
            Manage Finances
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/expenditures/current/statistics"
            raised
            size="big"
          >
            <Icon
              size="large"
              name="chart bar"
              style={{ color: "mediumAquaMarine " }}
            />
            View Statistics
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button
            className="dashboard-btn"
            fluid
            as={Link}
            to="/expeditures/current"
            raised
            size="big"
          >
            <Icon size="large" name="money" style={{ color: "dodgerBlue " }} />
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
            <Icon size="large" name="setting" style={{ color: "salmon " }} />
            App Settings
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
