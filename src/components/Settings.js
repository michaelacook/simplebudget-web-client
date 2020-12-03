import React, { useState } from "react"
import { Button, Container, Header, Segment } from "semantic-ui-react"
import ToggleSwitch from "./ToggleSwitch"
import Breadcrumb from "./Breadcrumb"

export default () => {
  const foo = () => {
    console.log("this is a function")
  }
  return (
    <Container>
      <Breadcrumb
        sections={[
          { name: "Dashboard", path: "/" },
          { name: "Settings", path: "/settings" },
        ]}
      />
      <Segment raised className="mt-2" style={{ padding: "35px" }}>
        <Header as="h2">Application Settings</Header>
        <section className="mt-2">
          <div>
            <label>
              <p>Show Pro Tips</p>
              <ToggleSwitch />
            </label>
          </div>

          <div style={{ marginTop: "8px" }}>
            <label>
              <p>Show Reminders</p>
              <ToggleSwitch />
            </label>
          </div>

          <div style={{ marginTop: "8px" }}>
            <label>
              <p>Dark Mode</p>
              <ToggleSwitch />
            </label>
          </div>
        </section>
      </Segment>
    </Container>
  )
}
