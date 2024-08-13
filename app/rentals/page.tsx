import EmptyList from '@/components/home/EmptyList'
import CountryFlagAndName from '@/components/card/CountryFlagAndName'
import Link from 'next/link'

import { formatDate, formatCurrency } from '@/utils/format'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import FormContainer from '@/components/form/FormContainer'
import { IconButton } from '@/components/form/Buttons'
import { fetchBookings, deleteBookingAction, fetchRentals, deleteRentalAction } from '@/utils/actions'

async function RentalsPage() {
  const rentals = await fetchRentals()
  console.log(rentals)
  if (rentals.length === 0) {
    return <EmptyList heading='No Rentals do display' message='Do not hesitate to create a rental.' />
  }

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>Active preporties: {rentals.length}</h4>
      <Table>
        <TableCaption>A list of all your preporties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nights Boked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => {
            const { id: propertyId, name, price } = rental
            const { totalNightsSum, orderTotalSum } = rental

            return (
              <TableRow key={propertyId}>
                <TableCell>
                  <Link href={`/properties/${propertyId}`} className='underline text-muted-foreground tracking-wide'>
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell>{totalNightsSum || 0}</TableCell>
                <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/rentals/${propertyId}/edit`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteRental propertyId={propertyId} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteRental = deleteRentalAction.bind(null, { propertyId })
  return (
    <FormContainer action={deleteRental}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

export default RentalsPage
