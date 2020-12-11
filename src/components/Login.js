import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import {
  Button,
  Container,
  Form,
  Header,
  Grid,
  Segment,
} from "semantic-ui-react"

export default ({ login }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
      response.json().then((user) => login(user))
      history.push("/")
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
