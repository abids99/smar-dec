export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'
export const GREEN = 'success'
export const RED = 'danger'


export const DECIMALS = (10**18)

// Wei to ether without web3
export const ether = (wei) => {
	if(wei) {
		return(wei / DECIMALS) // 18 decimal places
	}
}

// token & ether == 18 deci
export const tokens = ether

export const formatBalance = (balance) => {
	const precision =100 // 2 decimal places

	balance = ether(balance)
	balance = Math.round(balance * precision) / precision // Use 2 decimal places
	
	return balance
}
