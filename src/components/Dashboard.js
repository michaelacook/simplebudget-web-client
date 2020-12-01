import React from "react"
import { Card, Container, Grid, Header, Button, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default ({ user }) => {
  return (
    <Container>
      <Header as="h2" style={{ marginTop: "25px" }}>
        Welcome, Michael
      </Header>

      <Grid padded style={{ marginTop: "50px" }}>
        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon size="large" name="add" style={{ color: "green " }} />
            Create New Budget
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon size="large" name="edit" style={{ color: "purple " }} />
            Manage Budgets
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon size="large" name="dollar" style={{ color: "orange " }} />
            Record Expenditures
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon size="large" name="chart pie" style={{ color: "teal " }} />
            Manage Finances
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon size="large" name="chart bar" style={{ color: "red " }} />
            View Statistics
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon
              size="large"
              name="chart bar"
              style={{ color: "dodgerBlue " }}
            />
            View Spending
          </Button>
        </Grid.Column>

        <Grid.Column width={5}>
          <Button fluid as={Link} raised size="huge">
            <Icon size="large" name="setting" style={{ color: "salmon " }} />
            App Settings
          </Button>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
