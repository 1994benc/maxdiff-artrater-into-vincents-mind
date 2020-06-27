import React from 'react'

interface IMainProps {
    children: React.ReactElement
}
export default function Main({children}:IMainProps) {
    return (
        <div className="mt-16 p-2">
            <div className="mx-auto max-w-3xl my-6">{children}</div>
  
        </div>
    )
}
