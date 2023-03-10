import { ByteArray, crypto } from '@graphprotocol/graph-ts'
import { BridgeTransaction } from '../../generated/schema'
import {
  TokenDeposit,
  TokenDepositAndSwap,
  TokenMint,
  TokenMintAndSwap,
  TokenRedeem,
  TokenRedeemAndRemove,
  TokenRedeemAndSwap,
  TokenWithdraw,
  TokenWithdrawAndRemove,
} from '../../generated/SynapseBridge/SynapseBridge'
import { TokenDefinition } from './tokens'
import {
  CHAIN_ID,
  getPoolAddress,
  getReceivedToken,
  getReceivedValue,
  handleOut,
} from './utils'

// IN
export function handleTokenMintAndSwap(event: TokenMintAndSwap): void {
  const blockNumber = event.block.number
  const timestamp = event.block.timestamp
  const txnHash = event.transaction.hash
  const kappa = crypto
    .keccak256(ByteArray.fromHexString(txnHash.toHexString()))
    .toHexString()

  let toAddress = event.params.to
  let fee = event.params.fee
  let swapSuccess = event.params.swapSuccess
  let tokenIndexTo = event.params.tokenIndexTo
  let poolAddress = getPoolAddress(
    'handleTokenMintAndSwap',
    event.transaction.input
  )
  let receivedTokenAddress = getReceivedToken(
    kappa,
    poolAddress,
    swapSuccess,
    tokenIndexTo as i32,
    event.params.token
  )
  let receivedTokenSymbol =
    TokenDefinition.fromAddress(receivedTokenAddress).symbol
  let receivedTokenValue = getReceivedValue(
    event.params.amount,
    event.params.token,
    event.receipt!
  )
  let toChainId = CHAIN_ID
  let pending = false

  if (!swapSuccess) {
    receivedTokenValue = receivedTokenValue.minus(fee)
  }

  // update bridge txn
  let txn = BridgeTransaction.load(kappa)
  if (txn == null) {
    txn = new BridgeTransaction(kappa)
  }

  if (txn.toTxnHash) {
    pending = false
  }

  // update object
  // txn.toTxnHash = null
  txn.kappa = kappa
  txn.toTxnHash = txnHash.toHexString()

  txn.toAddress = toAddress.toHexString()

  txn.receivedValue = receivedTokenValue

  txn.toChainId = toChainId

  txn.toChainBlock = blockNumber

  txn.receivedTime = timestamp

  txn.receivedTokenAddress = receivedTokenAddress.toHexString()
  txn.receivedTokenSymbol = receivedTokenSymbol

  txn.pending = pending
  txn.swapSuccess = swapSuccess

  // save
  txn.save()
}

export function handleTokenMint(event: TokenMint): void {
  const blockNumber = event.block.number
  const timestamp = event.block.timestamp
  const txnHash = event.transaction.hash
  const kappa = crypto
    .keccak256(ByteArray.fromHexString(txnHash.toHexString()))
    .toHexString()

  let toAddress = event.params.to
  let fee = event.params.fee
  let receivedTokenAddress = event.params.token
  let receivedTokenSymbol =
    TokenDefinition.fromAddress(receivedTokenAddress).symbol
  let receivedTokenValue = getReceivedValue(
    event.params.amount,
    event.params.token,
    event.receipt!
  )
  let toChainId = CHAIN_ID
  let pending = false

  receivedTokenValue = receivedTokenValue.minus(fee)

  // update bridge txn
  let txn = BridgeTransaction.load(kappa)
  if (txn == null) {
    txn = new BridgeTransaction(kappa)
  }

  if (txn.toTxnHash) {
    pending = false
  }

  // update object
  // txn.toTxnHash = null
  txn.kappa = kappa
  txn.toTxnHash = txnHash.toHexString()

  txn.toAddress = toAddress.toHexString()

  txn.receivedValue = receivedTokenValue

  txn.toChainId = toChainId

  txn.toChainBlock = blockNumber

  txn.receivedTime = timestamp

  txn.receivedTokenAddress = receivedTokenAddress.toHexString()
  txn.receivedTokenSymbol = receivedTokenSymbol

  txn.pending = pending

  // save
  txn.save()
}

