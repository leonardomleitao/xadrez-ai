import Jogador from '@/shared/model/Jogador'
import { Modelo } from '@/shared/model/Modelo'

const jogadores: Jogador[] = [
    {
        nome: 'GPT 4o',
        imagem: '/chatgpt-logo.svg',
        modelo: Modelo.CHATGPT,
    },
    {
        nome: 'Gemini 2.0',
        imagem: '/gemini-logo.svg',
        modelo: Modelo.GEMINI,
    },
    {
        nome: 'DeepSeek R1',
        imagem: '/deepseek-logo.svg',
        modelo: Modelo.DEEPSEEK,
    },
]

export default jogadores
