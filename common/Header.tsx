import { AccountConnect } from '@cardinal/namespaces-components'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  useWalletModal,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui'
import { GlyphWallet } from 'assets/GlyphWallet'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { maxWidth, styled } from '@mui/system'

import { Airdrop } from './Airdrop'
import { ButtonSmall } from './ButtonSmall'
import { contrastColorMode } from './utils'
import { asWallet } from './Wallets'
import router from 'next/router'
export const StyledWalletButton = styled(WalletMultiButton)`
  color: black;
  &:hover {
    background: #c1bbaf !important;
  }
  .wallet-adapter-button {
    padding: 0px;
    color: black;
  }
`
export const TitleText = styled('div')`
  @media (max-width: 550px) {
    font-size: 14px;
  }
`

export const WalletAmount = styled('div')`
  color: black;
  width: auto;
  padding: 5px 5px 5px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 22px;
  background-color: var(--main-text-color);
  box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
    0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`
export const Header = () => {
  const { environment, secondaryConnection } = useEnvironmentCtx()
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const stakePoolId = useStakePoolId()
  const { data: stakePoolMetadata } = useStakePoolMetadata()

  return (
    <div>
      <div className="bg-white">
        <div
          className={`mx-auto flex h-20 max-w-7xl justify-between px-2 text-black`}
        >
          <div className="z-50 -mt-1 flex items-center gap-3">
            <a
              target="_blank"
              href="https://magiceden.io/marketplace/SovereignNFT"
              className="flex cursor-pointer text-xl font-semibold text-black hover:text-gray-300"
            >
              <img className=" g:w-80 w-head" src="mainlogo.png" />
            </a>
            {environment.label !== 'mainnet-beta' && (
              <div className="cursor-pointer rounded-md bg-[#9945ff] p-1 text-[10px] italic text-black">
                {environment.label}
              </div>
            )}
            {environment.label !== 'mainnet-beta' ? (
              <div className="mt-0.5">
                <Airdrop />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="relative z-50 my-auto flex items-center align-middle">
            {stakePoolId && stakePoolMetadata ? (
              stakePoolMetadata.links?.map((link) => (
                <a className="" key={link.value} href={link.value}>
                  <p className="z-50 my-auto mr-10 hover:cursor-pointer">
                    {link.text}
                  </p>
                </a>
              ))
            ) : (
              <>
                <div
                  className="text-black"
                  onClick={() =>
                    router.push(
                      `/${
                        environment.label !== 'mainnet-beta'
                          ? `?cluster=${environment.label}`
                          : ''
                      }`
                    )
                  }
                ></div>
              </>
            )}

            {wallet.connected && wallet.publicKey ? (
              <StyledWalletButton
                style={{
                  color: 'black',
                  fontSize: '14px',
                  zIndex: 50,
                  height: '38px',
                  background: 'none',
                  backgroundColor: 'none',
                }}
              />
            ) : (
              <StyledWalletButton
                style={{
                  color: 'black',
                  fontSize: '14px',
                  zIndex: 50,
                  height: '38px',
                  background: 'none',
                  backgroundColor: 'none',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
