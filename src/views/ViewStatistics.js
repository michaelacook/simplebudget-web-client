import React, { useState } from "react"
import { Button, Container, Form, Header } from "semantic-ui-react"

export default function ViewStatistics() {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <Container>
      <Header as="h1" className="mt-2">
        Spending Statistics
      </Header>
    </Container>
  )
}
