import React from 'react'
import { css } from '@emotion/css'
import classnames from 'classnames'

export const Action: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, ...props }) => (
  <div {...props} className={classnames(styles.wrapper, className)}/>
)

const styles = {
  wrapper: css`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--color-accent);
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.4rem;
    height: 5rem;
    color: var(--color-text-reverse);

    :hover {
      background: var(--color-accent-active);
    }

    &[disabled] {
      background: var(--color-accent-faded) !important;
      color: var(--color-text-reverse-2);
    }
  `
}