export function handleTokenWithdrawAndRemove(
  event: TokenWithdrawAndRemove
): void {
  const blockNumber = event.block.number
  const timestamp = event.block.timestamp
  const txnHash = event.transaction.hash
  const kappa = crypto
    .keccak256(ByteArray.fromHexString(txnHash.toHexString()))
    .toHexString()

  let toAddress = event.params.to
  let fee = event.params.fee
  let swapSuccess = event.params.swapSuccess
  let tokenIndexTo = event.params.swapTokenIndex
  let poolAddress = getPoolAddress(
    'handleTokenWithdrawAndRemove',
    event.transaction.input
  )
  let receivedTokenAddress = getReceivedToken(
    kappa,
    poolAddress,
    swapSuccess,
    tokenIndexTo as i32,
    event.params.token
  )
  let receivedTokenSymbol =
    TokenDefinition.fromAddress(receivedTokenAddress).symbol
  let receivedTokenValue = getReceivedValue(
    event.params.amount,
    event.params.token,
    event.receipt!
  )
  let toChainId = CHAIN_ID
  let pending = false

  if (!swapSuccess) {
    receivedTokenValue = receivedTokenValue.minus(fee)
  }

  // update bridge txn
  let txn = BridgeTransaction.load(kappa)
  if (txn == null) {
    txn = new BridgeTransaction(kappa)
  }

  if (txn.toTxnHash) {
    pending = false
  }

  // update object
  // txn.toTxnHash = null
  txn.kappa = kappa
  txn.toTxnHash = txnHash.toHexString()

  txn.toAddress = toAddress.toHexString()

  txn.receivedValue = receivedTokenValue

  txn.toChainId = toChainId

  txn.toChainBlock = blockNumber

  txn.receivedTime = timestamp

  txn.receivedTokenAddress = receivedTokenAddress.toHexString()
  txn.receivedTokenSymbol = receivedTokenSymbol

  txn.pending = pending
  txn.swapSuccess = swapSuccess

  // save
  txn.save()
}

export function handleTokenWithdraw(event: TokenWithdraw): void {
  const blockNumber = event.block.number
  const timestamp = event.block.timestamp
  const txnHash = event.transaction.hash
  const kappa = crypto
    .keccak256(ByteArray.fromHexString(txnHash.toHexString()))
    .toHexString()

  let toAddress = event.params.to
  let fee = event.params.fee
  let receivedTokenAddress = event.params.token
  let receivedTokenSymbol =
    TokenDefinition.fromAddress(receivedTokenAddress).symbol
  let receivedTokenValue = getReceivedValue(
    event.params.amount,
    event.params.token,
    event.receipt!
  )
  let toChainId = CHAIN_ID
  let pending = false

  receivedTokenValue = receivedTokenValue.minus(fee)
  receivedTokenValue = receivedTokenValue.minus(fee)

  // update bridge txn
  let txn = BridgeTransaction.load(kappa)
  if (txn == null) {
    txn = new BridgeTransaction(kappa)
  }

  if (txn.toTxnHash) {
    pending = false
  }

  // update object
  // txn.toTxnHash = null
  txn.kappa = kappa
  txn.toTxnHash = txnHash.toHexString()

  txn.toAddress = toAddress.toHexString()

  txn.receivedValue = receivedTokenValue

  txn.toChainId = toChainId

  txn.toChainBlock = blockNumber

  txn.receivedTime = timestamp

  txn.receivedTokenAddress = receivedTokenAddress.toHexString()
  txn.receivedTokenSymbol = receivedTokenSymbol

  txn.pending = pending

  // save
  txn.save()
}

// OUT
export function handleTokenRedeemAndSwap(event: TokenRedeemAndSwap): void {
  handleOut(
    event.block,
    event.transaction,
    event.params.chainId,
    event.params.token,
    event.params.to,
    event.params.amount
  )
}

export function handleTokenRedeemAndRemove(event: TokenRedeemAndRemove): void {
  handleOut(
    event.block,
    event.transaction,
    event.params.chainId,
    event.params.token,
    event.params.to,
    event.params.amount
  )
}

export function handleTokenRedeem(event: TokenRedeem): void {
  handleOut(
    event.block,
    event.transaction,
    event.params.chainId,
    event.params.token,
    event.params.to,
    event.params.amount
  )
}

export function handleTokenDepositAndSwap(event: TokenDepositAndSwap): void {
  handleOut(
    event.block,
    event.transaction,
    event.params.chainId,
    event.params.token,
    event.params.to,
    event.params.amount
  )
}

export function handleTokenDeposit(event: TokenDeposit): void {
  handleOut(
    event.block,
    event.transaction,
    event.params.chainId,
    event.params.token,
    event.params.to,
    event.params.amount
  )
}
