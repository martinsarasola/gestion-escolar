import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getEstudiantes } from "../../services/services";
import "@fontsource/source-serif-pro";

function Home() {
  const [totalAlumnos, setTotalAlumnos] = useState(0);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const result = await getEstudiantes();
        if (Array.isArray(result)) {
          setTotalAlumnos(result.length);
        } else {
          setTotalAlumnos(result.data ? result.data.length : 0);
        }
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    };

    fetchAlumnos();
  }, []);

  return (
    <>
      <Box
        sx={{
          minHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FAFAFA",
            border: "1px solid #d0d0d0",
            borderRadius: "3px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                p: 4,
                backgroundColor: "#FEC20C",
                border: "2px solid rgb(170, 170, 170)",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "150px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Source Serif Pro", serif',
                  fontWeight: "bolder",
                }}
              >
                Total de alumnos: {totalAlumnos}
              </Typography>
            </Box>

            {/* Bloque para Total de Cursos */}
            <Box
              sx={{
                flex: 1,
                p: 4,
                backgroundColor: "#96bb32",
                border: "2px solid rgb(170, 170, 170)",
                borderRadius: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "150px",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Source Serif Pro", serif',
                  fontWeight: "bolder",
                }}
              >
                Total de cursos disponibles: {4}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FAFAFA",
            border: "1px solid #D0D0D0",
            borderRadius: "3px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              width: "100%",
              maxWidth: "800px",
              minHeight: " 80px",
            }}
          >
            <Typography variant="h4">
              ¡Bienvenidos a la aplicación GESTION ESCOLAR!
            </Typography>
            <Typography variant="h6">
              Aquí encontrará sus estadísticas actualizadas.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
