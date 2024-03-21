export interface Usuario {
    id:              string;
    nome:            string;
    situacao:        string;
    email:           string;
    emailConfirmado: boolean;
    ddi:             string;
    ddd:             string;
    telefone:        string;
    avatarFilename:  string;
    avatarUrl:       string;
    roles:           string[];
    createdAt:       Date;
    updatedBy:       string;
    updatedAt:       Date;
}