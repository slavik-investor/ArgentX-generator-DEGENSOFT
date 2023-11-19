import React, { createContext, useState } from 'react'
import { GeneratePage } from './pages/GeneratePage'
import { SettingsPage } from './pages/SettingsPage'
import { DeployPage } from './pages/DeployPage'
import { css } from '@emotion/css'
import { Banner } from './components/Banner'


const tabs = [
  {
    key: 'generate',
    label: `Generate`,
    page: () => <GeneratePage/>,
  },
  {
    key: 'deploy',
    label: `Deploy`,
    page: () => <DeployPage/>,
  },
  {
    key: 'settings',
    label: `Settings`,
    page: () => <SettingsPage/>,
  },
]

export const LockedContext = createContext<[ boolean, (next: boolean) => void ]>([] as any)

export const UI: React.FC = () => {
  const [ tab, setTab ] = useState(tabs[0].key)
  const [ locked, setLocked ] = useState(false)

  const onSelectTab = (key: string) => {
    if (locked === false) {
      setTab(key)
    }
  }

  return (
    <LockedContext.Provider value={[ locked, setLocked ]}>
      <Banner/>
      <div className={styles.tabs}>
        {tabs.map(({ key, label }) => (
          <div
            className={styles.tab(key, tab, locked)}
            key={key}
            onClick={() => onSelectTab(key)}
            children={label}
          />
        ))}
      </div>
      <div>
        {tabs.find(({ key }) => key === tab).page()}
      </div>
    </LockedContext.Provider>
  )
}

const styles = {
  tab: (key: string, tab: string, locked: boolean) => css`
    padding: .4rem 1rem;
    border-bottom: .0625rem solid ${key === tab ? 'var(--brand)' : 'transparent'};
    font-size: .88rem;
    background: ${key === tab ? 'var(--color-surface-active)' : 'transparent'};
    //border-top-left-radius: .25rem;
    //border-top-right-radius: .25rem;

    :hover {
      ${!locked ? 'background: var(--color-surface-active);' : ''}
    }

    :first-child {
      margin-left: 1rem;
    }

    :last-child {
      margin-right: 1rem;
    }

    color: ${locked ? 'var(--color-text-1);' : 'var(--color-text-0);'};
  `,
  tabs: css`
    display: flex;
    border-bottom: .0625rem solid var(--color-border);
    gap: 0.25rem;
  `,
}


