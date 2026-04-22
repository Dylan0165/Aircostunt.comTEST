import Hero from '../components/Hero'
import USPBar from '../components/USPBar'
import Brands from '../components/Brands'
import Reviews from '../components/Reviews'
import { BRANDS } from '../data/staticData'

export default function Home() {
  return (
    <>
      <Hero />
      <USPBar />
      <Brands brands={BRANDS} />
      <Reviews />
    </>
  )
}
