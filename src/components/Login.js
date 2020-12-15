import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Cookies from "js-cookie"
import {
  Button,
  Checkbox,
  Form,
  Header,
  Grid,
  Message,
  Segment,
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
    <Grid centered doubling columns={3} className="mt-5">
      <Grid.Column>
        <Segment raised centered>
          {queryParams.get("newsignup") ? (
            <Message color="green">Awesome! You can login now</Message>
          ) : null}
          <Header as="h1" textAlign="center">
            Login
          </Header>
          <Form size="big">
            <Form.Field>
              <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form.Field>
            <Form.Field>
              {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
              <Form.Field>
                <Checkbox
                  label="Keep me logged in"
                  onChange={(e) => setCheckbox(!checkbox)}
                />
              </Form.Field>
              <Button onClick={doLogin} size="big" color="primary" fluid>
                Login
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
