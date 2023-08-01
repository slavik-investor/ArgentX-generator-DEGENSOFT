import { css } from '@emotion/css'
import React from 'react'

export const Button: React.FC<React.HTMLProps<HTMLDivElement>> = (props) => (
  <div
    className={wrapperClassName}
    {...props}
  />
)

const wrapperClassName = css`
  padding: 0.25rem 0.65rem;
  //border-radius: 0.2rem;
  background: var(--color-surface-active);
  border: 0.0625rem solid var(--color-border);

  :hover {
    background: #575757;
  }
`


