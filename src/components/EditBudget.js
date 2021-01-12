import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react"
import Breadcrumb from "./Breadcrumb"

export default function EditBudget({
  user,
  budgets,
  setBudgets,
  getBudget,
  addNewCategory,
  deleteCategory,
  updateBudget,
}) {
  const [budget, setBudget] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [editedCategories, setEditedCategories] = useState([])
  const [newCategories, setNewCategories] = useState([])
  const [categoriesToDelete, setCategoriesToDelete] = useState([])
  const [newCategoryTitle, setNewCategoryTitle] = useState("")
  const [newCategoryAmount, setNewCategoryAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    getBudget(id)
      .then((response) => response.json())
      .then((data) => {
        setBudget(data)
        setTitle(data.title)
        setDescription(data.description)
        setTotal(Number(data.total))
        setCategories(data.Categories)
        setEditedCategories(data.Categories)
      })
      .catch((error) => setError(error))
    setLoading(false)
  }, [])

  /**
   * Add any new categories
   * Delete any categories slated for delete
   * Update budget properties
   */
  function handleSave() {
    if (newCategories.length) {
      for (let item of newCategories) {
        addNewCategory(item)
          .then((response) => response.json())
          .then((data) => console.log(data))
      }
    }
    if (categoriesToDelete.length) {
      categoriesToDelete.forEach(async (id) => {
        await deleteCategory(id)
      })
    }
    const budgetTotal =
      newCategories.reduce(
        (acc, curr) => acc + Number(Object.values(curr)[1]),
        0
      ) + Number(total)
    const payload = {
      budget: {
        title,
        description,
        total: budgetTotal,
        userId: user.id,
      },
      categories: editedCategories,
    }
    updateBudget(budget.id, payload)
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  function changeCategoryTitle(id, title) {
    setError("")
    const category = editedCategories.find((cat) => cat.id === id)
    const itemIndex = editedCategories.indexOf(category)
    category.title = title
    const newEditedCategoriesState = [...editedCategories]
    newEditedCategoriesState[itemIndex] = category
    setEditedCategories(newEditedCategoriesState)
  }

  function changeCategoryAmount(id, amount) {
    setError("")
    const category = editedCategories.find((cat) => cat.id === id)
    const itemIndex = editedCategories.indexOf(category)
    category.amount = Number(amount)
    const newEditedCategoriesState = [...editedCategories]
    newEditedCategoriesState[itemIndex] = category
    setEditedCategories(newEditedCategoriesState)
  }

  function addCategory() {
    if (newCategoryTitle && newCategoryAmount) {
      const newState = [...newCategories]
      newState.push({
        title: newCategoryTitle,
        amount: newCategoryAmount,
        budgetId: budget.id,
      })
      setNewCategories(newState)
      setNewCategoryTitle("")
      setNewCategoryAmount("")
    }
  }

  function removeCategory(id) {
    setError("")
    if (categories.length === 1) {
      setError("Your budget must have at least one category.")
      return
    }
    const category = categories.find((cat) => cat.id === id)
    const newCategoriesState = [...categories]
    const itemIndex = categories.indexOf(category)
    newCategoriesState.splice(itemIndex, 1)
    setCategories(newCategoriesState)
    const newDeleteCategoryState = [...categoriesToDelete]
    newDeleteCategoryState.push(category.id)
    setCategoriesToDelete(newDeleteCategoryState)
  }

  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Budgets", path: "/budgets/manage" },
          { name: "Manage", path: `/budgets/manage/${id}` },
        ]}
      />
      <Grid columns={1}>
        <Grid.Column>
          <Segment
            raised
            className="mt-1"
            style={{ padding: "35px", marginBottom: "100px" }}
          >
            <Header as="h2">Edit Budget</Header>
            {error ? (
              <Message color="red" className="mt-1">
                {error}
              </Message>
            ) : null}
            {budget ? (
              <React.Fragment>
                <Form className="mt-2">
                  <Form.Input
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Form.TextArea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.TextArea>
                  <Header as="h4">Categories</Header>
                  {categories
                    ? categories.map((category) => (
                        <Form.Group widths="equal" key={category.id}>
                          <Form.Input
                            placeholder={category.title}
                            onChange={(e) =>
                              changeCategoryTitle(category.id, e.target.value)
                            }
                          />
                          <Form.Input
                            value={category.amount}
                            onChange={(e) =>
                              changeCategoryAmount(category.id, e.target.value)
                            }
                          />
                          <Button
                            onClick={() => removeCategory(category.id)}
                            color="red"
                            icon="trash"
                          ></Button>
                        </Form.Group>
                      ))
                    : null}
                  <Header as="h4">New Category</Header>
                  <Form.Group widths="equal">
                    <Form.Input
                      placeholder="Title"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                    />
                    <Form.Input
                      placeholder="Amount"
                      value={newCategoryAmount}
                      onChange={(e) => setNewCategoryAmount(e.target.value)}
                    />
                    <Button icon="plus" onClick={addCategory} />
                  </Form.Group>
                </Form>
                <div className="mt-1">
                  {newCategories.map((item, i) => (
                    <Button
                      key={i}
                      size="tiny"
                      icon
                      labelPosition="right"
                      style={{ marginBottom: "12px" }}
                      onClick={() =>
                        setNewCategories(
                          newCategories.filter((item, index) => i !== index)
                        )
                      }
                    >
                      {item.title} ${item.amount}
                      <Icon name="minus" color="red" />
                    </Button>
                  ))}
                </div>
                <Button onClick={handleSave} className="mt-1" loading={loading}>
                  <Icon name="save" />
                  Save
                </Button>
                <Button color="red" icon="trash"></Button>
              </React.Fragment>
            ) : null}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
