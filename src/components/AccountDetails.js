import React, { Fragment } from "react"
import ConfirmDeleteAccountModal from "./modals/ConfirmDeleteAccountModal"
import {
  Button,
  Confirm,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Table,
} from "semantic-ui-react"

export default ({ firstName, lastName, email, password }) => {
  return (
    <Fragment>
      <Container className="mt-1">
        <Table basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell className="bold">First name</Table.Cell>
              <Table.Cell>Michael</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Last name</Table.Cell>
              <Table.Cell>Cook</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Email</Table.Cell>
              <Table.Cell>mcook0775@gmail.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Account Created</Table.Cell>
              <Table.Cell>11/29/2020</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button size="medium" color="teal">
          <Icon name="edit" />
          Edit
        </Button>
        <Divider className="mt-2" />
        <Segment className="mt-4">
          <Grid>
            <Grid.Row>
              <Grid.Column width={12} floated="left">
                <span>
                  Don't want to manage your money anymore? You can delete at any
                  time, but be warned: this action is permanent.
                </span>
              </Grid.Column>

              <Grid.Column width={4}>
                <ConfirmDeleteAccountModal />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </Fragment>
  )
}
