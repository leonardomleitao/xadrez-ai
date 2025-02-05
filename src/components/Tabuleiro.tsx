'use client'
import Casa from './Casa'
import Peca from './Peca'
import useJogo from '@/data/hooks/useJogo'

export interface TabuleiroProps {}

export default function Tabuleiro(props: TabuleiroProps) {
    const { status } = useJogo()

    function renderizarLinha(linha: number) {
        return (
            <div className="flex gap-0">
                {status?.board.squares
                    .filter((square) => square.rank === linha)
                    .map((square, indice) => {
                        return (
                            <Casa
                                coluna={square.file as any}
                                linha={square.rank as any}
                                key={indice}
                                clara={indice % 2 === linha % 2}
                            >
                                {square.piece && (
                                    <Peca
                                        cor={square.piece.side.name as any}
                                        tipo={square.piece.type as any}
                                    />
                                )}
                            </Casa>
                        )
                    })}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-0">
            {renderizarLinha(8)}
            {renderizarLinha(7)}
            {renderizarLinha(6)}
            {renderizarLinha(5)}
            {renderizarLinha(4)}
            {renderizarLinha(3)}
            {renderizarLinha(2)}
            {renderizarLinha(1)}
        </div>
    )
}
