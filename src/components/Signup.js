import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Grid,
  Message,
} from "semantic-ui-react"

export default function SignUp() {
  const params = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    netMonthlyIncome: false,
    netMonthlyIncome: false,
  }
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [netSalary, setNetSalary] = useState("")
  const [netMonthlyIncome, setNetMonthlyIncome] = useState("")
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState(params)
  const [loading, setLoading] = useState(false)
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(useLocation().search)
  )
  const history = useHistory()

  async function doSignUp() {
    setLoading(true)
    if (
      firstName &&
      email &&
      password &&
      confirmPassword &&
      netSalary &&
      netMonthlyIncome
    ) {
      const response = await fetch("http://localhost:5000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          netSalary,
          netMonthlyIncome,
        }),
      })
      if (response.status !== 201) {
        if (response.status === 500) {
          setError(
            "Something went wrong. Check your internet connection or try again."
          )
        } else if (response.status === 401) {
          setError("Your username or password is incorrect.")
        } else if (response.status === 400) {
          await response.json().then((errors) => {
            const messages = params
            errors.errors.forEach(
              (error) => (messages[error.param] = error.msg)
            )
            setValidationErrors(messages)
          })
        }
        return setLoading(false)
      }
      history.push("/login?newsignup=true")
    }
  }

  return (
    <Grid stretched relaxed fluid="true" stackable className="mt-3">
      <Container>
        {queryParams.get("delete_account") ? (
          <Message color="blue">
            We're sorry to see you go! Make a new account any time to manage
            your spending.
          </Message>
        ) : null}
        {error ? <Message color="red">{error}</Message> : null}
        <Header as="h1">Sign Up</Header>
        <Grid.Column className="mt-2">
          <Form>
            <Form.Group widths="equal">
              <Form.Field error={validationErrors.firstName}>
                <label>First Name</label>
                <input
                  fluid="true"
                  placeholder="First Name"
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
                onChange={(e) => setEmail(e.target.value)}
              />
              {validationErrors.email ? (
                <Message color="red">{validationErrors.email}</Message>
              ) : null}
            </Form.Field>
            <Form.Field
              error={
                validationErrors.password || validationErrors.confirmPassword
              }
            >
              <label>Password</label>
              <input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              {validationErrors.password ? (
                <Message color="red">{validationErrors.password}</Message>
              ) : null}
            </Form.Field>

            <Form.Field error={validationErrors.confirmPassword}>
              <label>Confirm Password</label>
              <input
                placeholder="confirm password"
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
              <Button primary loading={loading} onClick={doSignUp}>
                Signup
              </Button>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Container>
    </Grid>
  )
}
