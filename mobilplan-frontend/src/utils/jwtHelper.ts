// src/utils/jwtHelpers.ts
export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    const jwtPayload = JSON.parse(atob(token.split('.')[1]));
    const exp = jwtPayload?.exp || 0;
    // Converte a expiração para milissegundos e verifica se é menor que o tempo atual + 1 minuto
    return (exp * 1000) < (new Date().getTime() + 60000);
};
export function decodeJwt(token: string): any {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Erro ao decodificar o token:', e);
        return null;
    }
}

