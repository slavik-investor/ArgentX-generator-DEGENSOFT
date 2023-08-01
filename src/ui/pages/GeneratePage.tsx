import React, { useContext, useState } from 'react'
import { Button } from '../components/Button'
import { css } from '@emotion/css'
import { Action } from '../components/Action'
import { formStyles } from '../styles/form.styles'
import { pageStyles } from '../styles/page.styles'
import { getSettings } from '../persist/settings.persist'
import { LockedContext } from '../UI'

export const GeneratePage: React.FC = () => {
  const [ filePath, setFilePath ] = useState<string>(null)
  const [ fileName, setFileName ] = useState<string>(null)
  const [ quantity, setQuantity ] = useState(100)
  const [ locked, setLocked ] = useContext(LockedContext)

  const selectFile = async () => {
    const response = await window.mainBridge.openTxtFile()
    if (response) {
      setFilePath(response.path)
      setFileName(response.name)
      setQuantity(response.lines)
    } else {
      reset()
    }
  }

  const reset = () => {
    setFilePath(null)
    setFileName(null)
    setQuantity(100)
  }

  const cleanFile = async (e: React.MouseEvent) => {
    e.stopPropagation()
    reset()
  }

  const generate = async () => {
    if (filePath || quantity) {
      setLocked(true)
      const result = await window.mainBridge.generate({ mnemonicsFile: filePath, quantity, settings: getSettings() })
      if (!result) {
        reset()
      }
      setLocked(false)
    } else {
      alert('Please open a file with mnemonics or enter the quantity of wallets to generate')
    }
  }

  return (
    <div className={pageStyles.page}>
      <div className={pageStyles.content}>
        <div style={{fontSize: '.8rem', marginBottom: '.25rem'}}>
          You can select a file with mnemonics, if the file is not selected random mnemonics will be created.
        </div>

        <div className={formStyles.row}>
          <span>Mnemonics file</span>
          <label className={formStyles.label} onClick={selectFile} data-locked={locked}>
            <span className={formStyles.choose}>{filePath ? fileName : 'Choose file...'}</span>
            {filePath && <span className={formStyles.cross} onClick={cleanFile}></span>}
            <Button children={'Browse'}/>
          </label>
        </div>

        <div className={formStyles.row}>
          <span>Quantity</span>
          <input
            disabled={locked || !!filePath}
            value={quantity.toString()}
            onChange={(event) => setQuantity(parseInt(event.target.value ?? '0'))}
          />
        </div>
      </div>
      <Action onClick={generate} disabled={locked}>
        <div>{locked ? 'Generating' : 'Generate'}</div>
        {filePath && <div className={styles.actionSubLine}>(from {fileName})</div>}
      </Action>
    </div>
  )
}

const styles = {
  actionSubLine: css`
    font-size: .8rem;
  `,
}
