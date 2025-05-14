"use client"
import React from 'react'
import { TemplateContextProvider } from '../../_contexts/template-context'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TemplateContextProvider>
                {children}
            </TemplateContextProvider>
        </div>
    )
}

export default layout
