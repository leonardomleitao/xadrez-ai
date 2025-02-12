import { JogadorLado } from '@/shared/model/JogadorLado'
import { TipoPeca } from '@/shared/model/TipoPeca'
import Image from 'next/image'

export interface PecaProps {
    tipo: TipoPeca
    cor: JogadorLado
    mini?: boolean
}

export default function Peca(props: PecaProps) {
    return (
        <div>
            <Image
                src={`/${props.cor}-${props.tipo}.svg`}
                width={props.mini ? 40 : 64}
                height={props.mini ? 40 : 64}
                alt={`${props.cor}_${props.tipo}`}
            />
        </div>
    )
}
