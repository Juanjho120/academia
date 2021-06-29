package academia.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import academia.model.Estudiante;
import academia.service.IEstudianteService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

	@Autowired
	private IEstudianteService estudianteService;
	
	@GetMapping
	public Mono<ResponseEntity<Flux<Estudiante>>> listar() {
		Flux<Estudiante> fxEstudiantes = estudianteService.listar();
		
		return Mono.just(ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(fxEstudiantes));
	}
	
	@GetMapping("/ordenado-por-edad-desc")
	public Mono<ResponseEntity<Flux<Estudiante>>> obtenerEstudiantesOrdenadoPorEdadDesc() {
		Flux<Estudiante> fxEstudiantes = estudianteService.obtenerEstudiantesOrdenadoPorEdadDesc();
		
		return Mono.just(ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(fxEstudiantes));
	}
	
	@GetMapping("/{id}")
	public Mono<ResponseEntity<Estudiante>> listarPorId(@PathVariable("id") String id) {
		return estudianteService.listarPorId(id)
				.map(e -> ResponseEntity.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(e))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	} 
	
	@PostMapping
	public Mono<ResponseEntity<Estudiante>> registrar(@Valid @RequestBody Estudiante estudiante, final ServerHttpRequest request) {
		return estudianteService.registrar(estudiante)
				.map(e -> ResponseEntity.created(URI.create(request.getURI().toString().concat("/").concat(e.getId())))
						.contentType(MediaType.APPLICATION_JSON)
						.body(e)
				);
	}
	
	@PutMapping("/{id}")
	public Mono<ResponseEntity<Estudiante>> modificar(@PathVariable("id") String id, @RequestBody Estudiante estudiante) {
		Mono<Estudiante> monoEstudiante = Mono.just(estudiante);
		Mono<Estudiante> monoBD = estudianteService.listarPorId(id);
		
		return monoBD
				.zipWith(monoEstudiante, (bd, e) -> {
					bd.setId(id);
					bd.setNombres(e.getNombres());
					bd.setApellidos(e.getApellidos());
					bd.setEdad(e.getEdad());
					bd.setDni(e.getDni());
					return bd;
				})
				.flatMap(estudianteService::modificar) //bd -> estudianteService.modificar(bd)
				.map(e -> ResponseEntity.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(e))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> eliminar(@PathVariable("id") String id) {
		return estudianteService.listarPorId(id)
				.flatMap(e -> {
					return estudianteService.eliminar(e.getId())
							.then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)));
				})
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
	
}
