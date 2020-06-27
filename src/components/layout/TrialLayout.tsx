import React from 'react'

interface ITrialLayoutProps {
    children: React.ReactElement
}
export default function TrialLayout({children}:ITrialLayoutProps) {
    return (
        <div className="pt-5 min-h-screen p-2 pb-16 bg-gray-200">
            <div className="mx-auto p-3 my-6">{children}</div>
        </div>
    )
}
