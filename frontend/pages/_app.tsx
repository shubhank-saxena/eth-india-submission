import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PersonaContext,
  PersonaProvider,
} from "../src/contexts/PersonaContext";
import { PersonaSummaryProvider } from "../src/contexts/PersonaSummaryContext";
function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [alchemyProvider({ apiKey: "7FyDGuRpmCfej2lSoIqt8tOWpJnIPMRG" })]
  );
  const { connectors } = getDefaultWallets({
    appName: "Segmentation",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: connectors,
    provider,
  });

  return (
    <PersonaProvider>
      <PersonaSummaryProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            modalSize="compact"
            theme={darkTheme()}
          >
            <Component {...pageProps} />
            <ToastContainer />
          </RainbowKitProvider>
        </WagmiConfig>
      </PersonaSummaryProvider>
    </PersonaProvider>
  );
}

export default MyApp;
