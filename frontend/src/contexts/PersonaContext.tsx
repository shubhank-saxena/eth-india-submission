import { createContext, useState } from "react";

const persona: any = {
  personaName: "",
  personaVisibility: "public",
  blocks: {},
};
const PersonaContext = createContext({
  personaData: persona,
  setPersonaData: (data: any) => {},
});

const PersonaProvider = ({ children }: { children: React.ReactNode }) => {
  const [personaData, setPersonaData] = useState(persona);
  return (
    <PersonaContext.Provider value={{ personaData, setPersonaData }}>
      {children}
    </PersonaContext.Provider>
  );
};

export { PersonaContext, PersonaProvider };
