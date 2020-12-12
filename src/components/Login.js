import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Grid,
  Segment,
} from "semantic-ui-react"

export default ({ login }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkbox, setCheckbox] = useState(false)
  const [error, setError] = useState("")

  const history = useHistory()

  const doLogin = async () => {
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
