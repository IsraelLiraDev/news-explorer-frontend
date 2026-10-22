import { createContext } from 'react';

// Dados do usuário logado ({ name, email }); vazio quando não há login.
const CurrentUserContext = createContext({});

export default CurrentUserContext;
