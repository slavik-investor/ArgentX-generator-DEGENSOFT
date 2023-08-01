import { css } from '@emotion/css'
import React from 'react'

export const Banner: React.FC = () => (
  <>
    <div className={titleClassName} children={'DEGENSOFT.IO'}/>
    <div className={subtitleClassName} children={'ArgentX wallet generator'}/>
  </>
)

const titleClassName = css`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  color: #fff;
`

const subtitleClassName = css`
  text-align: center;
  font-size: 1rem;
  margin-top: .4rem;
  margin-bottom: 2rem;
`
