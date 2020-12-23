import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Message,
} from "semantic-ui-react"

export default function Login({ login, getBudgets }) {
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(useLocation().search)
  )
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkbox, setCheckbox] = useState(false)
  const [error, setError] = useState("")
  const history = useHistory()

  async function handleLogin() {
    const user = await login(username, password, checkbox, setError)
    await getBudgets(user)
    history.push("/")
  }

  return (
    <Container>
      {queryParams.get("newsignup") ? (
        <Message color="green">Awesome! You can login now</Message>
      ) : null}
      <Header as="h1" className="mt-3">
        Login
      </Header>
      <Form>
        <Form.Field width={10}>
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field width={10}>
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form.Field>
        <Form.Field>
          <Form.Field width={10}>
            <Checkbox
              label="Keep me logged in"
              onChange={(e) => setCheckbox(!checkbox)}
            />
            {error ? <Message color="red">{error.message}</Message> : null}
          </Form.Field>
          <Button onClick={handleLogin} size="big" color="primary">
            Login
          </Button>
        </Form.Field>
      </Form>
    </Container>
  )
}
