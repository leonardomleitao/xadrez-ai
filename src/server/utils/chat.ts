import { JogadorLado } from '@/shared/model/JogadorLado'

export function gerarPrompt(props: {
    lado: JogadorLado
    estado: string
    reiEmCheck: boolean
    ignorarJogadas: string[]
}): string {
    return `
        You are playing as the ${props.lado} pieces. 
        The current board state is represented by the following FEN notation: 
        ${props.estado}.
        ${props.reiEmCheck ? 'You ara in check. You must protect your king.' : ''}
        What is the best next move?
        Response format: Return only a single move in standard algebraic notation (SAN). Do not include any explanations or additional text.
        Examples of expected responses: e4, e6, d4, d5, Nc3, Nf6, Bg5, dxe4, Nxe4, Be7, Bxf6, gxf6, g3, f5, Nc3, Bf6, Nge2, Nc6, d5, exd5, Nxd5, Bxb2, Bg2, 0-0, 0-0, Bh8, Nef4, Ne5, Qh5, Ng6, Rad1, c6, Ne3, Qf6, Kh1, Bg7, Bh3, Ne7, Rd3, Be6, Rfd1, Bh6, Rd4, Bxf4, Rxf4, Rad8, Rxd8, Rxd8, Bxf5, Nxf5, Nxf5, Rd5, g4, Bxf5, gxf5, h6, h3, Kh7, Qe2, Qe5, Qh5, Qf6, Qe2, Re5, Qd3, Rd5, Qe2.
        **Important:** Do not use any of the following moves in your answer: 
        [${props.ignorarJogadas.join(', ')}].
    `
}
