'use client'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { JogadorLado } from '../../shared/model/JogadorLado'
import * as chess from 'chess'
import Jogador from '../../shared/model/Jogador'
import jogarComModelo from '@/server/jogar'
import { TipoPeca } from '@/shared/model/TipoPeca'

export interface ContextoJogoProps {
    mensagens: string[]
    processando: boolean
    jogo: chess.GameClient
    status: chess.GameStatus
    jogadores: {
        brancas: Jogador | null
        pretas: Jogador | null
    }
    pecasCapturadas: {
        brancas: TipoPeca[]
        pretas: TipoPeca[]
    }
    jogar: () => void
    proximoJogador: () => JogadorLado
    registrarJogador: (jogador: Jogador) => void
}

const ContextoJogo = createContext<ContextoJogoProps>({} as any)

export function ProvedorJogo(props: any) {
    const jogoRef = useRef(chess.create({ PGN: true }))
    const jogo = jogoRef.current

    const [mensagens, setMensagens] = useState<string[]>([])
    const [processando, setProcessando] = useState<boolean>(false)

    const [status, setStatus] = useState<chess.AlgebraicGameStatus>(jogo.getStatus())
    const [jogadores, setJogadores] = useState<{
        brancas: Jogador | null
        pretas: Jogador | null
    }>({ brancas: null, pretas: null })

    const [pecasCapturadas, setPecasCapturadas] = useState<{
        brancas: TipoPeca[]
        pretas: TipoPeca[]
    }>({ brancas: [], pretas: [] })

    const registrarJogador = useCallback(function (jogador: Jogador) {
        setJogadores((jogadores) => ({
            ...jogadores,
            [jogador.lado === JogadorLado.BRANCAS ? 'brancas' : 'pretas']: jogador,
        }))
    }, [])

    useEffect(() => {
        jogo.on(
            'capture' as any,
            ((move: any) => {
                const { side, type } = move.capturedPiece
                if (side.name === JogadorLado.BRANCAS) {
                    setPecasCapturadas((pecas) => ({
                        ...pecas,
                        brancas: [...pecas.brancas, type],
                    }))
                } else {
                    setPecasCapturadas((pecas) => ({
                        ...pecas,
                        pretas: [...pecas.pretas, type],
                    }))
                }
            }) as any,
        )
    }, [jogo])

    async function jogar(ignorarJogadas: string[] = [], tentativas: number = 0) {
        const checkmate = (jogo as any).isCheckmate
        const terminou = checkmate || jogo.isStalemate || jogo.isRepetition
        if (terminou) {
            setMensagens(
                [
                    checkmate ? 'Jogo terminou! Checkmate!' : '',
                    jogo.isStalemate ? 'Empate!' : '',
                    jogo.isRepetition ? 'Repetição!' : '',
                ].filter(Boolean),
            )
            return setProcessando(false)
        }

        setProcessando(true)
        let jogada: string | null = null
        try {
            const jogador =
                proximoJogador() === JogadorLado.BRANCAS ? jogadores.brancas : jogadores.pretas
            if (!jogador) return

            jogada = await jogarComModelo(jogo.getFen(), jogador, jogo.isCheck, ignorarJogadas)

            if (!jogada) return
            jogo.move(jogada)
            setStatus(jogo.getStatus())
            setProcessando(false)
            setMensagens([])
        } catch (error: any) {
            if (tentativas >= 10) {
                setProcessando(false)
                setMensagens((msgs) => [...msgs, error.message ?? error])
            } else {
                jogar([...ignorarJogadas, jogada ?? ''], tentativas + 1)
            }
        }
    }

    function proximoJogador(): JogadorLado {
        const lado = jogo.getStatus().board.lastMovedPiece?.side.name
        return jogadores.brancas?.lado === lado ? JogadorLado.PRETAS : JogadorLado.BRANCAS
    }

    return (
        <ContextoJogo.Provider
            value={{
                mensagens,
                processando,
                jogo,
                status,
                jogadores,
                pecasCapturadas,
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
