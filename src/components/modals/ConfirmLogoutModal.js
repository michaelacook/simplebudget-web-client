import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Menu, Modal } from "semantic-ui-react"

export default function ConfirmLogoutModal({ user, logout }) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Menu.Item name="logout" />}
    >
      <Modal.Content>
        <Modal.Description>
          <p>Are you sure you want to log out?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yes"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={() => {
            setOpen(false)
            logout()
            history.push("/login")
          }}
        />
      </Modal.Actions>
    </Modal>
  )
}
