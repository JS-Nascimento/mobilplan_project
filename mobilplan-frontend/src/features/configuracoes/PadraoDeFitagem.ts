

interface PadraoDeFitagem {
    value: string;
    name: string;
}

export const opcoesPadraoDeFitagem: PadraoDeFitagem[] = [
    { value: 'NENHUM', name: 'Nenhum Lado' },
    { value: 'UMA_ALTURA', name: 'Uma Altura' },
    { value: 'UMA_ALTURA_UMA_LARGURA', name: 'Uma Altura e uma Largura' },
    { value: 'UMA_ALTURA_DUAS_LARGURAS', name: 'Uma Altura e duas Larguras' },
    { value: 'DUAS_ALTURA', name: 'Duas Alturas' },
    { value: 'DUAS_ALTURAS_UMA_LARGURA', name: 'Duas Alturas e uma Largura' },
    { value: 'QUATRO_LADOS', name: 'Os Quatro Lados' },
];
