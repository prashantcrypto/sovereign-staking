import styled from '@emotion/styled'
import { FooterSlim } from 'common/FooterSlim'
import Head from 'next/head'
import Link from 'next/link';


const CollectionView=styled.div`
width:fit-content;
height:fit-content;
border-radius:0.7em;
margin:auto;
border:5px solid white;
img{
  margin:1em;
  border:3px solid white;
  border-radius:50px;
  padding:0.6em;
}
h1{
  text-align:center;
  font-size:2em;
  margin:0.5em 0em;
  font-weight:bold;
  text-tranform:capitalize;
}
`
function Homepage() {

  return (
    <div className="bg-dark-5">
      <Head>
        <title>SOVEREIGN NFT STAKING</title>
        <meta name="title" content="SOVEREIGN NFT STAKING" />
        <meta
          name="description"
          content="Stake your SOVEREIGN NFT To get $SQRE "
        />
        <link rel="icon" href={'/mainlogo.png'} />
      </Head>

      <div className="mx-auto flex flex-row gap-16 px-8 md:px-16 my-5">
      <Link href="/sovereignstake">

        <CollectionView>
        <img src="./mainlogo.png" alt="" />
        <h1>STAKE SOVEREIGN NFT</h1>
        </CollectionView>
      </Link>
      </div>
      <FooterSlim />
    </div>
  )
}

export default Homepage
