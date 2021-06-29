package academia.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;

import academia.dto.MatriculaItem;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "matriculas")
public class Matricula {

	@Id
	private String id;
	
	@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime fechaMatricula = LocalDateTime.now();
	
	@NotNull(message = "El estudiante de la matricula no debe ser nulo")
	private Estudiante estudiante;
	
	private List<MatriculaItem> cursos;
	
	@NotNull(message = "El estado de la matricula no debe ser nulo")
	private Boolean estado;
	
	public Matricula() {}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getFechaMatricula() {
		return fechaMatricula;
	}

	public void setFechaMatricula(LocalDateTime fechaMatricula) {
		this.fechaMatricula = fechaMatricula;
	}

	public Estudiante getEstudiante() {
		return estudiante;
	}

	public void setEstudiante(Estudiante estudiante) {
		this.estudiante = estudiante;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}

	public List<MatriculaItem> getCursos() {
		return cursos;
	}

	public void setCursos(List<MatriculaItem> cursos) {
		this.cursos = cursos;
	}
	
}
