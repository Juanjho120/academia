package academia.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "cursos")
public class Curso {

	@Id
	private String id;
	
	@NotEmpty
	@Size(min = 3, message="El nombre del curso debe tener 3 caracteres como minimo")
	private String nombre;
	
	@NotEmpty
	@Size(min = 3, message="Las siglas del curso debe tener 3 caracteres como minimo")
	private String siglas;
	
	@NotNull(message = "El estado del curso no debe ser nulo")
	private Boolean estado;
	
	public Curso() {}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getSiglas() {
		return siglas;
	}

	public void setSiglas(String siglas) {
		this.siglas = siglas;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}
	
}
