import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";

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
  { ...ferragem, "id": 2, "descricao": "Suporte de Prateleira - 100un" },
  { ...ferragem, "id": 3, "descricao": "Minifix Preto", "cor": "Preto", "unidade": "pacote", "preco": 3.99 },
];

const ferragemSlice = createSlice({
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


export const selectFerragem = (state: RootState,) => state.ferragens;

export const selectFerragemId = (state: RootState, id: number): Ferragem | null => {
  const ferragem = state.ferragens.find((ferragem) => ferragem.id === id);
  return ferragem || null;
}
export default ferragemSlice.reducer;
export const { criarFerragem, alterarFerragem, removerFerragem } = ferragemSlice.actions;