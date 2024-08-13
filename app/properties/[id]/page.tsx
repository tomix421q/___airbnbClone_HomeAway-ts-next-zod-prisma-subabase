import FavoriteToggleButton from '@/components/card/FavoriteToggleButton'
import PropertyRating from '@/components/card/PropertyRating'
import Amenities from '@/components/preporties/Amenities'
import BreadCrumbs from '@/components/preporties/BreadCrumbs'
import Description from '@/components/preporties/Description'
import ImageContainer from '@/components/preporties/ImageContainer'
import PropertyDetails from '@/components/preporties/PropertyDetails'
import ShareButton from '@/components/preporties/ShareButton'
import UserInfo from '@/components/preporties/UserInfo'
import PropertyReviews from '@/components/reviews/PropertyReviews'
import SubmitReview from '@/components/reviews/SubmitReview'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchPropertyDetails, findExistingReview } from '@/utils/actions'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

const DynamicMap = dynamic(() => import('@/components/preporties/PropertyMap'), {
  ssr: false,
  loading: () => <Skeleton className='h-[400px] w-full' />,
})

const DynamicBookingWrapper = dynamic(() => import('@/components/booking/BookingWrapper'), {
  ssr: false,
  loading: () => <Skeleton className='h-[200px] w-full' />,
})

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id)
  if (!property) redirect('/')

  const { baths, bedrooms, beds, guests } = property
  const details = { baths, bedrooms, beds, guests }
  const firstName = property.profile.firstName
  const profileImage = property.profile.profileImage

  const { userId } = auth()
  const isNotOwner = property.profile.clerkId !== userId
  const reviewDoesNotExist = userId && isNotOwner && !(await findExistingReview(userId, property.id))

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold capitalize'>{property.tagline}</h1>
        <div className='flex items-center gap-x-4'>
          {/* share button */}
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      {/* IMAGE */}
      <ImageContainer mainImage={property.image} name={property.name} />
      {/* CONTENT */}
      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          {/* name,rating */}
          <div className='flex gap-x-4 items-center'>
            <h1 className='text-xl font-bold'>{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          {/* details rooms */}
          <PropertyDetails details={details} />
          {/* user info */}
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className='mt-4' />
          {/* description */}
          <Description description={property.description} />
          {/* amenities */}
          <Amenities amenities={property.amenities} />
          {/* map */}
          <DynamicMap countryCode={property.country} />
        </div>
        <div className='lg:col-span-4 flex flex-col items-center'>
          {/* calendar */}
          <DynamicBookingWrapper propertyId={property.id} price={property.price} bookings={property.bookings} />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}

      <PropertyReviews propertyId={property.id} />
    </section>
  )
}
export default PropertyDetailsPage
