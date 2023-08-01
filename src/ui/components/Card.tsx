import { css } from '@emotion/css'
import React from 'react'

export type CardProps = {
  label: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = (props) => (
  <div className={wrapperClassName}>
    <span className={labelClassName}>
      {props.label}
    </span>
    <div style={{display: 'flex'}}>
      {props.children}
    </div>
  </div>
)

const wrapperClassName = css`
  display: flex;
  flex-direction: column;
  //border-radius: .2rem;
  //border: 0.0625rem solid var(--color-border);
  padding: .75rem 1rem;
`

const labelClassName = css`
  margin-bottom: .8rem;
`
