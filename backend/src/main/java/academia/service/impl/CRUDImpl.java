package academia.service.impl;

import academia.repository.IGenericRepository;
import academia.service.ICRUD;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public abstract class CRUDImpl<T, ID> implements ICRUD<T, ID> {

	protected abstract IGenericRepository<T, ID> getRepository();
	
	@Override
	public Mono<T> registrar(T t) {
		return getRepository().save(t);
	}

	@Override
	public Mono<T> modificar(T t) {
		return getRepository().save(t);
	}

	@Override
	public Flux<T> listar() {
		return getRepository().findAll();
	}

	@Override
	public Mono<T> listarPorId(ID id) {
		return getRepository().findById(id);
	}

	@Override
	public Mono<Void> eliminar(ID id) {
		return getRepository().deleteById(id);
	}

}
