'use client'
import { JogadorLado } from '@/shared/model/JogadorLado'
import { useEffect } from 'react'
import BotaoJogar from '@/components/BotaoJogar'
import Erros from '@/components/Mensagens'
import jogadoresDisponiveis from '@/data/constants/jogadores'
import SelecaoJogador from '@/components/SelecaoJogador'
import Tabuleiro from '@/components/Tabuleiro'
import useJogo from '@/data/hooks/useJogo'
import Peca from '@/components/Peca'
import Mensagens from '@/components/Mensagens'
import { Span } from 'next/dist/trace'

export default function Home() {
    const {
        jogadores,
        pecasCapturadas,
        processando,
        mensagens,
        jogar,
        proximoJogador,
        registrarJogador,
    } = useJogo()

    useEffect(() => {
        registrarJogador({ ...jogadoresDisponiveis[0], lado: JogadorLado.BRANCAS })
        registrarJogador({ ...jogadoresDisponiveis[1], lado: JogadorLado.PRETAS })
    }, [registrarJogador])

    return (
        jogadores.brancas &&
        jogadores.pretas && (
            <div className="flex flex-col items-center justify-center h-screen gap-10">
                <h1 className="text-4xl font-extrabold">Xadrez de IAs</h1>
                <div className="flex justify-center items-center gap-20">
                    <div className="flex flex-col gap-4">
                        <SelecaoJogador
                            jogador={jogadores.pretas}
                            opcoes={jogadoresDisponiveis}
                            jogadorMudou={(jogador) => {
                                registrarJogador({ ...jogador, lado: JogadorLado.PRETAS })
                            }}
                            className={
                                proximoJogador() === JogadorLado.PRETAS
                                    ? 'border-2 border-zinc-400'
                                    : 'border border-zinc-600'
                            }
                        />
                        <SelecaoJogador
                            jogador={jogadores.brancas}
                            opcoes={jogadoresDisponiveis}
                            jogadorMudou={(jogador) => {
                                registrarJogador({ ...jogador, lado: JogadorLado.BRANCAS })
                            }}
                            className={
                                proximoJogador() === JogadorLado.BRANCAS
                                    ? 'border-2 border-zinc-400'
                                    : 'border border-zinc-600'
                            }
                        />
                    </div>
                    <Tabuleiro />
                    <div className="flex flex-col justify-between self-stretch">
                        <div className="flex gap-2">
                            {pecasCapturadas.brancas.map((peca, index) => (
                                <Peca key={index} tipo={peca} cor={JogadorLado.BRANCAS} mini />
                            ))}
                        </div>

                        <div className="flex flex-col gap-4">
                            <BotaoJogar onClick={() => jogar()} processando={processando} />
                            <Mensagens valor={mensagens} />
                        </div>
                        <div className="flex gap-2">
                            {pecasCapturadas.pretas.map((peca, index) => (
                                <Peca key={index} tipo={peca} cor={JogadorLado.PRETAS} mini />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
