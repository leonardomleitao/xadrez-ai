import Jogador from '@/components/Jogador'
import Tabuleiro from '@/components/Tabuleiro'

export default function Home() {
    return (
        <div className="flex justify-around items-center h-screen">
            <Jogador logo="/deepseek.svg" className="pb-20 self-end" />
            <Tabuleiro />
            <Jogador logo="/openai.svg" className="pt-20 self-start" />
        </div>
    )
}
