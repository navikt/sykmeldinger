import { ReactElement } from 'react'
import { DevTool } from '@hookform/devtools'
import { useFormContext } from 'react-hook-form'

function FormDevTools(): ReactElement {
    const { control } = useFormContext()

    return (
        <DevTool
            control={control}
            placement="bottom-right"
            styles={{
                button: {
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    right: '0.5rem',
                    bottom: '0.5rem',
                },
            }}
        />
    )
}

export default FormDevTools
