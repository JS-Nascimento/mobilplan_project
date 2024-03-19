// src/services/authService.ts

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface LoginCredentials {
    username: string;
    password: string;
}


export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
        }),
    });

    if (!response.ok) {
        throw new Error('Login falhou');
    }

    const data: LoginResponse = await response.json();
    return data;
};
