import { BigInt, ByteArray, crypto } from '@graphprotocol/graph-ts'
import { BridgeTransaction } from '../../generated/schema'
import { TokenDeposit, TokenDepositAndSwap, TokenMint, TokenMintAndSwap, TokenRedeem, TokenRedeemAndRemove, TokenRedeemAndSwap, TokenWithdraw, TokenWithdrawAndRemove } from '../../generated/SynapseBridge/SynapseBridge'
import { handleOut } from './utils'

// IN
export function handleTokenMintAndSwap(event: TokenMintAndSwap): void {
    const blockNumber = event.block.number
    const timestamp = event.block.timestamp
    const txnHash = event.transaction.hash
    const kappa = crypto.keccak256(ByteArray.fromHexString(txnHash.toHexString())).toHexString()
    
    let toAddress = event.params.to
    let fee = event.params.fee
    let swapSuccess = event.params.swapSuccess
    let tokenIndexTo = event.params.tokenIndexTo
    let receivedTokenAddress = event.params.token // todo: indexer has other logic
    let receivedTokenSymbol = ""
    let receivedTokenValue = event.params.amount
    let toChainId = BigInt.fromI32(7700) // todo
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
    const kappa = crypto.keccak256(ByteArray.fromHexString(txnHash.toHexString())).toHexString()

    let toAddress = event.params.to
    let fee = event.params.fee
    let swapSuccess = null
    let receivedTokenAddress = event.params.token // todo: indexer has other logic
    let receivedTokenSymbol = ""
    let receivedTokenValue = event.params.amount
    let toChainId = BigInt.fromI32(7700) // todo
    let pending = false

    if (!swapSuccess) { // todo: verify how this reacts
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

    // save
    txn.save()
}

export function handleTokenWithdrawAndRemove(event: TokenWithdrawAndRemove): void {
    const blockNumber = event.block.number
    const timestamp = event.block.timestamp
    const txnHash = event.transaction.hash
    const kappa = crypto.keccak256(ByteArray.fromHexString(txnHash.toHexString())).toHexString()

    let toAddress = event.params.to
    let fee = event.params.fee
    let swapSuccess = event.params.swapSuccess
    let tokenIndexTo = event.params.swapTokenIndex
    let receivedTokenAddress = event.params.token
    let receivedTokenSymbol = ""
    let receivedTokenValue = event.params.amount
    let toChainId = BigInt.fromI32(7700) // todo
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
    const kappa = crypto.keccak256(ByteArray.fromHexString(txnHash.toHexString())).toHexString()

    let toAddress = event.params.to
    let fee = event.params.fee
    let swapSuccess = null
    let receivedTokenAddress = event.params.token // todo: indexer has other logic
    let receivedTokenSymbol = ""
    let receivedTokenValue = event.params.amount
    receivedTokenValue = receivedTokenValue.minus(fee) // todo: verify double sub
    let toChainId = BigInt.fromI32(7700) // todo
    let pending = false

    if (!swapSuccess) { // todo: verify how this reacts
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

    // save
    txn.save()
}

// OUT
export function handleTokenRedeemAndSwap(event: TokenRedeemAndSwap): void {
    handleOut(event.block,
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
