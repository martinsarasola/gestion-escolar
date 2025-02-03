import { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  getEstudiantes,
  getEstudiantesByCurso,
  getEstudianteById,
} from "../../services/services";

function StudentsTable({ onRowClick, refresh, search, searchId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      let result;
      if (searchId && searchId.trim() !== "") {
        result = await getEstudianteById(searchId.trim());
        if (result.success) {
          const estudiante = result.data;
          const mappedRow = {
            id: estudiante._id,
            col1: "/images/profile-picture.png",
            col2: estudiante.nombre,
            col3: estudiante.apellido,
            col4: estudiante.email,
            cursos: estudiante.cursos || [],
          };
          setRows([mappedRow]);
        } else {
          setRows([]);
        }
      } else if (search && search.trim() !== "") {
        result = await getEstudiantesByCurso(search.trim());
        if (result.success) {
          const mappedRows = result.data.map((estudiante) => ({
            id: estudiante._id,
            col1: "/images/profile-picture.png",
            col2: estudiante.nombre,
            col3: estudiante.apellido,
            col4: estudiante.email,
            cursos: estudiante.cursos || [],
          }));
          setRows(mappedRows);
        }
      } else {
        result = await getEstudiantes();
        if (result.success) {
          const mappedRows = result.data.map((estudiante) => ({
            id: estudiante._id,
            col1: "/images/profile-picture.png",
            col2: estudiante.nombre,
            col3: estudiante.apellido,
            col4: estudiante.email,
            cursos: estudiante.cursos || [],
          }));
          setRows(mappedRows);
        }
      }
    } catch (error) {
      console.error("Error al cargar los estudiantes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh, search, searchId]);

  const columns = [
    {
      field: "col1",
      headerName: "",
      width: 70,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Avatar src={params.value} alt="profile-picture-placeholder" />
        </Box>
      ),
      align: "center",
    },
    { field: "col2", headerName: "Nombre", width: 120 },
    { field: "col3", headerName: "Apellido", width: 120 },
    { field: "col4", headerName: "Email", flex: 1 },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <DataGrid
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        disableColumnMenu
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSorting
        rows={rows}
        columns={columns}
        loading={loading}
        onRowClick={(params) => onRowClick(params.row)}
        sx={{ width: "100%", maxWidth: "100%", height: "100%" }}
      />
    </Box>
  );
}

export default StudentsTable;
