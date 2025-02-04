import { Box, Typography } from "@mui/material";
import "@fontsource/source-serif-pro";

function Cursos() {
  const cursosDisponibles = ["Matemática", "Historia", "Ciencias", "Arte"];
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "92%",
          width: "97%",
          gap: 2,
        }}
      >
        <Box
          sx={{
            border: "2px solid #FEC20C",
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
            }}
          >
            CURSOS DISPONIBLES
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
            minHeight: { xs: "82vh", sm: "" },
            border: "1px solid #FEC20C",
            borderRadius: "3px",
            padding: 1,
          }}
        >
          {cursosDisponibles.map((curso, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                width: { xs: "100%", sm: "calc(50% - 16px)" },
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  border: "1px solid #D0D0D0",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10%",
                  backgroundColor: "white",
                  borderRadius: "3px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontFamily: '"Source Serif Pro", serif' }}
                >
                  {curso}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Cursos;
