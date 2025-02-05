import { JogadorLado } from './JogadorLado'
import { Modelo } from './Modelo'

export default interface Jogador {
    lado: JogadorLado
    imagem: string
    modelo: Modelo
}
