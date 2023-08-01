import './index.log.css'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { css } from '@emotion/css'


const Log = () => {
  const [ data, setData ] = React.useState<string[]>([])
  useEffect(() => { window.logBridge.onLogEvent((event, msg) => setData(data => [ ...data, msg ]))}, [])

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { ref.current?.querySelector('div:last-child')?.scrollIntoView({ behavior: 'smooth' }) }, [ data ])

  return (
    <div className={styles.wrapper}>
      <div className={styles.overflow} ref={ref}>
        {data.map((msg, i) => (<div className={styles.row} key={i} dangerouslySetInnerHTML={{ __html: msg.replaceAll(' ', '&nbsp;') }}/>))}
      </div>
    </div>
  )
}

createRoot(document.getElementById('app')).render(<Log/>)

const styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    padding: 1rem
  `,
  overflow: css`
    overflow: auto;
    max-height: calc(100vh - 2rem - 1.7rem);
  `,
  row: css`
    margin-bottom: .2rem;
  `
}
