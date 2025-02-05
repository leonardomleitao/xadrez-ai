'use client'
import { ProvedorJogo } from '@/data/contexts/ContextoJogo'

export default function Layout(props: any) {
    return <ProvedorJogo>{props.children}</ProvedorJogo>
}
