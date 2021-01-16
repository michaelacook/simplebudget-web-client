import React, { useState } from "react"
import { Button, Header, Modal, Icon } from "semantic-ui-react"

export default ({ deleteBudget, budgetId }) => {
  const [open, setOpen] = React.useState(false)

  function handleConfirm() {
    deleteBudget(budgetId)
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button compact icon="trash" />}
    >
      <Modal.Header style={{ color: "red" }}>
        <Icon name="warning sign"></Icon>
        Warning
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Are you sure you want to delete this budget? This action is
            permanent.
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nevermind
        </Button>
        <Button
          content="Yes, delete it."
          labelPosition="right"
          icon="checkmark"
          onClick={handleConfirm}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}
