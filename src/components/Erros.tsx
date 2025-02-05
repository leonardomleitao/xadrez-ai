export interface ErrosProps {
    erros: string[]
}

export default function Erros(props: ErrosProps) {
    return (
        <div>
            {props.erros.map((erro, index) => (
                <p key={index}>{erro}</p>
            ))}
        </div>
    )
}
