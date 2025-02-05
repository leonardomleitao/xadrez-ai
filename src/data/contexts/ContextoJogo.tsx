'use client'
import { createContext, useCallback, useRef, useState } from 'react'
import { JogadorLado } from '../../shared/model/JogadorLado'
import * as chess from 'chess'
import Jogador from '../../shared/model/Jogador'
import jogarComModelo from '@/server/jogar'

export interface ContextoJogoProps {
    erros: string[]
    processando: boolean
    jogo: chess.AlgebraicGameClient
    status: chess.AlgebraicGameStatus
    jogadores: {
        brancas: Jogador | null
        pretas: Jogador | null
    }
    jogar: () => void
    proximoJogador: () => JogadorLado
    registrarJogador: (jogador: Jogador) => void
}

const ContextoJogo = createContext<ContextoJogoProps>({} as any)

export function ProvedorJogo(props: any) {
    const jogoRef = useRef(chess.create({ PGN: true }))
    const jogo = jogoRef.current

    const [erros, setErros] = useState<string[]>([])
    const [processando, setProcessando] = useState<boolean>(false)

    const [status, setStatus] = useState<chess.AlgebraicGameStatus>(jogo.getStatus())
    const [jogadores, setJogadores] = useState<{
        brancas: Jogador | null
        pretas: Jogador | null
    }>({ brancas: null, pretas: null })

    const registrarJogador = useCallback(function (jogador: Jogador) {
        setJogadores((jogadores) => ({
            ...jogadores,
            [jogador.lado === JogadorLado.BRANCAS ? 'brancas' : 'pretas']: jogador,
        }))
    }, [])

    async function jogar(ignorarJogadas: string[] = [], tentativas: number = 0) {
        setProcessando(true)
        let jogada: string | null = null
        try {
            const jogador =
                proximoJogador() === JogadorLado.BRANCAS ? jogadores.brancas : jogadores.pretas
            if (!jogador) return

            jogada = await jogarComModelo(jogo.getFen(), jogador)

            if (!jogada) return
            jogo.move(jogada)
            setStatus(jogo.getStatus())
            setProcessando(false)
        } catch (error: any) {
            if (tentativas >= 10) {
                setProcessando(false)
                setErros((erros) => [...erros, error.message ?? error])
            } else jogar([...ignorarJogadas, jogada ?? ''], tentativas + 1)
        }
    }

    function proximoJogador(): JogadorLado {
        const lado = jogo.getStatus().board.lastMovedPiece?.side.name
        return jogadores.brancas?.lado === lado ? JogadorLado.PRETAS : JogadorLado.BRANCAS
    }

    return (
        <ContextoJogo.Provider
            value={{
                erros,
                processando,
                jogo,
                status,
                jogadores,
                proximoJogador,
                jogar,
                registrarJogador,
            }}
        >
            {props.children}
        </ContextoJogo.Provider>
    )
}

export default ContextoJogo
