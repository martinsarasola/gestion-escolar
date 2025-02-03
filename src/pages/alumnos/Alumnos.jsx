import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import StudentsTable from "../../components/table/StudentsTable";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "@fontsource/source-serif-pro";

import { useSelector, useDispatch } from "react-redux";
import {
  selectStudent,
  updateStudent,
  deleteStudent,
  setSearchCriteria,
} from "./studentsSlice";
import { deleteEstudiante, updateEstudiante } from "../../services/services";

function Alumnos() {
  const dispatch = useDispatch();

  const selectedStudent = useSelector(
    (state) => state.students.selectedStudent
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIdQuery, setSearchIdQuery] = useState("");
  const [searchId, setSearchId] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    avatar: "",
    nombre: "",
    apellido: "",
    email: "",
    cursos: "",
  });

  const [refresh, setRefresh] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCourseSearch = () => {
    setSearchTerm(searchQuery.trim());
    setSearchId("");

    dispatch(setSearchCriteria({ search: searchQuery.trim(), searchId: "" }));
  };

  const handleIdSearch = () => {
    setSearchId(searchIdQuery.trim());
    setSearchTerm("");

    dispatch(setSearchCriteria({ search: "", searchId: searchIdQuery.trim() }));
  };

  const handleOpenDeleteDialog = (student) => {
    if (student) {
      setStudentToDelete(student);
      setOpenDeleteDialog(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };

  const handleDeleteStudent = async () => {
    if (studentToDelete) {
      try {
        const result = await deleteEstudiante(studentToDelete.id);
        if (result.success) {
          dispatch(deleteStudent(studentToDelete.id));
          setOpenDeleteDialog(false);
          setStudentToDelete(null);
          setRefresh((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error al eliminar el estudiante:", error);
      }
    }
  };

  const handleOpenEditDialog = (student) => {
    if (student) {
      setEditData({
        avatar: student.col1,
        nombre: student.col2,
        apellido: student.col3,
        email: student.col4,
        cursos: student.cursos ? student.cursos.join(", ") : "",
      });
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (selectedStudent) {
      const updatedData = {
        avatar: editData.avatar,
        nombre: editData.nombre,
        apellido: editData.apellido,
        email: editData.email,
        cursos: editData.cursos
          .split(",")
          .map((curso) => curso.trim())
          .filter((curso) => curso !== ""),
      };

      const validCourses = ["Matemática", "Arte", "Historia", "Ciencias"];

      const invalidCourses = updatedData.cursos.filter(
        (curso) => !validCourses.includes(curso)
      );

      if (invalidCourses.length > 0) {
        showSnackbar(
          `Los siguientes cursos no son válidos: ${invalidCourses.join(
            ", "
          )}. Debe contener un curso válido: Matemática, Arte, Historia o Ciencias.`,
          "error"
        );
        return;
      }

      try {
        const result = await updateEstudiante(selectedStudent.id, updatedData);
        if (result.success) {
          dispatch(
            updateStudent({
              id: selectedStudent.id,
              col1: updatedData.avatar,
              col2: updatedData.nombre,
              col3: updatedData.apellido,
              col4: updatedData.email,
              cursos: updatedData.cursos,
            })
          );
          setOpenEditDialog(false);
          setRefresh((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error al actualizar el estudiante:", error);
      }
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
            LISTA DE ALUMNOS
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 20%" } }}>
            <TextField
              id="search-course"
              name="search-course"
              fullWidth
              label="Buscar por curso"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 40%", md: "1 1 10%" } }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCourseSearch}
              sx={{ height: "100%" }}
            >
              <PersonSearchIcon />
            </Button>
          </Box>

          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 20%" } }}>
            <TextField
              id="search-id"
              name="search-id"
              fullWidth
              label="Buscar por ID"
              variant="outlined"
              value={searchIdQuery}
              onChange={(e) => setSearchIdQuery(e.target.value)}
            />
          </Box>
          <Box sx={{ flex: { xs: "1 1 40%", md: "1 1 10%" } }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleIdSearch}
              sx={{ height: "100%" }}
            >
              <PersonSearchIcon />
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "62%" },
              height: "75%",
              backgroundColor: "white",
              border: "1px solid #F0F0F0",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <StudentsTable
              onRowClick={(row) => dispatch(selectStudent(row))}
              refresh={refresh}
              search={searchTerm}
              searchId={searchId}
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #F0F0F0",
              borderRadius: "5px",
              width: { xs: "100%", md: "38%" },
              height: "350px",
              backgroundColor: "white",
              gap: "10px",
              padding: "14px",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 8, left: 8 }}
              onClick={() => handleOpenEditDialog(selectedStudent)}
            >
              <EditNoteIcon />
            </IconButton>

            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={() => handleOpenDeleteDialog(selectedStudent)}
            >
              <DeleteIcon sx={{ color: "#F44336" }} />
            </IconButton>
            {selectedStudent ? (
              <>
                <Avatar
                  src={selectedStudent.col1}
                  sx={{ width: 80, height: 80 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    wordBreak: "break-word",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {selectedStudent.col2}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: "break-word",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {selectedStudent.col3}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    wordBreak: "break-word",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {selectedStudent.col4}
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    p: 1,
                    border: "1px solid #FEC20C",
                    borderRadius: 1,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="subtitle1">Cursos</Typography>
                  <Typography
                    variant="body2"
                    sx={{ wordBreak: "break-word", textAlign: "center" }}
                  >
                    {selectedStudent.cursos?.length > 0
                      ? selectedStudent.cursos.join(", ")
                      : "Sin cursos"}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.7rem",
                    wordBreak: "break-word",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  ID: {selectedStudent.id}
                </Typography>
              </>
            ) : (
              <Typography variant="body1">Seleccione un alumno</Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="confirm-delete-dialog"
      >
        <DialogTitle id="confirm-delete-dialog">
          ¿Estás seguro de que deseas eliminar al estudiante?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Esta acción no se puede deshacer. ¿Estás seguro de que quieres
            eliminar a {selectedStudent?.col2} {selectedStudent?.col3}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteStudent} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="edit-student-dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="edit-student-dialog">Editar estudiante</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label="Avatar (URL)"
              name="avatar"
              value={editData.avatar}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Nombre"
              name="nombre"
              value={editData.nombre}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Apellido"
              name="apellido"
              value={editData.apellido}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Cursos (separados por coma)"
              name="cursos"
              value={editData.cursos}
              onChange={handleEditChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="secondary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

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

export default Alumnos;
