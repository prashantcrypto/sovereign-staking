import { shortPubKey } from '@cardinal/namespaces-components'
import { css } from '@emotion/react'
import { StakePoolConfig } from 'components/StakePoolConfig'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { FeeInfo } from '@/components/fee-info/FeeInfo'
import { StakePoolImage } from '@/components/StakePoolImage'

import { HeroStats } from '../components/hero-stats/HeroStats'

export const HeroLarge: React.FC = () => {
  const { data: stakePoolId } = useStakePoolId()
  const { data: config } = useStakePoolMetadataCtx()
  return (
    <div className="relative flex w-full flex-wrap items-stretch justify-center gap-8 py-8 lg:flex-nowrap lg:justify-between lg:gap-24">
      <div
        className="blur-4xl invisible absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] blur-[120px] md:visible lg:visible xl:visible"
        css={css`
          background-color: ${config?.colors?.accent};
        `}
      />
      <div
        className="blur-4xl invisible absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] blur-[120px] md:visible lg:visible xl:visible"
        css={css`
          background-color: ${config?.colors?.accent};
        `}
      />
        <HeroStats />
    </div>
  )
}
