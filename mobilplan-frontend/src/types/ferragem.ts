import * as url from "url";

export default interface Principal {
    content:          Content[];
    size:          number;
    totalElements: number;
    page:          number;
    totalPages:    number;
    first:         boolean;
    last:          boolean;
    empty:         boolean;
}

export interface Content {
    id:           number | null | undefined;
    descricao:    string;
    cor:          string;
    unidade:      string;
    preco:        number;
    precificacao: string;
    imagem:       string | null;
    criadoEm:     string;
    atualizadoEm: string;
    tenantId:     string;
}

export interface Pagination{
    page: number;
    size: number;
}
export interface ImportacaoFerragem {
    ferragensImportadas:   string[] | null;
    ferragensExistentes:   string[] | null;
    ferragensNaoImportadas: string[] | null;
}

