import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, optimism, goerli, bsc } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, goerli, bsc ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [goerli.id]: http(),
    [bsc.id]: http(),
  },
})