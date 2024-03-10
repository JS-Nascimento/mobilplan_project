import { useState } from "react";
import { Ferragem } from "../../../features/counter/materiaPrima/ferragem/ferragemSlice";

type Props = {
  ferragem: Ferragem;
  isDisabled: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSelect: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function FerragemForm({
  ferragem,
  isDisabled,
  isLoading,
  onSubmit,
  handleChange,
  handleSelect,
}: Props) {
  const [ferragem, setFerragem] = useState<Ferragem>({
    id: 0,
    descricao: "",
    cor: "",
    unidade: "",
    preco: 0.0,
    precificacao: "",
    imagem: "",
    criadoEm: "",
    atualizadoEm: "",
    tenantId: "",
  });

  return (
    <div>
      <h2>FerragemForm</h2>
    </div>
  );
}
