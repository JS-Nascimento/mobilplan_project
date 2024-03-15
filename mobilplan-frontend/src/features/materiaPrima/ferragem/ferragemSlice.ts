import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import Principal, {Content, Pagination} from "../../../types/ferragem";
import {apiSlice} from "../../api/apiSlice";

export interface Ferragem {
    id: number;
    descricao: string
    cor: string | null;
    unidade: string;
    preco: number;
    precificacao: string;
    imagem: string | null;
    criadoEm: string | null;
    atualizadoEm: string;
    tenantId: string;
}


function parseQueryParams(params : Pagination) {
    const query = new URLSearchParams();
    if(params.page) {
        query.append("page", params.page.toString());
    }
    if(params.size) {
        query.append("size", params.size.toString());
    }
    return query.toString();
}

const endpoint = '/materia-prima/ferragem';
const pesquisar = '/pesquisar';
function mountUrlParams({page = 0, size = 10}){
    const params : Pagination = { page , size};
    const queryParams = parseQueryParams(params);
    return `${endpoint}${pesquisar}?${queryParams}`;
}
export const ferragensApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFerragens: builder.query<Principal, Pagination>({
            query: (params) => ({
                url: mountUrlParams(params) ,
                method: 'POST',
                body: {},
            }),
        }),
        createFerragem: builder.mutation<Content, Partial<Content>>({
            query: (ferragem) => ({
                url: endpoint,
                method: 'POST',
                body: ferragem,
            }),
        }),
        updateFerragem: builder.mutation<Content, { id: number; data: Partial<Content> }>({
            query: ({ id, data }) => ({
                url: `${endpoint}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteFerragem: builder.mutation<void, number>({
            query: (id) => ({
                url: `${endpoint}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});


const ferragem: Ferragem = {
    "id": 8,
    "descricao": "Parafuso 3.5x16mm Ciser - 100un",
    "cor": "Bicromatizado",
    "unidade": "PACOTE",
    "preco": 5.99,
    "precificacao": "UNIDADE",
    "imagem": "tesre",
    "criadoEm": "07/03/2024 18:35:30",
    "atualizadoEm": "07/03/2024 18:35:30",
    "tenantId": "b5669ea4-4f3a-4ad4-89a9-de55e0c9fa75"
};

const initialState: Ferragem[] = [ferragem,
    {...ferragem, "id": 2, "descricao": "Suporte de Prateleira - 100un"},
    {...ferragem, "id": 3, "descricao": "Minifix Preto", "cor": "Preto", "unidade": "pacote", "preco": 3.99},
];

export const ferragemSlice = createSlice({
    name: 'ferragens',
    initialState: initialState,
    reducers: {
        criarFerragem: (state, action: PayloadAction<Ferragem>) => {
            state.push(action.payload);

        },
        alterarFerragem: (state, action) => {
            const index = state.findIndex((ferragem) => ferragem.id === action.payload.id);

            state[index] = action.payload;
        },
        removerFerragem: (state, action) => {
            const index = state.findIndex((ferragem) => ferragem.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },

    },
});

export const selectFerragemId = (state: RootState, id: number): Ferragem | null => {
    const ferragem = state.ferragens.find((ferragem: Ferragem) => ferragem.id === id);
    return ferragem || null;
}
export default ferragemSlice.reducer;
export const {criarFerragem, alterarFerragem, removerFerragem} = ferragemSlice.actions;
export const {
    useGetFerragensQuery,
    useCreateFerragemMutation,
    useUpdateFerragemMutation,
    useDeleteFerragemMutation,
} = ferragensApiSlice;