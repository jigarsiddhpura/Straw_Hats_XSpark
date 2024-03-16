'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { Button } from '@nextui-org/react'

interface CloseModalProps {}

const CloseModal: FC<CloseModalProps> = ({}) => {
  const router = useRouter()

  return (
    <Button variant='shadow' className='h-6 w-6 p-0 rounded-md' onClick={() => router.back()}>
      <X aria-label='close modal' className='h-4 w-4' />
    </Button>
  )
}

export default CloseModal