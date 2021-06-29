package academia.repository;

import academia.model.Usuario;
import reactor.core.publisher.Mono;

public interface IUsuarioRepository extends IGenericRepository<Usuario, String> {

	Mono<Usuario> findOneByUsuario(String usuario);
	
}
