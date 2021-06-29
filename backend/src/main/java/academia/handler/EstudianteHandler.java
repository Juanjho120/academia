package academia.handler;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import academia.model.Estudiante;
import academia.service.IEstudianteService;
import academia.validators.RequestValidator;
import reactor.core.publisher.Mono;

@Component
public class EstudianteHandler {

	@Autowired
	private IEstudianteService estudianteService;
	
	@Autowired
	private RequestValidator validadorGeneral;
	
	public Mono<ServerResponse> listar(ServerRequest request) {
		return ServerResponse
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(estudianteService.listar(), Estudiante.class);
	}
	
	public Mono<ServerResponse> obtenerEstudiantesOrdenadoPorEdadDesc(ServerRequest request) {
		return ServerResponse
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(estudianteService.obtenerEstudiantesOrdenadoPorEdadDesc(), Estudiante.class);
	}
	
	public Mono<ServerResponse> listarPorId(ServerRequest request) {
		String id = request.pathVariable("id");
		return estudianteService.listarPorId(id)
				.flatMap(e -> ServerResponse
						.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
	public Mono<ServerResponse> registrar(ServerRequest request) {
		Mono<Estudiante> monoEstudiante = request.bodyToMono(Estudiante.class);
		
		return monoEstudiante
				//validacion
				.flatMap(validadorGeneral::validate)
				.flatMap(estudianteService::registrar)
				.flatMap(e -> ServerResponse.created(URI.create(request.uri().toString().concat(e.getId())))
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				);
				
	}
	
	public Mono<ServerResponse> modificar(ServerRequest request) {
		Mono<Estudiante> monoEstudiante = request.bodyToMono(Estudiante.class);
		Mono<Estudiante> monoBD = estudianteService.listarPorId(request.pathVariable("id"));
		
		return monoBD
				.zipWith(monoEstudiante, (bd, e) -> {
					bd.setId(e.getId());
					bd.setNombres(e.getNombres());
					bd.setApellidos(e.getApellidos());
					bd.setEdad(e.getEdad());
					bd.setDni(e.getDni());
					return bd;
				})
				.flatMap(validadorGeneral::validate)
				.flatMap(estudianteService::modificar)
				.flatMap(e -> ServerResponse
						.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(fromValue(e))
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
	public Mono<ServerResponse> eliminar(ServerRequest request) {
		String id = request.pathVariable("id");
		
		return estudianteService.listarPorId(id)
				.flatMap(e -> estudianteService.eliminar(e.getId())
						.then(ServerResponse.noContent().build())
				)
				.switchIfEmpty(ServerResponse.notFound().build());
	}
	
}
