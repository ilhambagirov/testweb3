import { observer } from "mobx-react-lite";
import {
    configureChains,
    createClient,
    goerli,
    WagmiConfig,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { DepositModule } from "./deposit";

export const WagmiClientModule = observer(() => {
    const { chains, provider, webSocketProvider } = configureChains(
        [goerli],
        [publicProvider()],
    )

    const client = createClient({
        autoConnect: true,
        provider,
        webSocketProvider,
    })

    return (
        <WagmiConfig client={client}>
            <DepositModule />
        </WagmiConfig >
    );
})