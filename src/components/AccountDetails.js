/*
On page refresh, props becomes null. this has to be fixed.
*/

import React, { Fragment } from "react"
import ConfirmDeleteAccountModal from "./modals/ConfirmDeleteAccountModal"
import {
  Button,
  Confirm,
  Container,
  Divider,
  Grid,
  Icon,
  Segment,
  Table,
} from "semantic-ui-react"

export default ({
  user: { firstName, lastName, email, createdAt, updatedAt },
}) => {
  return (
    <Fragment>
      <Container>
        <Table basic="very" className="mt-1">
          <Table.Body>
            <Table.Row>
              <Table.Cell className="bold">First name</Table.Cell>
              <Table.Cell>{firstName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Last name</Table.Cell>
              <Table.Cell>{lastName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Email</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Account Created</Table.Cell>
              <Table.Cell>{new Date(createdAt).toDateString()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Last Updated</Table.Cell>
              <Table.Cell>{new Date(updatedAt).toDateString()}</Table.Cell>
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
