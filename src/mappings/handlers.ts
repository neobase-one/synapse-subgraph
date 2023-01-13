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
} from "../../generated/SynapseBridge/SynapseBridge"
import { log } from "@graphprotocol/graph-ts"

export function handleTokenDeposit(event: TokenDeposit): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.GOVERNANCE_ROLE(...)
  // - contract.NODEGROUP_ROLE(...)
  // - contract.WETH_ADDRESS(...)
  // - contract.bridgeVersion(...)
  // - contract.chainGasAmount(...)
  // - contract.getFeeBalance(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.hasRole(...)
  // - contract.kappaExists(...)
  // - contract.paused(...)
  // - contract.startBlockNumber(...)
}

export function handleTokenDepositAndSwap(event: TokenDepositAndSwap): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenMint(event: TokenMint): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenMintAndSwap(event: TokenMintAndSwap): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenRedeem(event: TokenRedeem): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenRedeemAndRemove(event: TokenRedeemAndRemove): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenRedeemAndSwap(event: TokenRedeemAndSwap): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenWithdraw(event: TokenWithdraw): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}

export function handleTokenWithdrawAndRemove(
  event: TokenWithdrawAndRemove
): void {
  log.info("Tx from receipt: {}", [event.receipt!.transactionHash.toHexString()]) 
}
