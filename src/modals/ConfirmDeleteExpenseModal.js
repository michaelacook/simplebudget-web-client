import React, { useState } from "react"
import { Button, Modal, Icon } from "semantic-ui-react"

export default function ConfirmDeleteExpenseModal({ handleDelete }) {
  const [open, setOpen] = React.useState(false)

  function handleConfirm() {
    handleDelete()
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon="trash" />}
    >
      <Modal.Header style={{ color: "red" }}>
        <Icon name="warning sign"></Icon>
        Warning
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Are you sure you want to delete this expenditure? This action is
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
