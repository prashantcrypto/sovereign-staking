import { Footer } from 'common/Footer'
import { FooterSlim } from 'common/FooterSlim'
import { Header } from 'common/Header'
import { HeroLarge } from 'common/HeroLarge'
import { contrastColorMode } from 'common/utils'
import { StakePoolLeaderboard } from 'components/StakePoolLeaderboard'
import { StakePoolNotice } from 'components/StakePoolNotice'
import { useStakePoolData } from 'hooks/useStakePoolData'
import { useUserRegion } from 'hooks/useUserRegion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'
import { useState } from 'react'

import { StakedTokens } from '@/components/token-staking/staked-tokens/StakedTokens'
import { UnstakedTokens } from '@/components/token-staking/unstaked-tokens/UnstakedTokens'

type PANE_OPTIONS = 'dashboard' | 'leaderboard'
const paneTabs: {
  label: React.ReactNode
  value: PANE_OPTIONS
  disabled?: boolean
  tooltip?: string
}[] = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    tooltip: 'View your personal dashboard',
  },
  {
    label: 'Leaderboard',
    value: 'leaderboard',
    tooltip: 'View top users in this pool',
  },
]

function StakePoolHome(props: { stakePoolMetadataName: string | null }) {
  const router = useRouter()
  const { isFetched: stakePoolLoaded } = useStakePoolData()
  const userRegion = useUserRegion()
  const [pane, setPane] = useState<PANE_OPTIONS>('dashboard')
  const stakePoolDisplayName = props.stakePoolMetadataName
    ? props.stakePoolMetadataName.replace(' Staking', '') + ' Staking'
    : 'SOVEREIGN NFT Staking'

  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()

  if (stakePoolMetadata?.redirect) {
    router.push(stakePoolMetadata?.redirect)
    return <></>
  }

  if (
    !stakePoolLoaded ||
    (stakePoolMetadata?.disallowRegions?.length &&
      stakePoolMetadata?.disallowRegions.length > 0 &&
      !userRegion.isFetched)
  ) {
    return (
      <>
        <Head>
          <title>{stakePoolDisplayName}</title>
          <meta name="title" content={stakePoolDisplayName} />
          <meta
            name="description"
            content={
              props.stakePoolMetadataName
                ? 'Stake your ' +
                  props.stakePoolMetadataName.replace(' Staking', '') +
                  ' NFTs powered by Cardinal Staking'
                : 'Stake your Solana NFTs powered by Cardinal Staking'
            }
          />
        </Head>
      </>
    )
  }

  if (
    stakePoolMetadata?.disallowRegions &&
    stakePoolMetadata?.disallowRegions.length > 0 &&
    !userRegion.data?.isAllowed &&
    !process.env.BYPASS_REGION_CHECK
  ) {
    return (
      <div
        className="flex min-h-screen flex-col"
        style={{
          background: stakePoolMetadata?.colors?.primary,
          backgroundSize: 'cover',
          backgroundImage: `url(${stakePoolMetadata?.backgroundImage})`,
        }}
      >
        <Header />
        <div className="flex grow items-center justify-center">
          <div className="w-[600px] max-w-[95vw] rounded-xl bg-black bg-opacity-50 p-10 text-center">
            <div className="text-2xl font-bold">
              Users from Country ({userRegion.data?.countryName}) are not
              Eligible to Participate
            </div>
            <div className="mt-8 text-sm text-light-2">
              It is prohibited to use certain services offered by Parcl if you
              are a resident of, or are located, incorporated, or have a
              registered agent in, {userRegion.data?.countryName} or any other
              jurisdiction where the Services are restricted.
            </div>
          </div>
        </div>
        <FooterSlim />
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{stakePoolDisplayName}</title>
        <meta name="title" content={stakePoolDisplayName} />
        <meta
          name="description"
          content={
            props.stakePoolMetadataName
              ? 'Stake your ' +
                props.stakePoolMetadataName.replace(' Staking', '') +
                ' NFTs powered by Cardinal Staking'
              : 'Stake your Solana NFTs powered by Cardinal Staking'
          }
        />
      </Head>
      <Header />
      <div
        className="relative z-0 mx-10 mt-4 mb-8 flex flex-col gap-4"
        style={{
          ...stakePoolMetadata?.styles,
          color:
            stakePoolMetadata?.colors?.fontColor ??
            contrastColorMode(
              stakePoolMetadata?.colors?.primary || '#000000'
            )[0],
        }}
      >
        <HeroLarge />
        {
          {
            dashboard: (
              <div className="flex flex-col gap-4">
                <StakePoolNotice />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <UnstakedTokens />
                  <StakedTokens />
                </div>
              </div>
            ),
            leaderboard: <StakePoolLeaderboard />,
          }[pane]
        }
      </div>
      {!stakePoolMetadata?.hideFooter ? (
        <Footer bgColor={stakePoolMetadata?.colors?.primary} />
      ) : (
        <div className="h-24"></div>
      )}
    </div>
  )
}

export default StakePoolHome
