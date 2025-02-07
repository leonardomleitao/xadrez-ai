import { JogadorLado } from '@/shared/model/JogadorLado'
import { extrairJogadas } from '../utils/xadrez'
import { gerarPrompt } from '../utils/chat'

export default async function jogarComGemini(
    estado: string,
    lado: JogadorLado,
    reiEmCheck: boolean = false,
    ignorarJogadas: string[] = [],
): Promise<string | null> {
    const apiKey = process.env.GEMINI_API_KEY
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

    const prompt = gerarPrompt({ estado, lado, ignorarJogadas, reiEmCheck })
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    })

    const data = await response.json()
    const saida = data.candidates[0].content.parts[0].text ?? ''
    const jogadas = extrairJogadas(saida).map((i) => i.trim())
    return jogadas[jogadas.length - 1] ?? null
}
