package academia.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import academia.model.Usuario;
import academia.repository.IGenericRepository;
import academia.repository.IRolRepository;
import academia.repository.IUsuarioRepository;
import academia.security.User;
import academia.service.IUsuarioService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UsuarioServiceImpl extends CRUDImpl<Usuario, String> implements IUsuarioService{

	@Autowired
	private IUsuarioRepository usuarioRepository;
	
	@Autowired
	private IRolRepository rolRepository;
	
	@Override
	protected IGenericRepository<Usuario, String> getRepository() {
		return usuarioRepository; 
	}
	
	@Override
	public Mono<User> buscarPorUsuario(String usuario) {
		Mono<Usuario> monoUsuario = usuarioRepository.findOneByUsuario(usuario);
		
		List<String> roles = new ArrayList<String>();
		
		return monoUsuario.flatMap(u -> {
			return Flux.fromIterable(u.getRoles())
					.flatMap(rol -> {
						return rolRepository.findById(rol.getId())
								.map(r -> {
									roles.add(r.getNombre());
									return r;
								});
					}).collectList().flatMap(list -> {
						u.setRoles(list);
						return Mono.just(u);
					});
		})	
		.flatMap(u -> {			
			return Mono.just(new User(u.getUsuario(), u.getClave(), u.getEstado(), roles));
		});
	}
}
