import React, { Fragment } from "react"
import { Container, Divider, Header, Table, List } from "semantic-ui-react"

export default ({ user, bills }) => {
  return (
    <Fragment>
      <Container>
        <Header as="h3" className="mt-2">
          Income
        </Header>
        <Table basic="very" className="mt-1">
          <Table.Body>
            <Table.Row>
              <Table.Cell className="bold">Net Salary</Table.Cell>
              <Table.Cell>${user.netSalary.toFixed(2)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="bold">Net Monthly Income</Table.Cell>
              <Table.Cell>${user.netMonthlyIncome.toFixed(2)}</Table.Cell>
            </Table.Row>
            {bills ? (
              <React.Fragment>
                <Divider hidden />
                <Header as="h3" className={bills.length ? "mb-2" : null}>
                  Bills
                </Header>
                {bills.map((bill) => (
                  <Table.Row>
                    <Table.Cell className="bold">{bill.title}</Table.Cell>
                    <Table.Cell>
                      ${bill.amount.toFixed(2)} due monthly on {bill.due}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </React.Fragment>
            ) : null}
          </Table.Body>
        </Table>
        {!bills.length ? <p>You have not added any bills yet.</p> : null}
      </Container>
    </Fragment>
  )
}
