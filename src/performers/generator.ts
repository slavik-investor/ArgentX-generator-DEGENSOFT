import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import { BigNumber, ethers } from 'ethers'
import { CallData, ec, hash } from 'starknet'
import { Wallet } from '../shared/types'
import { CLASS_HASH } from '../shared/constants'
import { sleep } from '../shared/utils'

type GeneratorOptions = {
  quantity?: number
  mnemonics?: string[]
}

export async function generator({ quantity, mnemonics }: GeneratorOptions) {
  const wallets: Wallet[] = []

  if (mnemonics) {
    for (const mnemonic of mnemonics) {
      wallets.push(generate(mnemonic))
    }
  } else {
    for (let i = 0; i < quantity; i++) {
      const mnemonic = bip39.generateMnemonic(wordlist)
      wallets.push(generate(mnemonic))
      await sleep(0.05)
    }
  }

  return wallets
}

export function generate(mnemonic: string): Wallet {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`)

  const hdNode = ethers.utils.HDNode.fromSeed(wallet.privateKey)
  const starknetHdNode = hdNode.derivePath(`m/44'/9004'/0'/0/0`)

  const privateKeyHex = `0x` + ec.starkCurve.grindKey(starknetHdNode.privateKey)
  const publicKey = ec.starkCurve.getStarkKey(privateKeyHex)

  const constructorCallData = CallData.compile({ owner: publicKey, guardian: '0' })
  const address = hash.calculateContractAddressFromHash(publicKey, CLASS_HASH, constructorCallData, 0)

  return { mnemonic, address, privateKey: BigNumber.from(privateKeyHex).toString() }
}
