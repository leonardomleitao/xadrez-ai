'use client'
import Jogador from '@/shared/model/Jogador'
import Image from 'next/image'

export interface SelecaoJogadorProps {
    opcoes: Jogador[]
    jogador: Jogador
    jogadorMudou?: (jogador: Jogador) => void
    className?: string
}

export default function SelecaoJogador(props: SelecaoJogadorProps) {
    const outrosJogadores = props.opcoes.filter((opcao) => opcao.modelo !== props.jogador.modelo)

    function renderizarOutroJogador(jogador: Jogador) {
        return (
            <div
                key={jogador.nome}
                className={`
                    flex flex-col items-center justify-center gap-2 p-7 rounded-lg
                    bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 
                    cursor-pointer size-36
                `}
                onClick={() => props.jogadorMudou?.(jogador)}
            >
                <div className="relative size-12">
                    <Image src={jogador.imagem} alt="Jogador" fill />
                </div>
                <span className="text-xs">{jogador.nome}</span>
            </div>
        )
    }

    function renderizarJogador(jogador: Jogador) {
        return (
            <div
                className={`
                    flex flex-col items-center justify-center gap-2 p-7 rounded-lg
                    bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 
                    w-44 ${props.className ?? ''}
                `}
            >
                <div className="relative size-20">
                    <Image src={jogador.imagem} alt="Jogador" fill />
                </div>
                <Image src={`/${jogador.lado}-pawn.svg`} alt="Peão" width={64} height={64} />
                <span>{jogador.nome}</span>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-4">
            {outrosJogadores.map(renderizarOutroJogador)}
            {renderizarJogador(props.jogador)}
        </div>
    )
}
