import { useUpdateFerragemImagemMutation } from "../materiaPrima/ferragem/ferragemSlice";

export const useHandleImageUpload = () => {
    const [updateFerragemImagem] = useUpdateFerragemImagemMutation();

    const handleImageUpload = async (id: number, file: File | null) => {
        if (!file) return;

        try {
            return await updateFerragemImagem({ id, file }).unwrap();
        } catch (error) {
            console.error('Erro ao atualizar a imagem:', error);
            throw error;
        }
    };

    return handleImageUpload;
};