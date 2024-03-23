import Principal, {Content, ImportacaoFerragem, Pagination} from "../../../types/ferragem";
import {apiSlice} from "../../api/apiSlice";

export interface Ferragem extends Content {
}

export const initialState: Ferragem = {
    id: null,
    descricao: "",
    cor: "",
    unidade: "",
    preco: 0.0,
    precificacao: "",
    imagem: "",
    criadoEm: "",
    atualizadoEm: "",
    tenantId: "",
};


function parseQueryParams(params: Pagination) {
    const query = new URLSearchParams();
    if (params.page) {
        query.append("page", params.page.toString());
    }
    if (params.size) {
        query.append("size", params.size.toString());
    }
    return query.toString();
}

const endpoint = '/materia-prima/ferragem';
const pesquisar = '/pesquisar';

function mountUrlParams({page = 0, size = 10}) {
    const params: Pagination = {page, size};
    const queryParams = parseQueryParams(params);
    return `${endpoint}${pesquisar}?${queryParams}`;
}

export const ferragensApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFerragens: builder.query<Principal, Pagination>({
            query: (params) => ({
                url: mountUrlParams(params),
                method: 'POST',
                body: {},
            }),
            providesTags: (result) =>
                result ? [{type: 'Ferragens', id: 'LIST'}] : [],
        }),

        createFerragem: builder.mutation<Content, Partial<Content>>({
            query: (ferragem) => ({
                url: endpoint,
                method: 'POST',
                body: ferragem,
            }),
            invalidatesTags: [{type: 'Ferragens', id: 'LIST'}],
        }),
        updateFerragem: builder.mutation<Content, { id: number; data: Partial<Content> }>({
            query: ({id, data}) => ({
                url: `${endpoint}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [{type: 'Ferragens', id: 'LIST'}],
        }),
        deleteFerragem: builder.mutation<void, number>({
            query: (id) => ({
                url: `${endpoint}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Ferragens', id: 'LIST'}],
        }),
        getFerragemById: builder.query<Content, number>({
            query: (id) => ({
                url: `${endpoint}/${id}`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result ? [{type: 'Ferragens', id: 'LIST'}] : [],
        }),

        uploadFerragemPlanilha: builder.mutation<ImportacaoFerragem, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append("file", file);

                return {
                    url: `${endpoint}/importar-em-lote`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: [{type: 'Ferragens', id: 'LIST'}],
        }),


        updateFerragemImagem: builder.mutation<string, { id: number; file: File | null }>({
            query: ({id, file}) => {
                const formData = new FormData();
                if (file) {
                    formData.append("imagem", file); // Assumindo que "imagem" é a chave esperada pelo backend
                }
                return {
                    url: `${endpoint}/${id}/imagem`,
                    method: 'PUT',
                    body: formData,
                };
            },
            transformResponse: (response: { url: string }, meta, arg) => response.url,
            invalidatesTags: [{type: 'Ferragens', id: 'LIST'}],
        }),

    }),
});


export const {
    useGetFerragensQuery,
    useCreateFerragemMutation,
    useUpdateFerragemMutation,
    useDeleteFerragemMutation,
    useGetFerragemByIdQuery,
    useUploadFerragemPlanilhaMutation,
    useUpdateFerragemImagemMutation,
} = ferragensApiSlice;