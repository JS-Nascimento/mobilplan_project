import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";

interface Ferragem {
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

const ferragem: Ferragem = {
  "id": 1,
  "descricao": "Parafuso 3.5x16mm Ciser - 100un",
  "cor": "Bicromatizado",
  "unidade": "pacote",
  "preco": 5.99,
  "precificacao": "UNIDADE",
  "imagem": "tesre",
  "criadoEm": "07/03/2024 18:35:30",
  "atualizadoEm": "07/03/2024 18:35:30",
  "tenantId": "b5669ea4-4f3a-4ad4-89a9-de55e0c9fa75"
};

const initialState: Ferragem[] = [ferragem,
  { ...ferragem, "id": 2, "descricao": "Suporte de Prateleira - 100un" },
  { ...ferragem, "id": 3, "descricao": "Minifix Preto", "cor": "Preto", "unidade": "pacote", "preco": 3.99 },
];

const ferragemSlice = createSlice({
  name: 'ferragens',
  initialState: initialState,
  reducers: {
    criarFerragem: (state, action: PayloadAction<Ferragem>) => {

    },
    alterarFerragem: (state, action: PayloadAction<number>) => {

    },
    removerFerragem: (state, action: PayloadAction<number>) => {

    },
  },
});


export const selectFerragem = (state: RootState,) => state.ferragens;

export default ferragemSlice.reducer;