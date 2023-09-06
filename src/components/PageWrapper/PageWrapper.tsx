import { ReactElement, PropsWithChildren } from 'react'

const PageWrapper = ({ children }: PropsWithChildren): ReactElement => {
    return <div className="mx-auto max-w-2xl p-4 pb-32">{children}</div>
}

export default PageWrapper
