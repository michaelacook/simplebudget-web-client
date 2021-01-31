import React, { useState } from "react"
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Message,
} from "semantic-ui-react"
import Cookies from "js-cookie"
import Breadcrumb from "./Breadcrumb"

export default function EditAccount({ user, setUser, updateUser }) {
  const params = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    netMonthlyIncome: false,
  }
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [netSalary, setNetSalary] = useState(user.netSalary)
  const [netMonthlyIncome, setNetMonthlyIncome] = useState(
    user.netMonthlyIncome
  )
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState(params)
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")

  async function doUpdateUser() {
    setLoading(true)
    setValidationErrors({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
      netMonthlyIncome: false,
    })
    const payload = {
      firstName,
      lastName,
      email,
      netSalary,
      netMonthlyIncome,
    }
    payload["password"] = password || user.rawPass
    payload["confirmPassword"] = confirmPassword || user.rawPass
    const response = await updateUser(user.id, payload, user)
    if (response.status !== 200) {
      if (response.status === 500) {
        setError(
          "Something went wrong. Check your internet connection and try again."
        )
      } else if (response.status === 401) {
        setError(
          "Authentication Error. Your username or password is not correct."
        )
      } else if (response.status === 400) {
        await response.json().then((errors) => {
          const messages = params
          errors.errors.forEach((error) => (messages[error.param] = error.msg))
          setValidationErrors(messages)
          setLoading(false)
          setButtonText("Save")
        })
      }
    } else {
      await response
        .json()
        .then((data) => {
          data.rawPass = password || user.rawPass
          Cookies.set("user", JSON.stringify(data))
          setUser(data)
        })
        .finally(() => {
          setLoading(false)
          setButtonText("Saved!")
        })
    }
  }

  return (
    <Grid stretched relaxed fluid="true" stackable>
      <Container>
        <Breadcrumb
          color="blue"
          sections={[
            { name: "Dashboard", path: "/" },
            { name: "Account", path: "/account" },
            { name: "Edit", path: "/account/edit" },
          ]}
        />
        {error ? <Message color="red">{error}</Message> : null}
        <Header as="h1">Edit Account</Header>
        <Grid.Column className="mt-2">
          <Form>
            <Form.Group widths="equal">
              <Form.Field error={validationErrors.firstName}>
                <label>First Name</label>
                <input
                  fluid="true"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {validationErrors.firstName ? (
                  <Message color="red">{validationErrors.firstName}</Message>
                ) : null}
              </Form.Field>
              <Form.Field error={validationErrors.lastName}>
                <label>Last Name</label>
                <input
                  fluid="true"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {validationErrors.lastName ? (
                  <Message color="red">{validationErrors.lastName}</Message>
                ) : null}
              </Form.Field>
            </Form.Group>
            <Form.Field error={validationErrors.email}>
              <label>Email</label>
              <input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {validationErrors.email ? (
                <Message color="red">{validationErrors.email}</Message>
              ) : null}
            </Form.Field>
            <Form.Field
              error={
                validationErrors.oldPassword || validationErrors.newPassword
              }
            >
              <label>New Password</label>
              <input
                placeholder="new password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              {validationErrors.password ? (
                <Message color="red">{validationErrors.password}</Message>
              ) : null}
            </Form.Field>

            <Form.Field error={validationErrors.confirmPassword}>
              <label>Confirm New Password</label>
              <input
                placeholder="confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
              {validationErrors.confirmPassword ? (
                <Message color="red">
                  {validationErrors.confirmPassword}
                </Message>
              ) : null}
            </Form.Field>
            <Divider section />
            <Header as="h3">Financial Info</Header>
            <Form.Group widths="equal">
              <Form.Field width={4} error={validationErrors.netSalary}>
                <label>Net Salary</label>
                <input
                  onChange={(e) => setNetSalary(e.target.value)}
                  value={netSalary}
                  placeholder="Net salary"
                  type="number"
                />
                {validationErrors.netSalary ? (
                  <Message color="red">{validationErrors.netSalary}</Message>
                ) : null}
              </Form.Field>
              <Form.Field width={4} error={validationErrors.netMonthlyIncome}>
                <label>Net Monthly Income</label>
                <input
                  onChange={(e) => setNetMonthlyIncome(e.target.value)}
                  value={netMonthlyIncome}
                  placeholder="Net monthly income"
                  type="number"
                />
                {validationErrors.netMonthlyIncome ? (
                  <Message color="red">
                    {validationErrors.netMonthlyIncome}
                  </Message>
                ) : null}
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <Button onClick={doUpdateUser} loading={loading}>
                <Icon name="save" />
                {buttonText}
              </Button>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Container>
    </Grid>
  )
}
