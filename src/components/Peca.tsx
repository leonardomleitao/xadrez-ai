import { JogadorLado } from '@/shared/model/JogadorLado'
import Image from 'next/image'

export interface PecaProps {
    tipo: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
    cor: JogadorLado
}

export default function Peca(props: PecaProps) {
    return (
        <div>
            <Image
                src={`/${props.cor}-${props.tipo}.svg`}
                width={64}
                height={64}
                alt={`${props.cor}_${props.tipo}`}
            />
        </div>
    )
}
