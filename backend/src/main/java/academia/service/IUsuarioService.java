package academia.service;

import academia.model.Usuario;
import academia.security.User;
import reactor.core.publisher.Mono;

public interface IUsuarioService extends ICRUD<Usuario, String> {

	Mono<User> buscarPorUsuario(String usuario);
	
}
