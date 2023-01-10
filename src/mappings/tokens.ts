import {
  Address,
  BigInt,
} from "@graphprotocol/graph-ts"

// Initialize a Token Definition with the attributes
export class TokenDefinition {
  address : Address
  symbol: string
  name: string
  decimals: BigInt

  // Initialize a Token Definition with its attributes
  constructor(address: Address, symbol: string, name: string, decimals: BigInt) {
    this.address = address
    this.symbol = symbol
    this.name = name
    this.decimals = decimals
  }

  // Get all tokens with a static defintion
  static getStaticDefinitions(): Array<TokenDefinition> {
    let staticDefinitions = new Array<TokenDefinition>(0)

    // 1. Add Note
    let tokenNote = new TokenDefinition(
      Address.fromString('0x4e71a2e537b7f9d9413d3991d37958c0b5e1e503'),
      'NOTE',
      'NOTE',
      BigInt.fromI32(18)
    );
    staticDefinitions.push(tokenNote);

    // 2. Add USDC
    let tokenUsdc = new TokenDefinition(
      Address.fromString('0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd'),
      'USDC',
      'USDC',
      BigInt.fromI32(6)
    );
    staticDefinitions.push(tokenUsdc);

    // 3. Add USDT
    let tokenUsdt = new TokenDefinition(
      Address.fromString('0xd567b3d7b8fe3c79a1ad8da978812cfc4fa05e75'),
      'USDT',
      'USDT',
      BigInt.fromI32(6)
    );
    staticDefinitions.push(tokenUsdt);

    // 4. Add ATOM
    let tokenAtom = new TokenDefinition(
      Address.fromString('0xeceeefcee421d8062ef8d6b4d814efe4dc898265'),
      'ATOM',
      'ATOM',
      BigInt.fromI32(6)
    );
    staticDefinitions.push(tokenAtom);

    // 5. Add ETH
    let tokenEth = new TokenDefinition(
      Address.fromString('0x5fd55a1b9fc24967c4db09c513c3ba0dfa7ff687'),
      'ETH',
      'ETH',
      BigInt.fromI32(18)
    );
    staticDefinitions.push(tokenEth);

    // 6. Add wCANTO
    let tokenWeth = new TokenDefinition(
      Address.fromString('0x826551890dc65655a0aceca109ab11abdbd7a07b'),
      'wCANTO',
      'wCANTO',
      BigInt.fromI32(18)
    );
    staticDefinitions.push(tokenWeth);

    // 7. Add nUSD
    let tokenNUSD = new TokenDefinition(
        Address.fromString('0xd8836af2e565d3befce7d906af63ee45a57e8f80'),
        'nUSD',
        'Nexus USD',
        BigInt.fromI32(18)
      );
      staticDefinitions.push(tokenNUSD);

    return staticDefinitions
  }

  // Helper for hardcoded tokens
  static fromAddress(tokenAddress: Address): TokenDefinition {
    let staticDefinitions = this.getStaticDefinitions()
    let tokenAddressHex = tokenAddress.toHexString()

    // Search the definition using the address
    for (let i = 0; i < staticDefinitions.length; i++) {
      if(staticDefinitions[i].address.toHexString() == tokenAddressHex) {
        return staticDefinitions[i]
      }
    }

    // If not found, return null
    return new TokenDefinition(
        Address.fromString('0xd000000000000000000000000000000000000000'),
        '',
        '',
        BigInt.fromI32(0)
      );
  }

}