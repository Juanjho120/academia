package academia.service;

import academia.model.Estudiante;
import reactor.core.publisher.Flux;

public interface IEstudianteService extends ICRUD<Estudiante, String> {

	Flux<Estudiante> obtenerEstudiantesOrdenadoPorEdadDesc();
	
}
