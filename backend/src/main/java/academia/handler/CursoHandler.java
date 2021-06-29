package academia.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import academia.model.Curso;
import academia.service.ICursoService;
import academia.validators.RequestValidator;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import java.net.URI;

@Component
public class CursoHandler {

	@Autowired
	private ICursoService cursoService;
	
	@Autowired
	private RequestValidator validadorGeneral;
	
	public Mono<ServerResponse> listar(ServerRequest request) {
		return ServerResponse
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(cursoService.listar(), Curso.class);
	}
	
	public Mono<ServerResponse> listarPorId(ServerRequest request) {
		String id = request.pathVariable("id");
		return cursoService.listarPorId(id)
				.flatMap(e -> ServerResponse
						.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
	public Mono<ServerResponse> registrar(ServerRequest request) {
		Mono<Curso> monoCurso = request.bodyToMono(Curso.class);
		
		return monoCurso
				.flatMap(validadorGeneral::validate)
				.flatMap(cursoService::registrar)
				.flatMap(e -> ServerResponse.created(URI.create(request.uri().toString().concat("/").concat(e.getId())))
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				);
				
	}
	
	public Mono<ServerResponse> modificar(ServerRequest request) {
		Mono<Curso> monoCurso = request.bodyToMono(Curso.class);
		Mono<Curso> monoBD = cursoService.listarPorId(request.pathVariable("id"));
		
		return monoBD
				.zipWith(monoCurso, (bd, e) -> {
					bd.setId(e.getId());
					bd.setNombre(e.getNombre());
					bd.setSiglas(e.getSiglas());
					bd.setEstado(e.getEstado());
					return bd;
				})
				.flatMap(validadorGeneral::validate)
				.flatMap(cursoService::modificar)
				.flatMap(e -> ServerResponse
						.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
	public Mono<ServerResponse> eliminar(ServerRequest request) {
		String id = request.pathVariable("id");
		
		return cursoService.listarPorId(id)
				.flatMap(e -> cursoService.eliminar(e.getId())
						.then(ServerResponse.noContent().build())
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
}
