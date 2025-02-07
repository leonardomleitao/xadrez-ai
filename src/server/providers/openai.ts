import { JogadorLado } from '@/shared/model/JogadorLado'
import OpenAI from 'openai'
import { extrairJogadas } from '../utils/xadrez'
import { gerarPrompt } from '../utils/chat'

export default async function jogarComOpenAI(
    estado: string,
    lado: JogadorLado,
    reiEmCheck: boolean = false,
    ignorarJogadas: string[] = [],
): Promise<string | null> {
    const client: OpenAI = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    const prompt = gerarPrompt({ estado, lado, ignorarJogadas, reiEmCheck })
    const response = await client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: 'You are playing chess',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    })

    const saida = response.choices[0].message.content ?? ''
    const jogadas = extrairJogadas(saida).map((i) => i.trim())
    return jogadas[jogadas.length - 1] ?? null
}
