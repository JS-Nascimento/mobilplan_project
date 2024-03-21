

interface TipoMontagemFundo  {
    name: string;
    imageSrc: string;
}

export const opcoesTipoMontagemFundo: TipoMontagemFundo[] = [
    { name: 'Sobreposto', imageSrc: '/assets/configs/fundo-sobreposto.png' },
    { name: 'Encaixado', imageSrc: '/assets/configs/fundo-encaixado.png' },
    // Adicione mais opções conforme necessário...
];