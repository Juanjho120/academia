package academia.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import academia.model.Curso;
import academia.repository.ICursoRepository;
import academia.repository.IGenericRepository;
import academia.service.ICursoService;

@Service
public class CursoServiceImpl extends CRUDImpl<Curso, String> implements ICursoService {

	@Autowired
	private ICursoRepository cursoRepository;

	@Override
	protected IGenericRepository<Curso, String> getRepository() {
		return cursoRepository;
	}
	
}
