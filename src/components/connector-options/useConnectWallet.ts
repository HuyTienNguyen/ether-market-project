import Web3 from "web3";
import { useAppDispatch } from "../../hooks/hooks";
import { Wallet } from "../../constants/wallet";
import { hideModalConnect } from "../../stores/modal/slice";
import {
  injectedConnector,
  supportedChainIdsArray,
} from "../../utils/connectors";

function useConnectWallets() {
  const dispatch = useAppDispatch();
  const handleConnectWallet = async (typeWallet: number, activate: any) => {
    switch (typeWallet) {
      case Wallet.METAMASK:
        if (window.ethereum) {
          const chainIdCurrent =
            (await getChainIdCurrent(Wallet.METAMASK)) || 1;
          const isChainIdExists =
            supportedChainIdsArray.includes(chainIdCurrent);
          const connector = injectedConnector(
            Wallet.METAMASK,
            !isChainIdExists ? chainIdCurrent : null
          );
          activate(connector);
          dispatch(hideModalConnect());
        } else {
          alert("Metamask not detected");
        }
        break;
      case Wallet.BINANCE:
        if (window.BinanceChain) {
          const chainIdCurrent = (await getChainIdCurrent(Wallet.BINANCE)) || 1;
          const isChainIdExists =
            supportedChainIdsArray.includes(chainIdCurrent);
          const connector = injectedConnector(
            Wallet.BINANCE,
            !isChainIdExists ? chainIdCurrent : null
          );
          activate(connector);
          dispatch(hideModalConnect());
        } else {
          alert("Binance not detected");
        }

        break;
      default:
        alert("Vi nay chua duoc ho tro");
    }
  };

  async function getChainIdCurrent(
    typeWallet: number
  ): Promise<number | undefined> {
    let chainId;
    try {
      switch (typeWallet) {
        case Wallet.METAMASK:
          const chainIdMetamask = await window.ethereum.request({
            method: "eth_chainId",
          });
          chainId = parseInt(chainIdMetamask, 16);
          break;
        case Wallet.BINANCE:
          const binanceWeb3 = new Web3(window.BinanceChain);
          const chainIdBinance = await binanceWeb3.eth.getChainId();
          chainId = parseInt(chainIdBinance.toString());
          break;
        default:
          alert("error");
      }
    } catch (error) {
      console.error(error);
    }
    return chainId;
  }

  return [handleConnectWallet];
}

export default useConnectWallets;
