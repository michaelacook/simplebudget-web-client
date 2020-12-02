import React, { useState } from "react"
import Switch from "react-switch"

export default ({ onClick }) => {
  const [on, setOn] = useState(false)

  const handleChange = () => {
    setOn(!on)
  }

  return (
    <Switch
      checked={on}
      onChange={handleChange}
      uncheckedIcon={false}
      checkedIcon={false}
      width={35}
      height={21}
    />
  )
}
