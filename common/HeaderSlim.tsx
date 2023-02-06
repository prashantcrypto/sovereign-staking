import { AccountConnect } from '@cardinal/namespaces-components'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GlyphWallet } from 'assets/GlyphWallet'
import { LogoTitled } from 'assets/LogoTitled'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useEffect, useState } from 'react'

import { Airdrop } from './Airdrop'
import { ButtonSmall } from './ButtonSmall'
import { withCluster } from './utils'
import { asWallet } from './Wallets'

export const HeaderSlim = () => {
  const router = useRouter()
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const { secondaryConnection, environment } = useEnvironmentCtx()
  const [tab, setTab] = useState<string>('browse')

  useEffect(() => {
    const anchor = router.asPath.split('#')[1]
    if (anchor !== tab) setTab(anchor || 'browse')
  }, [router.asPath, tab])

  return (
    <div className="w-full px-4 py-4">
    </div>
  )
}
