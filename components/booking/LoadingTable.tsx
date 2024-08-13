import { Skeleton } from '../ui/skeleton'

function LoadingTable({ rows }: { rows?: number }) {
  const tableRows = Array.from({ length: rows || 5 }, (_, i) => {
    return (
      <div className='mb-4 mt-16' key={i}>
        <Skeleton className='w-full h-8 rounded' />
      </div>
    )
  })
  return <div>{tableRows}</div>
}
export default LoadingTable
