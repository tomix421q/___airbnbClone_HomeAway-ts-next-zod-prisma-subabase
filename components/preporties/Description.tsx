'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Title from './Title'

function Description({ description }: { description: string }) {
  const [isFullDescriptionShow, setIsFullDescription] = useState(false)

  const words = description.split(' ')
  const isLongDescription = words.length > 100

  const toggleDescription = () => {
    setIsFullDescription(!isFullDescriptionShow)
  }

  const displayDescription = isLongDescription && !isFullDescriptionShow ? words.splice(0, 100).join(' ') + '...' : description

  return (
    <article className='mt-4'>
      <Title text='Description' />
      <p className='text-muted-foreground font-light leading-loose'>{displayDescription}</p>
      {isLongDescription && (
        <Button variant={'link'} className='pl-0' onClick={toggleDescription}>
          {isFullDescriptionShow ? 'Show less' : 'Show more'}
        </Button>
      )}
    </article>
  )
}
export default Description
