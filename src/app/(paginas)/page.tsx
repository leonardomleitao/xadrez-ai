'use client'
import { JogadorLado } from '@/shared/model/JogadorLado'
import { Modelo } from '@/shared/model/Modelo'
import { useEffect } from 'react'
import BotaoJogar from '@/components/BotaoJogar'
import Erros from '@/components/Erros'
import Jogador from '@/components/Jogador'
import Tabuleiro from '@/components/Tabuleiro'
import useJogo from '@/data/hooks/useJogo'

export default function Home() {
    const { jogar, jogadores, processando, erros, proximoJogador, registrarJogador } = useJogo()

    useEffect(() => {
        registrarJogador({
            lado: JogadorLado.PRETAS,
            imagem: '/gemini.svg',
            modelo: Modelo.GEMINI,
        })
        // registrarJogador({
        //     lado: JogadorLado.PRETAS,
        //     imagem: '/deepseek.svg',
        //     modelo: Modelo.DEEPSEEK,
        // })
        registrarJogador({
            lado: JogadorLado.BRANCAS,
            imagem: '/openai.svg',
            modelo: Modelo.OPENAI,
        })
    }, [registrarJogador])

    return (
        jogadores.brancas &&
        jogadores.pretas && (
            <div className="flex flex-col items-center justify-center h-screen gap-10">
                <h1 className="text-4xl font-extrabold">Xadrez de IAs</h1>
                <div className="flex justify-center items-center gap-20">
                    <div className="flex flex-col gap-4">
                        <Jogador
                            lado={jogadores.pretas.lado}
                            imagem={jogadores.pretas.imagem}
                            selecionado={proximoJogador() === JogadorLado.PRETAS}
                        />
                        <Jogador
                            lado={jogadores.brancas.lado}
                            imagem={jogadores.brancas.imagem}
                            selecionado={proximoJogador() === JogadorLado.BRANCAS}
                        />
                    </div>
                    <Tabuleiro />
                    <div className="flex flex-col gap-4">
                        <BotaoJogar onClick={() => jogar()} processando={processando} />
                        <Erros erros={erros} />
                    </div>
                </div>
            </div>
        )
    )
}
