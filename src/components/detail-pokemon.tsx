import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCallback } from "react";

interface Props {
  data: any;
  onValueChange: any;
}
export const DetailPokemon: React.FC<Props> = (props) => {
  const handleCapture = useCallback(() => {
    props.onValueChange && props.onValueChange();
  }, []);

  return (
    <Box my={2} display="block" alignItems="center" gap={4} p={4} sx={{ border: "1px solid grey" }}>
      <Box display="flex" justifyContent="center">
        <img src={props.data.sprites.front_default} alt={props.data.name} loading="lazy" height={150} width={150} />
      </Box>
      <Box display="flex">
        <Typography variant="button" display="block" gutterBottom width={200} fontWeight="bold" fontSize={24}>
          Id
        </Typography>
        <Typography variant="button" display="block" gutterBottom fontSize={18}>
          {props.data.id}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="button" display="block" gutterBottom width={200} fontWeight="bold" fontSize={24}>
          TIPO
        </Typography>
        <Typography variant="button" display="block" gutterBottom fontSize={18}>
          {props.data.types?.map((item: any) => `${item.type.name} `)}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="button" display="block" gutterBottom width={200} fontWeight="bold" fontSize={24}>
          NOMBRE
        </Typography>
        <Typography variant="button" display="block" gutterBottom fontSize={18}>
          {props.data.name}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="button" display="block" gutterBottom width={200} fontWeight="bold" fontSize={24}>
          HABILIDAD
        </Typography>
        <Typography variant="button" display="block" gutterBottom fontSize={18} width={150} sx={{ wordBreak: "break-word" }}>
          {props.data.abilities?.map((item: any) => item.ability.name)}
        </Typography>
      </Box>
      <Box display="flex">
        <Typography variant="button" display="block" gutterBottom width={200} fontWeight="bold" fontSize={24}>
          CAPTURADO
        </Typography>
        <Typography variant="button" display="block" gutterBottom fontSize={18}>
          No
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" onClick={handleCapture}>
          CAPTURAR
        </Button>
      </Box>
    </Box>
  );
};
