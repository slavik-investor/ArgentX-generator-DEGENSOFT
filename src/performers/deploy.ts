import { BigNumber, ethers } from 'ethers'
import { Account, CallData, constants, Contract, DeployAccountContractPayload, ec, Provider, uint256 } from 'starknet'
import { CLASS_HASH, ETH_ABI, ETH_ADDRESS } from '../shared/constants'
import { Settings, Wallet } from '../shared/types'
import { random, sleep } from '../shared/utils'

export async function deployer(wallets: Wallet[], settings: Settings, log: (m: string) => void) {
  log(`deploying ${wallets.length} wallets`)

  const provider = settings.rpc
    ? new Provider({ rpc: { nodeUrl: settings.rpc } })
    : new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } })

  const ETH = new Contract(ETH_ABI, ETH_ADDRESS, provider)

  async function getBalance(wallet: Wallet) {
    const rawBalance = await ETH.balanceOf(wallet.address)
    return BigNumber.from(uint256.uint256ToBN(rawBalance.balance).toString())
  }

  for (let i = 0; i < wallets.length; i++) {
    try {
      const wallet = wallets[i]
      const balance = await getBalance(wallet)

      if (balance.lt(ethers.utils.parseEther('0.0001'))) {
        log(`${wallet.address.padEnd(67)} has ${ethers.utils.formatEther(balance)} ETH (< 0.0001 ETH), skip`)
        continue
      }

      const code = await provider.getCode(wallet.address)
      if (code.bytecode.length > 0) {
        log(`${wallet.address.padEnd(67)} has ${ethers.utils.formatEther(balance)} ETH, already deployed`)
        continue
      }

      log(`${wallet.address.padEnd(67)} has ${ethers.utils.formatEther(balance)} ETH, deploy`)

      const privateKeyHex = BigNumber.from(wallet.privateKey).toHexString()
      const publicKeyHex = ec.starkCurve.getStarkKey(privateKeyHex)

      const account = new Account(provider, wallet.address, privateKeyHex, '1')

      const deployAccountPayload: DeployAccountContractPayload = {
        classHash: CLASS_HASH,
        constructorCalldata: CallData.compile({ owner: publicKeyHex, guardian: '0' }),
        addressSalt: publicKeyHex,
      }

      for (let j = 0; j < settings.attempts; j++) {
        log(`attempt ${j + 1} to deploy account`)
        try {
          const { transaction_hash, contract_address } = await account.deployAccount(deployAccountPayload)
          log(`account deployed with transaction hash ${transaction_hash} and contract address ${contract_address}`)
          break
        } catch (e) {
          log(`error: ${e?.message}`)
          await sleep(random(settings.sleepBetweenAttemptFrom, settings.sleepBetweenAttemptTo))
        }
      }

      if (i !== wallets.length - 1) {
        const time = random(settings.sleepBetweenWalletFrom, settings.sleepBetweenWalletTo)
        log(`sleep for ${time}s`)
        await sleep(time)
      }
    } catch (e) {
      log(`error: ${e?.message}`)
    }
  }
}
