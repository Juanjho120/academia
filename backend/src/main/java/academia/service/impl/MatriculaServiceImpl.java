package academia.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import academia.model.Matricula;
import academia.repository.IGenericRepository;
import academia.repository.IMatriculaRepository;
import academia.service.IMatriculaService;
import reactor.core.publisher.Flux;

@Service
public class MatriculaServiceImpl extends CRUDImpl<Matricula, String> implements IMatriculaService {

	@Autowired
	private IMatriculaRepository matriculaRepository;
	
	@Override
	protected IGenericRepository<Matricula, String> getRepository() {
		return matriculaRepository;
	}

	@Override
	public Flux<Matricula> obtenerMatriculaOrdenadaPorEdadDesc() {
		return matriculaRepository.obtenerMatriculaOrdenadaPorEdadDesc();
	}

	@Override
	public Flux<Matricula> obtenerMatriculaPorEstudiante(String estudiante) {
		return matriculaRepository.obtenerMatriculaPorEstudiante(estudiante);
	}

}
