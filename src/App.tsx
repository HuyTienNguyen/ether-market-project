import "./App.css";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import PageHome from "./pages/home";
import { Provider } from "react-redux";
import store from "./stores";
import { ethers } from "ethers";
import { RecoilRoot } from 'recoil';

declare global {
  interface Window {
    ethereum?: any;
    BinanceChain?: any;
  }
}

function getLibrary(provider: any): Web3Provider {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <RecoilRoot>
            <PageHome />
          </RecoilRoot>
        </Web3ReactProvider>
      </Provider>
    </>
  );
}

export default App;
