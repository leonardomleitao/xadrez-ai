import { Modelo } from '@/shared/model/Modelo'
import jogarComDeepseek from './deepseek'
import jogarComOpenAI from './openai'
import jogarComGemini from './gemini'

const modelos = {
    [Modelo.DEEPSEEK]: jogarComDeepseek,
    [Modelo.OPENAI]: jogarComOpenAI,
    [Modelo.GEMINI]: jogarComGemini,
}

export default modelos
