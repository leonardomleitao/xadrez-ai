export interface CasaProps {
    coluna: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
    linha: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    clara: boolean
    children?: React.ReactNode
}

export default function Casa(props: CasaProps) {
    return (
        <div
            className={`
                flex justify-center items-center size-24 relative 
                ${props.clara ? 'bg-[#EBECD0]' : 'bg-[#739552]'}
            `}
        >
            {props.children}
            <div
                className={`
                    absolute bottom-1 left-1 text-xs
                    ${props.clara ? 'text-[#739552]/70' : 'text-[#EBECD0]/70'}
                `}
            >
                {props.coluna}
                {props.linha}
            </div>
        </div>
    )
}
