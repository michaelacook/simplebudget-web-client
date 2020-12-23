import React, { Fragment } from "react"
import { Container, Divider, Header, Table } from "semantic-ui-react"

export default ({ user }) => {
  return (
    <Fragment>
      <Container>
        <Table basic="very" className="mt-1">
          <Table.Body>
            <Table.Row>
              <Table.Cell className="bold">Net Salary</Table.Cell>
              <Table.Cell>{user.netSalary}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Net Monthly Income</Table.Cell>
              <Table.Cell>{user.netMonthlyIncome}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Divider />
        <Header as="h4">Bills</Header>
        {user.bills ? (
          <Table basic="very"></Table>
        ) : (
          <p>You currently have no bills.</p>
        )}
      </Container>
    </Fragment>
  )
}
