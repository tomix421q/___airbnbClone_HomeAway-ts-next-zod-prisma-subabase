import { Input } from '../ui/input'
import { Label } from '../ui/label'
const name = 'image'

function ImageInput() {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        Image
      </Label>
      <Input id={name} name={name} type='file' required accept='image/*' className='max-w-xs' />
    </div>
  )
}
export default ImageInput
