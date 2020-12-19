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

export default function Login({ login }) {
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(useLocation().search)
  )
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkbox, setCheckbox] = useState(false)
  const [error, setError] = useState("")

  const history = useHistory()

  async function doLogin() {
    const response = await fetch("http://localhost:5000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa(`${username}:${password}`),
      },
    })

    if (response.status !== 200) {
      response.json().then((data) => setError(data))
    } else {
      response
        .json()
        .then((user) => {
          const expires = checkbox ? 365 : 1
          Cookies.set("user", JSON.stringify(user), { expires })
          login(user)
        })
        .finally(() => history.push("/"))
    }
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

          <Button onClick={doLogin} size="big" color="primary">
            Login
          </Button>
        </Form.Field>
      </Form>
    </Container>
  )
}
