-- Cria o usuário, se ele não existir
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles 
        WHERE rolname = 'mobilplan'
    ) THEN
        CREATE USER mobilplan WITH PASSWORD 'mobilplan@admin';
    END IF;
END
$$;

-- Tenta criar um banco de dados (irá falhar silenciosamente se o banco de dados já existir)
CREATE DATABASE mobilplan OWNER mobilplan;

-- Concede privilégios ao usuário no banco de dados
GRANT ALL PRIVILEGES ON DATABASE mobilplan TO mobilplan;

-- Cria a extensão pgcrypto, se ela não existir
CREATE EXTENSION IF NOT EXISTS pgcrypto;
