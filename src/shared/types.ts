export type Wallet = {
  mnemonic: string
  address: string
  privateKey: string
}

export type Settings = {
  delimiter: string
  rpc?: string
  attempts: number
  sleepBetweenWalletFrom: number
  sleepBetweenWalletTo: number
  sleepBetweenAttemptFrom: number
  sleepBetweenAttemptTo: number
  mixWallets: boolean
}

export type GenerateOpts = {
  mnemonicsFile?: string
  quantity?: number
  settings: Settings
}

export type DeployOpts = {
  walletsFile?: string
  settings: Settings
}
