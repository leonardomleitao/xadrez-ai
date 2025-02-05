import OpenAI from 'openai'

export default class JogadorOpenAI {
    private static readonly client: OpenAI = new OpenAI({
        apiKey: process.env['NEXT_PUBLIC_OPENAI_API_KEY'],
        dangerouslyAllowBrowser: true,
    })

    static async jogar(estado: string, lado: 'white' | 'black'): Promise<string | null> {
        const response = await this.client.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'You are playing chess',
                },
                {
                    role: 'user',
                    content: `
                        Using the ${lado} pieces, the board is in the following state according to the FEN notation: ${estado} 
                        What is the best next move?
                        Response format: only one move using algebraic notation is expected.
                        Examples: e4 , e6 , d4 , d5 , Nc3 , Nf6 , Bg5 , dxe4 , Nxe4 , Be7 , Bxf6 , gxf6 , g3 , f5 , Nc3 , Bf6 , Nge2 , Nc6 , d5 , exd5 , Nxd5 , Bxb2 , Bg2 , 0-0 , 0-0 , Bh8 , Nef4 , Ne5 , Qh5 , Ng6 , Rad1 , c6 , Ne3 , Qf6 , Kh1 , Bg7 , Bh3 , Ne7 , Rd3 , Be6 , Rfd1 , Bh6 , Rd4 , Bxf4 , Rxf4 , Rad8 , Rxd8 , Rxd8 , Bxf5 , Nxf5 , Nxf5 , Rd5 , g4 , Bxf5 , gxf5 , h6 , h3 , Kh7 , Qe2 , Qe5 , Qh5 , Qf6 , Qe2 , Re5 , Qd3 , Rd5 , Qe2
                    `,
                },
            ],
        })

        return response.choices[0].message.content
    }
}
