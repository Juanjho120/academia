package academia.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.Query;

import academia.model.Matricula;
import reactor.core.publisher.Flux;

public interface IMatriculaRepository extends IGenericRepository<Matricula, String> {

	@Query("{'estudiante' : { _id : ?0 }}")
	Flux<Matricula> obtenerMatriculaPorEstudiante(String estudiante);
	
	@Aggregation(pipeline = {"{$lookup: { " + 
			"	from: 'estudiantes', " + 
			"	localField: 'estudiante._id', " + 
			"	foreignField: '_id', " + 
			"	as: 'est'}}","{$sort: {'est.edad': -1}}"})
	Flux<Matricula> obtenerMatriculaOrdenadaPorEdadDesc();
	
}
