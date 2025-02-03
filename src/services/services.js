const API_URL = import.meta.env.VITE_API_URL;

export async function getEstudiantes() {
  const url = `${API_URL}/estudiantes`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener los estudiantes");
  }

  const result = await response.json();
  return result;
}

export async function getEstudiantesByCurso(curso) {
  const url = `${API_URL}/estudiantes?curso=${encodeURIComponent(curso)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener los estudiantes por curso");
  }

  const result = await response.json();
  return result;
}

export async function getEstudianteById(id) {
  const url = `${API_URL}/estudiantes/${encodeURIComponent(id)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener el estudiante por ID");
  }

  const result = await response.json();
  return result;
}

export async function deleteEstudiante(id) {
  const url = `${API_URL}/estudiantes/${id}`;
  const response = await fetch(url, { method: "DELETE" });
  const result = await response.json();

  if (!result.success) {
    throw new Error("Error al eliminar el estudiante: " + result.message);
  }

  return result;
}

export async function updateEstudiante(id, updatedData) {
  const url = `${API_URL}/estudiantes/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error("Error al actualizar el estudiante: " + result.message);
  }

  return result;
}
