export interface MensagensProps {
    valor: string[]
}

export default function Mensagens(props: MensagensProps) {
    return (
        <div>
            {props.valor.map((msg, index) => (
                <p key={index}>{msg}</p>
            ))}
        </div>
    )
}
