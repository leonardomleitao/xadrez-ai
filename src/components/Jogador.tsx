'use client'
import useJogo from '@/data/hooks/useJogo'

export interface JogadorProps {
    logo: string
    className?: string
}

export default function Jogador(props: JogadorProps) {
    const { jogar } = useJogo()
    return (
        <div
            className={`
                flex flex-col items-center gap-2
                ${props.className}
            `}
            onClick={() => jogar()}
        >
            <img src={props.logo} alt="Jogador" className="h-16" />
        </div>
    )
}
