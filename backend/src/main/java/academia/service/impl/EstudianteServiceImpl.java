package academia.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import academia.model.Estudiante;
import academia.repository.IEstudianteRepository;
import academia.repository.IGenericRepository;
import academia.service.IEstudianteService;
import reactor.core.publisher.Flux;

@Service
public class EstudianteServiceImpl extends CRUDImpl<Estudiante, String> implements IEstudianteService {

	@Autowired
	private IEstudianteRepository estudianteRepository;
	
	@Override
	protected IGenericRepository<Estudiante, String> getRepository() {
		return estudianteRepository;
	}

	@Override
	public Flux<Estudiante> obtenerEstudiantesOrdenadoPorEdadDesc() {
		return estudianteRepository.obtenerEstudiantesOrdenadoPorEdadDesc();
	}

}
