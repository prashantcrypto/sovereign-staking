import { BN } from '@project-serum/anchor'
import {
  formatAmountAsDecimal,
  formatMintNaturalAmountAsDecimal,
} from 'common/units'
import { pubKeyUrl } from 'common/utils'
import { useHandleClaimRewards } from 'handlers/useHandleClaimRewards'
import { useRewardDistributorData } from 'hooks/useRewardDistributorData'
import { useRewardMintInfo } from 'hooks/useRewardMintInfo'
import { useRewards } from 'hooks/useRewards'
import { useRewardsRate } from 'hooks/useRewardsRate'
import { useStakedTokenDatas } from 'hooks/useStakedTokenDatas'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolMetadataCtx } from 'providers/StakePoolMetadataProvider'

export const PerformanceStats: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { environment } = useEnvironmentCtx()
  const rewardDistributorData = useRewardDistributorData()
  const rewardMintInfo = useRewardMintInfo()
  const rewardsRate = useRewardsRate()
  const { data: stakePoolMetadata } = useStakePoolMetadataCtx()
  const stakedTokenDatas = useStakedTokenDatas()
  const rewards = useRewards()
  const handleClaimRewards = useHandleClaimRewards()

  if (!rewardDistributorData.data) return <></>
  return (
    <div
      className={`flex flex-col flex-wrap justify-between gap-5 md:flex-row ${
        stakePoolMetadata?.colors?.fontColor ? '' : 'text-gray-200'
      } ${className}`}
    >
      <div className="flex flex-row items-center justify-center gap-2">
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-lg text-medium-4">
          {rewardDistributorData.data.parsed?.maxRewardSecondsReceived?.eq(
            new BN(1)
          )
            ? '1x Claim:'
            : 'Rate:'}
        </p>
        {!rewardsRate.data || !rewardMintInfo.data ? (
          <div className="h-6 w-10 animate-pulse rounded-md bg-border"></div>
        ) : (
          <div
            className="text-center text-lg text-light-1"
            style={{ color: stakePoolMetadata?.colors?.fontColor }}
          >
            {formatAmountAsDecimal(
              rewardMintInfo.data.mintInfo.decimals,
              rewardsRate.data.dailyRewards,
              // max of 5 decimals
              Math.min(rewardMintInfo.data.mintInfo.decimals, 5)
            )}{' '}
            <a
              className="underline"
              style={{
                color: stakePoolMetadata?.colors?.fontColor
                  ? stakePoolMetadata?.colors?.fontColor
                  : 'white',
              }}
              target="_blank"
              href={pubKeyUrl(
                rewardDistributorData.data.parsed?.rewardMint,
                environment.label
              )}
              rel="noreferrer"
            >
              {rewardMintInfo.data.tokenListData?.symbol ||
                "SQUARE" ||
                'SQUARE'}
            </a>{' '}
            {rewardDistributorData.data.parsed?.maxRewardSecondsReceived?.eq(
              new BN(1)
            )
              ? ''
              : '/ Day'}
          </div>
        )}
      </div>
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
              "SQUARE" ||
              '???'}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        
      </div>
    </div>
  )
}
