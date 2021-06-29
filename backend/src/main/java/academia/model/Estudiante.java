package academia.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Document(collection = "estudiantes")
public class Estudiante {

	@Id
	private String id;
	
	@NotEmpty
	@Size(min = 3, message="El nombre del estudiante debe tener 3 caracteres como minimo")
	private String nombres;
	
	@NotEmpty
	@Size(min = 3, message="El apellido del estudiante debe tener 3 caracteres como minimo")
	private String apellidos;
	
	@NotEmpty
	private String dni;
	
	@NotNull(message = "La edad del estudiante no debe ser nulo")
	private Integer edad;
	
	public Estudiante() {}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getDni() {
		return dni;
	}

	public void setDni(String dni) {
		this.dni = dni;
	}

	public Integer getEdad() {
		return edad;
	}

	public void setEdad(Integer edad) {
		this.edad = edad;
	};
	
}
