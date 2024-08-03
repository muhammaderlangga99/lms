import React from 'react'
import { cn } from '@/lib/utils'

export default function Hero({className} : {className?: string}) {
  return (
    <div className={cn(className)}>
        {/* <div className="text-4xl font-bold">Hello, world!</div> */}
    </div>
  )
}