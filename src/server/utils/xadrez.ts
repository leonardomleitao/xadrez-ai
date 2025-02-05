export function extrairJogadas(texto: string): string[] {
    return (
        texto.match(
            /(?:(?:O-O(?:-O)?(?:[+#])?)|(?:[KQRBN]?(?:[a-h]|[1-8]|[a-h][1-8])?(?:x)?[a-h][1-8](?:=[QRBN])?(?:[+#])?))/g,
        ) ?? []
    )
}
