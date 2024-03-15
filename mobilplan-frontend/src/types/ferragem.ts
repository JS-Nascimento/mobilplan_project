
export default interface Principal {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
    id:           number;
    descricao:    string;
    cor:          string;
    unidade:      string;
    preco:        number;
    precificacao: string;
    imagem:       null | string;
    criadoEm:     string;
    atualizadoEm: string;
    tenantId:     string;
}

export interface Pagination{
    page: number;
    size: number;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort?:       Sort;
    offset?:     number;
    paged?:      boolean;
    unpaged?:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}