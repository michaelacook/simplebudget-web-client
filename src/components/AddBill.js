import React, { useState } from "react"
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default function AddBill({ user, addBill }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [due, setDue] = useState("")
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")
  const [error, setError] = useState("")

  function handleAddBill() {
    if (title && amount && due && user) {
      setLoading(true)
      addBill(user, {
        title,
        amount,
        due,
        userId: user.id,
      })
        .then(() => {
          setLoading(false)
          setButtonText("Saved!")
          setTitle("")
          setAmount("")
          setDue("")
        })
        .catch((error) => {
          setError(error)
        })
    }
  }

  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Manage Bills", path: "/bills" },
          { name: "New", path: "/bills/new" },
        ]}
      />
      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h1">Add Bill</Header>
        <Form>
          <Form.Field width="8">
            <Form.Input
              fluid
              placeholder="E.g. Phone Bill"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              placeholder="E.g. 58.25"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              type="Number"
              placeholder="Indicate day of the month"
              label="Due Date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </Form.Field>
          <Button loading={loading} onClick={handleAddBill}>
            <Icon name="save" />
            {buttonText}
          </Button>
        </Form>
      </Segment>
    </Container>
  )
}
