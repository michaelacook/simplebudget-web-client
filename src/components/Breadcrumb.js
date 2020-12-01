import React from "react"
import { Breadcrumb, Segment } from "semantic-ui-react"

export default ({ sections, size, ...props }) => {
  return (
    <Segment compact tertiary>
      <Breadcrumb size={size}>
        {sections.map((section, i) => (
          <React.Fragment>
            <Breadcrumb.Section>{section}</Breadcrumb.Section>
            {i !== sections.length - 1 ? (
              <Breadcrumb.Divider icon="right chevron"></Breadcrumb.Divider>
            ) : null}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </Segment>
  )
}
