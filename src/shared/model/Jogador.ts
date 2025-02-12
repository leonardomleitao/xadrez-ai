import { JogadorLado } from './JogadorLado'
import { Modelo } from './Modelo'

export default interface Jogador {
    nome: string
    imagem: string
    modelo: Modelo
    lado?: JogadorLado
}
