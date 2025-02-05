'use client'
import { JogadorLado } from '@/shared/model/JogadorLado'
import Image from 'next/image'

export interface JogadorProps {
    imagem: string
    lado: JogadorLado
    selecionado?: boolean
    className?: string
}

export default function Jogador(props: JogadorProps) {
    return (
        <div
            className={`
                flex flex-col items-center justify-center gap-2 p-7 rounded-lg
                bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 
                ${props.selecionado ? 'border-2 border-zinc-400' : 'border border-zinc-600'}
                ${props.className}
            `}
        >
            <div className="relative h-16 w-48">
                <Image src={props.imagem} alt="Jogador" fill />
            </div>
            <Image src={`/${props.lado}-pawn.svg`} alt="Peão" width={64} height={64} />
        </div>
    )
}
