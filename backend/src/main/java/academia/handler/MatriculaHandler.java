package academia.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import academia.model.Matricula;
import academia.service.IMatriculaService;
import academia.validators.RequestValidator;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import java.net.URI;

@Component
public class MatriculaHandler {

	@Autowired
	private IMatriculaService matriculaService;
	
	@Autowired
	private RequestValidator validadorGeneral;
	
	public Mono<ServerResponse> listar(ServerRequest request) {
		return ServerResponse
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(matriculaService.listar(), Matricula.class);
	}
	
	public Mono<ServerResponse> obtenerMatriculaOrdenadaPorEdadDesc(ServerRequest request) {
		return ServerResponse
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(matriculaService.obtenerMatriculaOrdenadaPorEdadDesc(), Matricula.class);
	}
	
	public Mono<ServerResponse> listarPorId(ServerRequest request) {
		String id = request.pathVariable("id");
		return matriculaService.listarPorId(id)
				.flatMap(e -> ServerResponse
						.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
	public Mono<ServerResponse> registrar(ServerRequest request) {
		Mono<Matricula> monoMatricula = request.bodyToMono(Matricula.class);
		
		return monoMatricula
				.flatMap(validadorGeneral::validate)
				.flatMap(matriculaService::registrar)
				.flatMap(e -> ServerResponse.created(URI.create(request.uri().toString().concat("/").concat(e.getId())))
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				);
				
	}
	
	public Mono<ServerResponse> modificar(ServerRequest request) {
		Mono<Matricula> monoMatricula = request.bodyToMono(Matricula.class);
		Mono<Matricula> monoBD = matriculaService.listarPorId(request.pathVariable("id"));
		
		return monoBD
				.zipWith(monoMatricula, (bd, e) -> {
					bd.setId(e.getId());
					bd.setEstudiante(e.getEstudiante());
					bd.setEstado(e.getEstado());
					bd.setCursos(e.getCursos());
					return bd;
				})
				.flatMap(validadorGeneral::validate)
				.flatMap(matriculaService::modificar)
				.flatMap(e -> ServerResponse
						.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
	public Mono<ServerResponse> eliminar(ServerRequest request) {
		String id = request.pathVariable("id");
		
		return matriculaService.listarPorId(id)
				.flatMap(e -> matriculaService.eliminar(e.getId())
						.then(ServerResponse.noContent().build())
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
}
