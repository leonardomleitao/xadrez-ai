export interface PecaProps {
    tipo: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
    cor: 'white' | 'black'
}

export default function Peca(props: PecaProps) {
    return (
        <div>
            <img src={`/${props.cor}-${props.tipo}.svg`} alt={`${props.cor}_${props.tipo}`} />
        </div>
    )
}
