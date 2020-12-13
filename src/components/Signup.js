import React, { useState } from "react"
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
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [loading, setLoading] = useState(false)

  function doSignUp() {
    setLoading(true)
    if (firstName && username && password && confirmPassword) {
      if (password !== confirmPassword) {
        return setPasswordError(true)
      } else {
        // sign up user and log them in
      }
    }
  }

  return (
    <Grid stretched relaxed fluid stackable className="mt-3">
      <Container>
        <Header as="h1">Sign Up</Header>
        <Grid.Column className="mt-2">
          <Form>
            <Form.Group widths="equal">
              <Form.Field error={firstNameError}>
                <label>First Name</label>
                <input
                  fluid
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {firstNameError ? (
                  <Message color="red">
                    Please provide a valid first name.
                  </Message>
                ) : null}
              </Form.Field>
              <Form.Field error={lastNameError}>
                <label>Last Name</label>
                <input
                  fluid
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                {lastNameError ? (
                  <Message color="red">
                    Please provide a valid last name.
                  </Message>
                ) : null}
              </Form.Field>
            </Form.Group>
            <Form.Field error={emailError}>
              <label>Email</label>
              <input
                placeholder="Email address"
                onChange={(e) => setUsername(e.target.value)}
              />
              {emailError ? (
                <Message color="red">This email is already in use.</Message>
              ) : null}
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form.Field>

            <Form.Field error={passwordError}>
              <label>Confirm Password</label>
              <input
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
              {passwordError ? (
                <Message color="red">Your passwords do not match.</Message>
              ) : null}
            </Form.Field>
            <Divider section />
            <Header as="h3">Financial Info</Header>
            <Form.Group widths="equal">
              <Form.Field width={4}>
                <label>Net Salary</label>
                <input placeholder="Net salary" type="number" />
              </Form.Field>
              <Form.Field width={4}>
                <label>Net Monthly Income</label>
                <input placeholder="Net monthly income" type="number" />
              </Form.Field>
            </Form.Group>

            <Form.Field>
              <Button loading={loading} onClick={doSignUp} color="primary">
                Signup
              </Button>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Container>
    </Grid>
  )
}
