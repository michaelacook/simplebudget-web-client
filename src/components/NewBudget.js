import React, { useState } from "react"
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default () => {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  const [message, setMessage] = useState(true)

  /**
   * Add a category to state from form values
   */
  const addCategory = () => {
    const category = {}
    category[categoryName] = categoryValue
    setCategories([...categories, category])
    setCategoryName("")
    setCategoryValue("")
  }

  /**
   * Dismiss message
   */
  const handleDismiss = () => {
    setMessage(false)
  }

  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Budgets", path: "/budgets" },
          { name: "New", path: "/budgets/new" },
        ]}
      />

      {message ? (
        <Message onDismiss={handleDismiss} info className="mt-2">
          <Message.Header>
            <Icon name="idea" /> Pro Tip
          </Message.Header>
          <p>
            A budget should center on a theme (i.e, personal, side hustle, etc).
            You can specify as many item categories as you want. To delete a
            budget item, click it's button.
          </p>
        </Message>
      ) : null}

      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h2">Create Budget</Header>
        <Form className="mt-1" fluid>
          <Form.Field width={15}>
            <label>Title</label>
            <Form.Input
              placeholder="E.g My Personal Budget"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Input>
          </Form.Field>
          <Form.Field width={15}>
            <Form.TextArea
              label="Description"
              placeholder="E.g A budget to track my monthly bills and expenditures"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.TextArea>
          </Form.Field>
          <Divider hidden />
          <Header as="h3">Categories</Header>
          <Form.Group className="mt-1">
            <Form.Input
              value={categoryName}
              width={9}
              label="Category Name"
              placeholder="E.g Groceries"
              onChange={(e) => setCategoryName(e.target.value)}
            ></Form.Input>
            <Form.Input
              value={categoryValue}
              width={3}
              label="Amount"
              placeholder="E.g 340.50"
              onChange={(e) => setCategoryValue(e.target.value)}
            ></Form.Input>
          </Form.Group>
          <Button color="green" size="tiny" onClick={() => addCategory()}>
            <Icon name="plus" />
            Add
          </Button>
          <div className="mt-1">
            {categories.map((item, i) => (
              <Button
                key={i}
                size="tiny"
                icon
                labelPosition="right"
                style={{ marginBottom: "12px" }}
                onClick={() =>
                  setCategories(categories.filter((item, index) => i !== index))
                }
              >
                {Object.keys(item)[0]} ${Object.values(item)[0]}
                <Icon name="minus" color="red" />
              </Button>
            ))}
          </div>
          <Divider hidden />
          <Button loading={false} size="big">
            Done
          </Button>
        </Form>
      </Segment>
    </Container>
  )
}
