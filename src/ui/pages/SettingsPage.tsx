import React, { FormEventHandler } from 'react'
import { ChangeHandler, useForm } from 'react-hook-form'
import { getSettings, updateSettings } from '../persist/settings.persist'
import { Settings } from '../../shared/types'
import { pageStyles } from '../styles/page.styles'
import { formStyles } from '../styles/form.styles'


export const SettingsPage: React.FC = () => {
  const { register, getValues } = useForm<Settings>({
    defaultValues: getSettings(),
  })

  const onChange: ChangeHandler = async (event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    updateSettings(getValues())
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className={pageStyles.page}>
      <form className={pageStyles.content} onChange={onChange} onSubmit={onSubmit}>
        <div className={formStyles.row}>
          <label>CSV delimiter</label>
          <input {...register('delimiter')}/>
        </div>
        <div className={formStyles.row}>
          <label>RPC</label>
          <input {...register('rpc')} placeholder={'https://alpha-mainnet.starknet.io'}/>
        </div>
      </form>
    </div>
  )
}

const styles = {}
