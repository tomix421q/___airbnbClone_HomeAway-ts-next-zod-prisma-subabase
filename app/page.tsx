import LoadingCards from '@/components/card/LoadingCards'
import CategoriesList from '@/components/home/CategoriesList'
// import PropertiesContainer from '@/components/home/PropertiesContainer'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

//nacitanie loading pri server side componente
const PropertiesContainer = dynamic(() => import('@/components/home/PropertiesContainer'), {
  loading: () => <LoadingCards />,
  ssr: false,
})

function HomePage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  // console.log(searchParams)
  return (
    <section>
      <CategoriesList category={searchParams?.category} search={searchParams?.search} />

      {/* nacitanie loadingu pri client side [Suspense] */}
      {/* <Suspense fallback={<LoadingCards />}> */}
      <PropertiesContainer category={searchParams?.category} search={searchParams?.search} />
      {/* </Suspense> */}
    </section>
  )
}
export default HomePage
