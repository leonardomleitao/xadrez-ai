'use client'
import Image from 'next/image'

export interface BotaoJogarProps extends React.HTMLAttributes<HTMLButtonElement> {
    processando: boolean
}

export default function BotaoJogar(props: BotaoJogarProps) {
    const { processando, ...buttonProps } = props
    return (
        <button
            className="flex justify-center items-center gap-3 bg-purple-500 rounded-lg px-7 py-3.5 text-2xl w-56"
            onClick={props.onClick}
            {...buttonProps}
        >
            {processando ? (
                <Image src="/loading.gif" width={24} height={24} alt="processando" unoptimized />
            ) : (
                <>
                    <div className="grid grid-cols-2 rounded overflow-hidden border border-purple-300">
                        <div className="h-3 w-3 bg-white/80"></div>
                        <div className="h-3 w-3 bg-black/80"></div>
                        <div className="h-3 w-3 bg-black/80"></div>
                        <div className="h-3 w-3 bg-white/80"></div>
                    </div>
                    <span className="font-extrabold text-white/70">Jogar</span>
                </>
            )}
        </button>
    )
}
