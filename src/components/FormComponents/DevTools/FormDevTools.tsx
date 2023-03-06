import React from 'react'
import { DevTool } from '@hookform/devtools'
import { useFormContext } from 'react-hook-form'

function FormDevTools(): JSX.Element {
    const { control } = useFormContext()

    return <DevTool control={control} />
}

export default FormDevTools
