import { TokenDeposit, TokenDepositAndSwap, TokenMint, TokenMintAndSwap, TokenRedeem, TokenRedeemAndRemove, TokenRedeemAndSwap, TokenWithdraw, TokenWithdrawAndRemove } from '../../generated/SynapseBridge/SynapseBridge'
import { handleOut } from './utils'

// IN
export function handleTokenMintAndSwap(event: TokenMintAndSwap): void {}
export function handleTokenMint(event: TokenMint): void {}
export function handleTokenWithdrawAndRemove(event: TokenWithdrawAndRemove): void {}
export function handleTokenWithdraw(event: TokenWithdraw): void {}

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
