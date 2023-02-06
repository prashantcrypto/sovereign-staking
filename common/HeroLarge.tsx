import { shortPubKey } from '@cardinal/namespaces-components'
import { css } from '@emotion/react'
import { StakePoolConfig } from 'components/StakePoolConfig'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'

import { StakePoolImage } from '@/components/StakePoolImage'

import { HeroStats } from '../components/hero-stats/HeroStats'

export const HeroLarge: React.FC = () => {
  const stakePoolId = useStakePoolId()
  const { data: config } = useStakePoolMetadata()
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
      <div className="flex w-3/4 grow-[2] flex-col pt-4">
        <div className="mb-6 flex flex-col gap-6">
        </div>
        <HeroStats />
      </div>
    </div>
  )
}
