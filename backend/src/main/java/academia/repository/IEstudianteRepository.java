package academia.repository;

import org.springframework.data.mongodb.repository.Query;

import academia.model.Estudiante;
import reactor.core.publisher.Flux;

public interface IEstudianteRepository extends IGenericRepository<Estudiante, String> {

	@Query(value = "{}", sort = "{ 'edad' : -1 }")
	Flux<Estudiante> obtenerEstudiantesOrdenadoPorEdadDesc();
	
}
