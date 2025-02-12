import { JogadorLado } from '@/shared/model/JogadorLado'
import OpenAI from 'openai'
import { extrairJogadas } from '../utils/xadrez'
import { gerarPrompt } from '../utils/chat'

export default async function jogarComDeepseek(
    estado: string,
    lado: JogadorLado,
    reiEmCheck: boolean = false,
    ignorarJogadas: string[] = [],
): Promise<string | null> {
    const client: OpenAI = new OpenAI({
        // baseURL: 'https://integrate.api.nvidia.com/v1',
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
    })

    const prompt = gerarPrompt({ estado, lado, ignorarJogadas, reiEmCheck })
    const response = await client.chat.completions.create({
        model: 'deepseek-reasoner',
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

    const saida = response.choices?.[0].message?.content ?? ''
    const jogadas = extrairJogadas(saida).map((i) => i.trim())
    return jogadas[jogadas.length - 1] ?? null
}
