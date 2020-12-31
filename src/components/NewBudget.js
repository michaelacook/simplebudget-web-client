import React, { useState } from "react"
import { useHistory } from "react-router-dom"
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
import Cookies from "js-cookie"
import Breadcrumb from "./Breadcrumb"
import ProTip from "./ProTip"

export default function NewBudget({ user, budgets, setBudgets, addBudget }) {
  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const history = useHistory()

  /**
   * Add a category to state from form values
   */
  const addCategory = () => {
    if (categoryName && categoryValue) {
      const category = {}
      category[categoryName] = categoryValue
      setCategories([...categories, category])
      setCategoryName("")
      setCategoryValue("")
    }
  }

  function doAddBudget() {
    if (title && description && categories.length > 0) {
      setLoading(true)
      const payload = {
        budget: {
          title,
          description,
          total: categories.reduce(
            (acc, curr) => acc + Number(Object.values(curr)[0]),
            0
          ),
          userId: user.id,
        },
        categories,
      }
      addBudget(payload)
        .then((response) => response.json())
        .then((data) => {
          setBudgets([...budgets, data])
          Cookies.set("budgets", JSON.stringify(data))
          setLoading(false)
          history.push(`/budgets/${data.id}`)
        })
    }
  }

  return (
    <Container>
      <Breadcrumb
        color="blue"
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Budgets", path: "/budgets/manage" },
          { name: "New", path: "/budgets/new" },
        ]}
      />

      <ProTip
        text="A budget should center on a theme (i.e, personal, side hustle, etc). You
        can specify as many item categories as you want. To delete a budget
        item, click it's button."
      />

      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        {error ? <Message color="red">{error}</Message> : null}
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
          <Button loading={loading} onClick={() => doAddBudget()} size="big">
            Done
          </Button>
        </Form>
      </Segment>
    </Container>
  )
}
