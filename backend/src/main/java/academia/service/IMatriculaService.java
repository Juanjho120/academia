package academia.service;

import academia.model.Matricula;
import reactor.core.publisher.Flux;

public interface IMatriculaService extends ICRUD<Matricula, String> {

	Flux<Matricula> obtenerMatriculaPorEstudiante(String estudiante);
	
	Flux<Matricula> obtenerMatriculaOrdenadaPorEdadDesc();
	
}
