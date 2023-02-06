import { Banner } from 'common/Banner'
import { FooterSlim } from 'common/FooterSlim'
import { useAllStakePools } from 'hooks/useAllStakePools'
import Head from 'next/head'

import { CollectionsView } from './CollectionsView'

function Homepage() {
  const allStakePools = useAllStakePools()

  return (
    <div className="bg-dark-5">
      <Head>
        <title>Sovereign stake</title>
        <meta name="title" content="sovereign stake" />
        <meta
          name="description"
          content="
          sovereign-staking"
        />
        <link rel="icon" href={'/mainlogo.png'} />
        <script
          defer
          data-domain="stake.cardinal.so"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>

      <Banner />
      <div className="mx-auto flex flex-col gap-16 px-8 md:px-16">
        <CollectionsView
          configs={allStakePools.data?.stakePoolsWithMetadata.filter(
            (pool) =>
              !(
                pool.stakePoolMetadata?.hidden ||
                pool.stakePoolMetadata?.notFound
              )
          )}
        />
      </div>
      <FooterSlim />
    </div>
  )
}

export default Homepage
