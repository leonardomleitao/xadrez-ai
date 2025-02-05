'use server'
import Jogador from '@/shared/model/Jogador'
import modelos from './providers'

export default async function jogarComModelo(
    estado: string,
    jogador: Jogador,
    ignorarJogadas: string[] = [],
    tentativas: number = 0,
): Promise<string | null> {
    const jogar = modelos[jogador.modelo]
    if (!jogar) return null

    try {
        return jogar(estado, jogador.lado, ignorarJogadas) ?? null
    } catch (error) {
        if (tentativas >= 10) throw error
        return jogarComModelo(estado, jogador, ignorarJogadas, tentativas + 1)
    }
}
