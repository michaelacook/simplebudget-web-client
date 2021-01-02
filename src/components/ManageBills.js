import React from "react"
import { Button, Container, Header, List, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom"
import Breadcrumb from "./Breadcrumb"
import ConfirmDeleteBillModal from "./modals/ConfirmDeleteBillModal"

export default function ManageBills({ bills, deleteBill }) {
  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Manage Bills", path: "/bills" },
        ]}
      />
      <Segment raised className="mt-1" style={{ padding: "35px" }}>
        <Header as="h1">Manage Bills</Header>
        <List divided relaxed classname="mt-2">
          {bills ? (
            bills.map((bill) => (
              <List.Item style={{ marginBottom: "12px" }}>
                <List.Content>
                  <List.Content floated="right">
                    <Button
                      as={Link}
                      to={`/bills/manage/${bill.id}/`}
                      compact
                      icon="edit"
                      color="green"
                    />
                    <ConfirmDeleteBillModal
                      deleteBill={deleteBill}
                      billId={bill.id}
                    />
                  </List.Content>
                  <List.Header>{bill.title}</List.Header>$
                  {bill.amount.toFixed(2)}
                  <div>Due monthly on the {bill.due}</div>
                </List.Content>
              </List.Item>
            ))
          ) : (
            <React.Fragment>
              <Header as="h5">You haven't added any bills yet.</Header>
              <Button as={Link} to="/bills/new">
                Add Bill
              </Button>
            </React.Fragment>
          )}
        </List>
      </Segment>
    </Container>
  )
}
