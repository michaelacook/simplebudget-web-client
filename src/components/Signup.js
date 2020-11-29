import React, { useState } from "react"
import {
  Button,
  Container,
  Form,
  Header,
  Grid,
  Segment,
} from "semantic-ui-react"

export default () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <Grid centered doubling columns={3} className="mt-5">
      <Grid.Column>
        <Segment raised centered>
          <Header as="h1" textAlign="center">
            Signup
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
              <input
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </Form.Field>
            <Form.Field>
              <Button size="big" color="primary" fluid>
                Signup
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}
