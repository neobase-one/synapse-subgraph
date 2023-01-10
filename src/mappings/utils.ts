import { Address, BigInt, ByteArray, Bytes, crypto, ethereum } from "@graphprotocol/graph-ts";
import { BridgeTransaction } from "../../generated/schema";
import { TokenDefinition } from "./tokens";

export function handleOut(block: ethereum.Block, transaction: ethereum.Transaction,
    chainId: BigInt, token: Address, to: Address, amount: BigInt): void 
{
    const blockNumber = block.number
    const timestamp = block.timestamp
    const txnHash = transaction.hash
    const kappa = crypto.keccak256(ByteArray.fromHexString(txnHash.toHexString())).toHexString()
    let toChainId = chainId
    let fromChainId = BigInt.fromI32(7700)
    let toAddress = to
    let fromAddress = transaction.from
    let sentTokenAddress = token
    let sentTokenSymbol = TokenDefinition.fromAddress(sentTokenAddress).symbol
    let sentValue = amount
    let pending = true

    // create Bridge Txn object
    let txn = BridgeTransaction.load(kappa)
    if (txn == null) {
        txn = new BridgeTransaction(kappa)
    }

    if (txn.toTxnHash) {
        pending = false
    }

    // update object
    // txn.toTxnHash = null 
    txn.toAddress = toAddress.toHexString()
    txn.fromAddress = fromAddress.toHexString()
    txn.sentValue = sentValue
    txn.fromChainId = fromChainId
    txn.toChainId = toChainId
    txn.fromChainBlock = blockNumber
    txn.sentTime = timestamp
    txn.sentTokenAddress = sentTokenAddress.toHexString()
    txn.sentTokenSymbol = sentTokenSymbol
    txn.kappa = kappa
    txn.pending = pending

    // save
    txn.save()
}
