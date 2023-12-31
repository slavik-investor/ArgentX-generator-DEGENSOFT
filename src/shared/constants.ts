export const CLASS_HASH = '0x01a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003'

export const ETH_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
export const ETH_ABI = JSON.parse('[{"name":"Uint256","size":2,"members":[{"name":"low","type":"felt","offset":0},{"name":"high","type":"felt","offset":1}],"type":"struct"},{"type":"function","name":"allowance","inputs":[{"name":"owner","type":"felt"},{"name":"spender","type":"felt"}],"outputs":[{"name":"remaining","type":"Uint256"}],"stateMutability":"view"},{"type":"function","name":"approve","inputs":[{"name":"spender","type":"felt"},{"name":"amount","type":"Uint256"}],"outputs":[{"name":"success","type":"felt"}]},{"type":"function","name":"balanceOf","inputs":[{"name":"account","type":"felt"}],"outputs":[{"name":"balance","type":"Uint256"}],"stateMutability":"view"},{"type":"function","name":"decimals","inputs":[],"outputs":[{"name":"decimals","type":"felt"}],"stateMutability":"view"},{"type":"function","name":"decreaseAllowance","inputs":[{"name":"spender","type":"felt"},{"name":"subtracted_value","type":"Uint256"}],"outputs":[{"name":"success","type":"felt"}]},{"type":"function","name":"get_identity","stateMutability":"view","inputs":[],"outputs":[{"name":"identity","type":"felt"}]},{"type":"function","name":"get_version","stateMutability":"view","inputs":[],"outputs":[{"name":"version","type":"felt"}]},{"type":"function","name":"increaseAllowance","inputs":[{"name":"spender","type":"felt"},{"name":"added_value","type":"Uint256"}],"outputs":[{"name":"success","type":"felt"}]},{"type":"function","name":"initialize","inputs":[{"name":"init_vector_len","type":"felt"},{"name":"init_vector","type":"felt*"}],"outputs":[]},{"type":"function","name":"initialized","inputs":[],"outputs":[{"name":"res","type":"felt"}],"stateMutability":"view"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"name","type":"felt"}],"stateMutability":"view"},{"type":"function","name":"permissionedBurn","inputs":[{"name":"account","type":"felt"},{"name":"amount","type":"Uint256"}],"outputs":[]},{"type":"function","name":"permissionedMint","inputs":[{"name":"recipient","type":"felt"},{"name":"amount","type":"Uint256"}],"outputs":[]},{"type":"function","name":"permittedMinter","inputs":[],"outputs":[{"name":"minter","type":"felt"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"symbol","type":"felt"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"totalSupply","type":"Uint256"}],"stateMutability":"view"},{"type":"function","name":"transfer","inputs":[{"name":"recipient","type":"felt"},{"name":"amount","type":"Uint256"}],"outputs":[{"name":"success","type":"felt"}]},{"type":"function","name":"transferFrom","inputs":[{"name":"sender","type":"felt"},{"name":"recipient","type":"felt"},{"name":"amount","type":"Uint256"}],"outputs":[{"name":"success","type":"felt"}]},{"name":"Approval","type":"event","keys":[],"data":[{"name":"owner","type":"felt"},{"name":"spender","type":"felt"},{"name":"value","type":"Uint256"}]},{"name":"Transfer","type":"event","keys":[],"data":[{"name":"from_","type":"felt"},{"name":"to","type":"felt"},{"name":"value","type":"Uint256"}]}]')

export const CSV_HEADER = [ 'mnemonic', 'starknet_address', 'starknet_private_key' ]

export const EVENTS = {
  dialog: {
    openTxtFile: 'dialog:openTxtFile',
    openCsvFile: 'dialog:openCsvFile',
  },
  performers: {
    generate: 'performers:generate',
    deploy: 'performers:deploy',
  },
  log: 'log',
  openLog: 'openlog',
}

export const CHANNELS = {
  log: 'log'
}
