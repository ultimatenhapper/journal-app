import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import {ImageGallery} from "../components";

const NoteView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="family">
          24 de Abril de 2024
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />
         <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió hoy?"
          sx={{ border: "none", mb: 1 }}
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};

export default NoteView;
