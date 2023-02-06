import { BN } from '@project-serum/anchor'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useStakePoolEntries } from 'hooks/useStakePoolEntries'
import { useStakePoolMaxStaked } from 'hooks/useStakePoolMaxStaked'
import { useStakePoolTotalStaked } from 'hooks/useStakePoolTotalStaked'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

import { RewardsRate } from '@/components/hero-stats/RewardsRate'
import { TreasuryBalance } from '@/components/hero-stats/TreasuryBalance'
import { useRewardMintInfo } from 'hooks/useRewardMintInfo'
import { useRewardsRate } from 'hooks/useRewardsRate'
import { formatMintNaturalAmountAsDecimal } from 'common/units'
import { useRewards } from 'hooks/useRewards'

export const HeroStats: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const rewardDistributorData = useRewardDistributorData()
  const rewardMintInfo = useRewardMintInfo()
  const rewardsRate = useRewardsRate()
  const stakePoolEntries = useStakePoolEntries()
  const { data: maxStaked } = useStakePoolMaxStaked()
  const totalStaked = useStakePoolTotalStaked()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()
  const rewards = useRewards()

  return (
    <div
      className={`flex w-full flex-col flex-wrap gap-y-5 rounded-xl px-12 py-6 md:flex-row ${
        stakePoolMetadata?.colors?.fontColor ? '' : 'text-gray-200'
      } justify-evenly bg-white bg-opacity-5 ${className}`}
      style={{
        background: stakePoolMetadata?.colors?.backgroundSecondary,
        border: stakePoolMetadata?.colors?.accent
          ? `2px solid ${stakePoolMetadata?.colors?.accent}`
          : '',
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="text-lg text-medium-4"
          style={{ color: stakePoolMetadata?.colors?.fontColorTertiary }}
        >
          Total Staked
        </div>
        {!totalStaked.isFetched ? (
          <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
        ) : (
          <div
            className="text-center text-xl text-light-1"
            style={{ color: stakePoolMetadata?.colors?.fontColor }}
          >
            {totalStaked.data?.toLocaleString()}{' '}
            {stakePoolMetadata?.maxStaked
              ? `/ ${stakePoolMetadata?.maxStaked.toLocaleString()}`
              : '/ 1612'}
          </div>
        )}
      </div>
     
      {rewardDistributorData.data && (
        <>
          <div className="mx-6 my-auto hidden h-10 w-[1px] bg-border md:flex"></div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p
              className="text-lg text-medium-4"
              style={{ color: stakePoolMetadata?.colors?.fontColorTertiary }}
            >
              {rewardDistributorData.data.parsed?.maxRewardSecondsReceived?.eq(
                new BN(1)
              )
                ? '1x Claim'
                : 'Rewards Rate'}
            </p>
            <RewardsRate />
          </div>
          <div className="mx-6 my-auto hidden h-10 w-[1px] bg-border md:flex"></div>

          <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-lg text-medium-4">Earnings:</p>
        {!rewards.data || !rewardMintInfo.data ? (
          <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
        ) : (
          <div
            className="text-center text-lg text-light-1"
            style={{ color: stakePoolMetadata?.colors?.fontColor }}
          >
            {formatMintNaturalAmountAsDecimal(
              rewardMintInfo.data.mintInfo,
              rewards.data?.claimableRewards,
              Math.min(rewardMintInfo.data.mintInfo.decimals, 6)
            )}{' '}
            {rewardMintInfo.data.tokenListData?.name ||
              "SQRE" ||
              '???'}
          </div>
        )}
      </div>

          <div className="mx-6 my-auto hidden h-10 w-[1px] bg-border md:flex"></div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p
              className="text-lg text-medium-4"
              style={{ color: stakePoolMetadata?.colors?.fontColorTertiary }}
            >
              Treasury Balance
            </p>
            <TreasuryBalance className="text-center text-xl text-light-1" />
          </div>
        </>
      )}
      
    </div>
  )
}
