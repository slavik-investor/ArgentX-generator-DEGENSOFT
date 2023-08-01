import { readFileSync, writeFileSync } from 'fs'
import { Wallet } from './types'
import { CSV_HEADER } from './constants'

export function loadWalletsSync(opts: { path: string, delimiter?: string }): Wallet[] {
  return readFileSync(opts.path).toString()
    .split('\n')
    .slice(1)
    .filter(row => row)
    .map(row => row.trim())
    .map(row => row.split(opts.delimiter))
    .map(row => ({
      mnemonic: row[0],
      address: row[1],
      privateKey: row[2],
    }))
}

export function saveWalletsSync(wallets: Wallet[], opts: { path: string, delimiter?: string }) {
  const rows = [ CSV_HEADER.join(opts.delimiter) ]
  rows.push(...wallets.map(w => [ w.mnemonic, w.address, w.privateKey ].join(opts.delimiter)))
  writeFileSync(opts.path, rows.join('\n'))
}

export async function sleep(time: number) {
  await new Promise(resolve => setTimeout(resolve, time * 1000))
}

export function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min
}
