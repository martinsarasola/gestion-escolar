import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@emotion/react";

function CrearAlumno() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const cursosDisponibles = ["Matemática", "Historia", "Ciencias", "Arte"];

  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const showMessage = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCursoChange = (curso) => {
    setCursosSeleccionados((prevCursos) => {
      if (prevCursos.includes(curso)) {
        return prevCursos.filter((c) => c !== curso);
      } else {
        return [...prevCursos, curso];
      }
    });
  };

  const handleSubmit = async () => {
    if (!nombre || !apellido || !email || cursosSeleccionados.length === 0) {
      showMessage(
        "Por favor, completa todos los campos y selecciona al menos un curso.",
        "warning"
      );
      return;
    }

    const nuevoAlumno = {
      nombre,
      apellido,
      email,
      cursos: cursosSeleccionados,
    };

    try {
      const response = await fetch(
        "https://api-gestion-escolar.vercel.app/api/estudiantes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoAlumno),
        }
      );

      const result = await response.json();
      if (response.ok && result.success) {
        showMessage("Estudiante creado con éxito.", "success");
        setNombre("");
        setApellido("");
        setEmail("");
        setCursosSeleccionados([]);
      } else {
        showMessage("Error al crear el estudiante: " + result.message, "error");
      }
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
      showMessage("Error al conectar con el servidor.", "error");
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #F0F0F0",
        borderRadius: "3px",
        backgroundColor: "#FAFAFA",
        paddingTop: "14px",
        paddingBottom: "14px",
      }}
    >
      <Box sx={{ height: "92%", width: "97%" }}>
        <Box
          sx={{
            border: "2px solid #FEC20C",
            borderRadius: "3px",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: '"Source Serif Pro", serif',
              fontSize: { xs: "1rem", sm: "2rem" },
              letterSpacing: "2px",
              "@media (max-height: 500px)": { fontSize: "4vh" },
            }}
          >
            CREAR ALUMNO
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            alignItems: "center",
            height: { xs: "100%", sm: "65vh" },
            marginTop: "14px",
            border: "1px solid #D0D0D0",
            borderRadius: "3px",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "10%", sm: "14%" },
              width: "96%",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Source Serif Pro", serif',
                fontSize: { xs: "1rem", sm: "1.7rem" },
                letterSpacing: "2px",
                "@media (max-height: 550px)": { fontSize: "4vh" },
                textAlign: "center",
              }}
            >
              Información del alumno
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              border: "1px solid #D0D0D0",
              borderRadius: "3px",
              backgroundColor: "#FAFAFA",
              height: "86%",
              width: "96%",
              marginBottom: "14px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", md: "50%" },
                height: "100%",
                margin: { xs: "10px 0", sm: "0" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  backgroundColor: "white",
                  border: "1px solid #d0d0d0",
                  borderRadius: "3px",
                  width: "95%",
                  padding: { xs: "7%", md: "5%" },
                  margin: { md: "0px", lg: "10px" },
                  gap: "3px",
                  overflowY: { xs: "auto", lg: "hidden" },
                }}
              >
                <Typography sx={{ fontFamily: '"Source Serif Pro", serif' }}>
                  Nombre
                </Typography>
                <TextField
                  id="nombre"
                  name="nombre"
                  fullWidth
                  placeholder="Nombre"
                  variant="outlined"
                  size={isSmallScreen ? "small" : "medium"}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <Typography sx={{ fontFamily: '"Source Serif Pro", serif' }}>
                  Apellido
                </Typography>
                <TextField
                  id="apellido"
                  name="apellido"
                  fullWidth
                  placeholder="Apellido"
                  variant="outlined"
                  size={isSmallScreen ? "small" : "medium"}
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                <Typography sx={{ fontFamily: '"Source Serif Pro", serif' }}>
                  Email
                </Typography>
                <TextField
                  id="email"
                  name="email"
                  autoComplete="email"
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  size={isSmallScreen ? "small" : "medium"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", md: "50%" },
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: { xs: "0", sm: "1px solid #D0D0D0" },
                  width: "100%",
                  height: "80%",
                  margin: { xs: "14px 0", sm: "0" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Source Serif Pro", serif',
                    height: "13%",
                  }}
                >
                  Cursos:
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #D0D0D0",
                    borderRadius: "3px",
                    backgroundColor: "white",
                    maxHeight: "200px",
                    width: "90%",
                    overflowY: "auto",
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "white",
                      padding: 0,
                    }}
                  >
                    {cursosDisponibles.map((curso) => (
                      <ListItem
                        key={curso}
                        secondaryAction={
                          <Checkbox
                            id={`curso-${curso}`}
                            name={`curso-${curso}`}
                            checked={cursosSeleccionados.includes(curso)}
                            onChange={() => handleCursoChange(curso)}
                          />
                        }
                        sx={{
                          borderBottom: "1px solid #D0D0D0",
                        }}
                      >
                        <ListItemText primary={curso} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  border: "1px solid #D0D0D0",
                  width: "100%",
                  height: "20%",
                }}
              >
                <Button
                  fullWidth
                  sx={{ height: "100%", borderRadius: "0" }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Crear Alumno
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CrearAlumno;
