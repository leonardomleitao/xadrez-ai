'use client'
import * as chess from 'chess'
import { createContext, useRef, useState } from 'react'
import JogadorOpenAI from '../providers/JogadorOpenAI'

export interface ContextoJogoProps {
    jogo: chess.AlgebraicGameClient
    status: chess.AlgebraicGameStatus
    jogar: () => void
}

const ContextoJogo = createContext<ContextoJogoProps>({} as any)

export function ProvedorJogo(props: any) {
    const jogoRef = useRef(chess.create({ PGN: true }))
    const jogo = jogoRef.current
    const [status, setStatus] = useState<chess.AlgebraicGameStatus>(jogo.getStatus())

    async function jogar(tentativa: number = 0) {
        try {
            console.log('Jogando...', tentativa)
            const move = await JogadorOpenAI.jogar(jogo.getFen(), proximoJogador())
            console.log(move)

            if (!move) return
            jogo.move(move)
            setStatus(jogo.getStatus())
        } catch (error) {
            if (tentativa <= 10) jogar(tentativa + 1)
            else console.error(error)
        }
    }

    function proximoJogador(): 'white' | 'black' {
        const lado = jogo.getStatus().board.lastMovedPiece?.side.name
        return lado === 'white' ? 'black' : 'white'
    }

    return (
        <ContextoJogo.Provider
            value={{
                jogo,
                status,
                jogar,
            }}
        >
            {props.children}
        </ContextoJogo.Provider>
    )
}

export default ContextoJogo
