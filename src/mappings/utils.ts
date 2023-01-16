import { Address, BigInt, ByteArray, Bytes, crypto, ethereum, log } from "@graphprotocol/graph-ts";
import { BridgeTransaction } from "../../generated/schema";
import { BasePool } from '../../generated/SynapseBridge/BasePool'
import { MintAndSwapCall__Inputs } from "../../generated/SynapseBridge/SynapseBridge";

export const CHAIN_ID = BigInt.fromI32(7700)
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

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

// 
function parseLogsErc20(lg: Bytes): ethereum.Value | null {
    // from, to, value
    let decoded = ethereum.decode('(address,address,uint256)', lg)
    return decoded
}

export function getReceivedValue(amount: BigInt, token: Address, receipt: ethereum.TransactionReceipt): BigInt {
    if (amount !== null) {
        return amount
    }

    for(var ix = 0; ix < receipt.logs.length; ix++) {
        let lg = receipt.logs[ix]
        if (lg.address == token) {
            let decoded = parseLogsErc20(lg.data)
            if (decoded == null) {
                log.info("LOG NULL DECODE :: {} {}", [lg.address.toHexString(), lg.data.toHexString()])
            } else {
                return decoded!.toTuple()[2].toBigInt()
            }
        }
    }
  
    return BigInt.fromI32(-1)
}

// 

export function getSwapPoolCoinAddresses(poolAddress: Address, index: i32): Address {
    let contract = BasePool.bind(poolAddress)
    let addressValue = Address.fromString(ADDRESS_ZERO)
    let addressResult = contract.try_getToken(index)
    if (addressResult.reverted) {
        log.info("try_getToken::REVERTED Could not find received token {} {}", [poolAddress.toHexString(), index.toString()])
        return Address.fromString(ADDRESS_ZERO)
    } else {
        addressValue = addressResult.value
    }
    return addressValue
}

export function getReceivedToken(kappa: string, pool: Address, swapSuccess: bool, tokenIndexTo: i32, token: Address): Address {
    if (swapSuccess) {
        if (tokenIndexTo !== null) {
            return getSwapPoolCoinAddresses(pool, tokenIndexTo)
        } else if (token !== null) {
            return token
        } else {
            log.info("Could not find received token for txn with kappa {}", [kappa])
            return Address.fromString(ADDRESS_ZERO)
        }
    } else {
        return getSwapPoolCoinAddresses(pool, 0)
    }
}


export function getPoolAddress(type: string, input: Bytes): Address {
    // withdrawAndRemove
    // to, token, amount, fee, pool, swapTokenIndex, swapMinAmount, swapDeadline, kappa
    let withdrawAndRemoveTypestring = '(address,address,uint256,uint256,address,uint8,uint256,uint256,bytes32)'
    // mintAndSwap
    // to, token, amount, fee, pool, tokenIndexFrom, tokenIndexTo, minDy, deadline, kappa
    let mintAndSwapTypestring = '(address,address,uint256,uint256,address,uint8,uint8,uint256,uint256,bytes32)'

    let typestring = withdrawAndRemoveTypestring
    if (type == "handleTokenMintAndSwap") {
        typestring = mintAndSwapTypestring
    }
    // remove '0x' + 8 characters (first 4 bytes) holding function signature
    let inputBytes = Bytes.fromHexString('0x'+input.toHexString().substring(10))
    let decoded = ethereum.decode(typestring, inputBytes)
    if (decoded == null) {
        log.info("POOL DECODED NULL :: {} {} {} {}", [type, typestring, input.toHexString(), input.toHexString().substring(10,-1)])
        return Address.fromString("0x07379565cd8b0cae7c60dc78e7f601b34af2a21c")
    } else {
        return decoded!.toTuple()[4].toAddress()
    }
}
