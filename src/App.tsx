import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
import "./App.css";
import { GetPokemonByIdApi, GetPokemonListApi } from "./services/pokemon.service";
import { useRef, useCallback, useState } from "react";
import { DetailPokemon } from "./components/detail-pokemon";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [countCapture, setCountCapture] = useState<number>(0);

  const idSelected: React.MutableRefObject<number> = useRef(0);
  const [dataPokemon, setDataPokemon] = useState<any>();

  const { data: pokemonList } = useQuery({
    queryKey: ["getPokemonList"],
    queryFn: async () => await GetPokemonListApi(),
  });

  const { refetch: refetchPokemonById } = useQuery({
    queryKey: ["getPokemon"],
    queryFn: async () => {
      const data = await GetPokemonByIdApi(idSelected.current);
      setDataPokemon(data);
    },
    enabled: false,
  });

  const handleGetPokemonById = useCallback(
    (item: Pokemon) => {
      const parts = item.url.split("/");
      idSelected.current = Number(parts[parts.length - 2]);
      refetchPokemonById();
    },
    [refetchPokemonById]
  );

  const handleCapture = useCallback(() => {
    setCountCapture((countCapture) => countCapture + 1);
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h1" gutterBottom fontSize={36} fontWeight={"bold"} mt={4}>
          MI POKEDEX
        </Typography>
        <Typography variant="h4" gutterBottom fontSize={24}>
          Tengo {countCapture} Pokemones
        </Typography>

        <Grid container spacing={4}>
          <Grid xs={12} md={7}>
            <ImageList
              sx={{
                height: {
                  xs: 400,
                  md: 460,
                  lg: 490,
                },
                gridTemplateColumns: {
                  xs: "repeat(auto-fill, minmax(120px, 1fr)) !important",
                  md: "repeat(auto-fill, minmax(120px, 1fr)) !important",
                  lg: "repeat(auto-fill, minmax(130px, 1fr)) !important",
                },
                border: "1px solid #000",
                p: 4,
              }}
              cols={3}
              gap={24}
            >
              {pokemonList?.map((item: Pokemon) => (
                <ImageListItem key={item.url}>
                  <img src={item.url} alt={item.name} loading="lazy" onClick={() => handleGetPokemonById(item)} />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid xs={12} md={5}>
            {dataPokemon ? <DetailPokemon data={dataPokemon} onValueChange={handleCapture} /> : null}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
