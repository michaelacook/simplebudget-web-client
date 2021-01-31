import React, { useState, useEffect } from "react"
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
import Breadcrumb from "./Breadcrumb"

export default function EditAccount({ user }) {
  console.log(user)
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
              <Button loading={loading}>
                <Icon name="save" />
                Save
              </Button>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Container>
    </Grid>
  )
}
