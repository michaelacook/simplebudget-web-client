import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react"
import Cookies from "js-cookie"
import Breadcrumb from "../components/Breadcrumb"

export default function EditBill({
  user,
  bills,
  updateBill,
  setBills,
  getBill,
}) {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [due, setDue] = useState("")
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")
  const [error, setError] = useState("")

  useEffect(() => {
    getBill(id, user)
      .then((response) => response.json())
      .then((bill) => {
        setTitle(bill.title)
        setAmount(bill.amount)
        setDue(bill.due)
      })
      .catch((error) => setError(error))
  }, [])

  function handleSaveBill() {
    setLoading(true)
    updateBill(user, id, {
      title,
      amount,
      due,
    })
      .then((response) => response.json())
      .then((bill) => {
        setBills([...bills.filter((el) => el.id !== bill.id), bill])
        Cookies.set("bills", JSON.stringify(bills))
        setTitle(bill.title)
        setAmount(bill.amount)
        setDue(bill.due)
        setButtonText("Saved!")
        setLoading(false)
      })
      .catch((error) => setError(error))
  }

  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Manage Bills", path: "/bills" },
          { name: "Edit", path: `/bills/${id}` },
        ]}
      />

      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h1">Edit Bill</Header>
        <Form>
          <Form.Field width="8">
            <Form.Input
              fluid
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Field>
          <Form.Field width="8">
            <Form.Input
              fluid
              type="Number"
              label="Due Date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </Form.Field>
          <Button loading={loading} onClick={handleSaveBill}>
            <Icon name="save" />
            {buttonText}
          </Button>
        </Form>
      </Segment>
    </Container>
  )
}
