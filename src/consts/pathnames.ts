const apiUrlDomain = 'https://pokeapi.co/api/v2/';
export const GetPokemonList = `${apiUrlDomain}/pokemon?limit=10`
export const GetPokemonById = (id:number) => `${apiUrlDomain}/pokemon/${id}`;