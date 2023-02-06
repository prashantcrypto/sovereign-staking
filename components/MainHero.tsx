import { HeaderSlim } from 'common/HeaderSlim'
import { useAllStakePools } from 'hooks/useAllStakePools'
import { useStat } from 'hooks/useStat'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'


export const MainHero = () => {
  const { environment } = useEnvironmentCtx()
  const allStakePools = useAllStakePools()
  const totalStakedTokens = useStat('total-active-staked-tokens')
  const router = useRouter()
  return (
    <div className="relative z-0 text-sm">
      <div className="blur-4xl absolute left-8 top-52 -z-10 h-[120px] w-[400px] -rotate-[60deg] bg-glow blur-[100px]" />
      <div className="blur-4xl absolute -right-20 top-72 -z-10 h-[100px] w-[550px] -rotate-[60deg] bg-glow blur-[120px]" />
      <HeaderSlim />
    </div>
  )
}
