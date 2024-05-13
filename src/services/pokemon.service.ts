import { GetPokemonById, GetPokemonList } from "@/consts/pathnames";
import axios from "axios";


export const GetPokemonListApi = async () => {
  const data =  await axios.get(GetPokemonList);
  return data.data.results;
}

export const GetPokemonByIdApi = async (id:number) => {
  const data = await axios.get(GetPokemonById(id));
  return data.data;
}