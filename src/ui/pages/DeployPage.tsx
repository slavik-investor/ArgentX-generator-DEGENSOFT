import React, { FormEventHandler, useContext, useState } from 'react'
import { ChangeHandler, useForm } from 'react-hook-form'
import { Settings } from '../../shared/types'
import { Action } from '../components/Action'
import { Button } from '../components/Button'
import { defaultSettings, getSettings, updateSettings } from '../persist/settings.persist'
import { formStyles } from '../styles/form.styles'
import { pageStyles } from '../styles/page.styles'
import { LockedContext } from '../UI'


export const DeployPage: React.FC = () => {
  const [ filePath, setFilePath ] = useState<string>(null)
  const [ fileName, setFileName ] = useState<string>(null)
  const [ locked, setLocked ] = useContext(LockedContext)

  const { register, getValues } = useForm<Settings>({ defaultValues: getSettings() })

  const selectFile = async () => {
    if (locked) return
    const response = await window.mainBridge.openCsvFile()
    if (response) {
      setFilePath(response.path)
      setFileName(response.name)
    } else {
      reset()
    }
  }

  const reset = () => {
    if (locked) return
    setFilePath(null)
    setFileName(null)
  }

  const openLog = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    await window.mainBridge.openLog()
  }

  const cleanFile = async (e: React.MouseEvent) => {
    e.stopPropagation()
    reset()
  }

  const onChange: ChangeHandler = async (event: Event) => {
    if (locked) return
    updateSettings(getValues())
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const deploy = async () => {
    if (locked || !fileName) return
    setLocked(true)
    await window.mainBridge.deploy({ walletsFile: filePath, settings: getSettings() })
    setLocked(false)
  }

  return (
    <div className={pageStyles.page}>
      <form className={pageStyles.content} onChange={onChange} onSubmit={onSubmit}>
        <div className={formStyles.row}>
          <span>Wallets</span>
          <label className={formStyles.label} onClick={selectFile} data-locked={locked}>
            <span className={formStyles.choose}>{filePath ? fileName : 'Choose csv file...'}</span>
            {filePath && <span className={formStyles.cross} onClick={cleanFile}></span>}
            <Button children={'Browse'}/>
          </label>
        </div>
        <div className={formStyles.row}>
          <span>Sleep between wallets (in seconds)</span>
          <div className={formStyles.inputs}>
            <input
              disabled={locked}
              {...register('sleepBetweenWalletFrom', { valueAsNumber: true })}
              placeholder={defaultSettings.sleepBetweenWalletFrom.toString()}
            />
            <input
              disabled={locked}
              {...register('sleepBetweenWalletTo', { valueAsNumber: true })}
              placeholder={defaultSettings.sleepBetweenWalletTo.toString()}
            />
          </div>
        </div>
        <div className={formStyles.row}>
          <span>Attempts</span>
          <input
            disabled={locked}
            {...register('attempts', { valueAsNumber: true })}
            placeholder={defaultSettings.attempts.toString()}
          />
        </div>
        <div className={formStyles.row}>
          <span>Sleep between attempts (in seconds)</span>
          <div className={formStyles.inputs}>
            <input
              disabled={locked}
              {...register('sleepBetweenAttemptFrom', { valueAsNumber: true })}
              placeholder={defaultSettings.sleepBetweenAttemptFrom.toString()}
            />
            <input
              disabled={locked}
              {...register('sleepBetweenAttemptTo', { valueAsNumber: true })}
              placeholder={defaultSettings.sleepBetweenAttemptTo.toString()}
            />
          </div>
        </div>
        <div className={formStyles.row}>
          <span>Random order of wallets</span>
          <input disabled={locked} type={'checkbox'} {...register('mixWallets')} />
        </div>
      </form>
      <Action onClick={deploy} disabled={locked || !fileName}>
        Deploy
      </Action>
    </div>
  )
}

