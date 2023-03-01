import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { Airdrop } from './Airdrop'
export const Header = () => {
  const { environment, secondaryConnection } = useEnvironmentCtx()
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const { data: stakePoolId } = useStakePoolId()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  return (
    <div>
      <div
        className={`mb-5 flex flex-wrap justify-center gap-6 px-10 pt-5 text-white md:justify-between`}
        style={{ color: stakePoolMetadata?.colors?.fontColor }}
      >
        <div className="flex items-center gap-3">
          <a
            target="_blank"
            href={
              stakePoolMetadata?.websiteUrl ||
              `/${
                environment.label !== 'mainnet-beta'
                  ? `?cluster=${environment.label}`
                  : ''
              }`
            }
            className="flex cursor-pointer text-xl font-semibold"
            rel="noreferrer"
          >
            {stakePoolMetadata?.secondaryImageUrl && (
              <div className="ml-2 flex flex-row">
                <img
                  className="flex h-[35px] flex-col"
                  src={stakePoolMetadata?.secondaryImageUrl}
                  alt={stakePoolMetadata?.secondaryImageUrl}
                />
                {stakePoolMetadata.nameInHeader && (
                  <span
                    className="ml-5 mt-1 flex flex-col"
                    style={{ color: stakePoolMetadata?.colors?.fontColor }}
                  >
                    {stakePoolMetadata?.displayName}
                  </span>
                )}
              </div>
            )}
          </a>
          {environment.label !== 'mainnet-beta' && (
            <div className="cursor-pointer rounded-md bg-[#9945ff] p-1 text-[10px] italic text-white">
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
        <div className="relative my-auto flex flex-wrap items-center justify-center gap-y-6 align-middle">
          <div className="mr-10 flex flex-wrap items-center justify-center gap-8">
            {stakePoolId &&
              stakePoolMetadata &&
              stakePoolMetadata.links?.map((link) => (
                <a
                  key={link.value}
                  href={link.value}
                  className="cursor-pointer transition-all hover:opacity-80"
                >
                  <p style={{ color: stakePoolMetadata?.colors?.fontColor }}>
                    {link.text}
                  </p>
                </a>
              ))}
          </div>
          {wallet.connected && wallet.publicKey ? (
            <WalletMultiButton style={{background:'grey'}}/>
          ) : (
            <WalletMultiButton style={{background:'grey'}}/>
          )}
        </div>
      </div>
    </div>
  )
}
