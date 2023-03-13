import React, { PropsWithChildren } from 'react'

const PageWrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className="mx-auto max-w-2xl p-4 pb-32">{children}</div>
}

export default PageWrapper
