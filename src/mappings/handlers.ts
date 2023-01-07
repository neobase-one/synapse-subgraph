import { TokenDeposit, TokenDepositAndSwap, TokenMint, TokenMintAndSwap, TokenRedeem, TokenRedeemAndRemove, TokenRedeemAndSwap, TokenWithdraw, TokenWithdrawAndRemove } from '../../generated/SynapseBridge/SynapseBridge'

// IN
export function handleTokenMintAndSwap(event: TokenMintAndSwap): void {}
export function handleTokenMint(event: TokenMint): void {}
export function handleTokenWithdrawAndRemove(event: TokenWithdrawAndRemove): void {}
export function handleTokenWithdraw(event: TokenWithdraw): void {}

// OUT
export function handleTokenRedeemAndSwap(event: TokenRedeemAndSwap): void {}
export function handleTokenRedeemAndRemove(event: TokenRedeemAndRemove): void {}
export function handleTokenRedeem(event: TokenRedeem): void {}
export function handleTokenDepositAndSwap(event: TokenDepositAndSwap): void {}
export function handleTokenDeposit(event: TokenDeposit): void {}
