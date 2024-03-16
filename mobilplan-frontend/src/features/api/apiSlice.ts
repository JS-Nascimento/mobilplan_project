// src/app/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tokerKey = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItOTZNeEhwb0V2OHJqWEFwLUx2Y3lxeUY5cU8tNEpuVkNsSE9RQmdPbDRjIn0.eyJleHAiOjE3MTA2NjA0ODEsImlhdCI6MTcxMDYyNDQ4MSwianRpIjoiOTMyNjIwNjQtOGUxYS00YTdiLWE4NWQtMzBiZDkyZjM0Mjg0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9qc3RlYyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiNTY2OWVhNC00ZjNhLTRhZDQtODlhOS1kZTU1ZTBjOWZhNzUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtb2JpbHBsYW4tYmMiLCJzZXNzaW9uX3N0YXRlIjoiMTQ5YjE2MTEtYzI5Ni00ODFmLTgwYTAtODE3NTZiNGYzZGRkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicm9sZV91c3VhcmlvIiwiZGVmYXVsdC1yb2xlcy1qc3RlYyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiIxNDliMTYxMS1jMjk2LTQ4MWYtODBhMC04MTc1NmI0ZjNkZGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IkpvcmdlIFNhbnRvcyIsInByZWZlcnJlZF91c2VybmFtZSI6InNhcmRpbmhhLmpvcmdlQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJKb3JnZSBTYW50b3MiLCJlbWFpbCI6InNhcmRpbmhhLmpvcmdlQGdtYWlsLmNvbSJ9.pEWEALV9XAXvqJ_KwM7-aHXzDSmlisyDHP4J6aAoeae-0JqIfuxu5S-CZBDkKGoMPO3KoOty4sNxvC99FBuU450P_X6FecztsAGqbOkXI8hr8rR4hsMRiGu67SofakLvEs1ulNZde9sZ7HCS8aeInkgwOlYlWI5NqVurBcMnwC3gJWi_txsciK6_0rWqn4M4Q_Nm-blP5ScYUNTnqbGomc6E3lyCsDoTmpguGwryGqvDDfPmwNkUL_ceEySL-H2ZFTpZq-qvwv9QeDz8P04GxJV-C9Vs2K957FO5F4GgC3qBFXPyVvxw6L-B_HlISogwlpyroRpeJtwuoTUldqvoYg';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8081/v1',
      prepareHeaders: (headers) => {
          const token = tokerKey;
          // Se o token existir, adicioná-lo ao cabeçalho Authorization
          if (token) {
              headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
      },
  }),

  tagTypes: ['Ferragens'],
  endpoints: () => ({}),
});
