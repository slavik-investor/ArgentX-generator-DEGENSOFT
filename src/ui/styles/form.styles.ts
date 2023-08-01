import { css } from '@emotion/css'

export const formStyles = {
  form: css`
    max-width: 22rem;
  `,
  row: css`
    margin-top: .6rem;
    font-size: .7rem;

    &:first-of-type {
      margin-top: 0;
    }
  `,
  label: css`
    border: 0.0625rem solid var(--color-border);
    //border-radius: .2rem;
    padding: 0 .25rem 0 .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.25rem;
    margin-top: .25rem;

    :hover {
      background: var(--color-input-bg-active-1);
    }

    &[data-locked=true] {
      background: var(--color-input-bg-active-2);
      cursor: default;
    }
  `,
  cross: css`
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    opacity: 0.3;
    margin: 0 .5rem;

    :hover {
      opacity: 1;
    }

    :before, :after {
      position: absolute;
      content: ' ';
      height: .7rem;
      width: 0.125rem;
      background-color: var(--color-text-0);
      left: .45rem;
      top: .15rem;
    }

    :before {
      transform: rotate(45deg);
    }

    :after {
      transform: rotate(-45deg);
    }

    [disabled] & {
      opacity: 0.3 !important;
    }
  `,
  choose: css`
    flex: 1;
  `,
  inputs: css`
    display: flex;
    justify-content: space-between;

    input {
      width: 49%;
    }
  `
}
