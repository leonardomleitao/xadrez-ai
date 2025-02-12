import { Modelo } from '@/shared/model/Modelo'
import jogarComDeepseek from './deepseek'
import jogarComChatGPT from './chatgpt'
import jogarComGemini from './gemini'

const modelos = {
    [Modelo.CHATGPT]: jogarComChatGPT,
    [Modelo.GEMINI]: jogarComGemini,
    [Modelo.DEEPSEEK]: jogarComDeepseek,
}

export default modelos
