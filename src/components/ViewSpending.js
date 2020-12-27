import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, Container, Form, Header, Table } from "semantic-ui-react"

export default function ViewSpending() {
  const [expenditures, setExpenditures] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [day, setDay] = useState(new Date().getDate())

  return (
    <Container>
      <Header as="h1" className="mt-3">
        Spending
      </Header>
    </Container>
  )
}
