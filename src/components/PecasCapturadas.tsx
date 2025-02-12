import { JogadorLado } from '@/shared/model/JogadorLado'
import { TipoPeca } from '@/shared/model/TipoPeca'
import Peca from './Peca'

export interface PecasCapturadasProps {
    pecas: TipoPeca[]
    lado: JogadorLado
}

export default function PecasCapturadas(props: PecasCapturadasProps) {
    return (
        <div className="flex flex-col border border-zinc-600 w-4/5 rounded-md">
            <span className="bg-zinc-600 px-4 py-2">Peças Capturadas</span>
            <div className="flex items-center flex-wrap gap-2 min-h-10 px-4 py-2">
                {props.pecas.length ? (
                    props.pecas.map((peca, index) => (
                        <Peca key={index} tipo={peca} cor={props.lado} mini />
                    ))
                ) : (
                    <span className="text-zinc-500 italic">Vazio</span>
                )}
            </div>
        </div>
    )
}
