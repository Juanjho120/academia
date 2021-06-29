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

import academia.model.Curso;
import academia.service.ICursoService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/cursos")
public class CursoController {

	@Autowired
	private ICursoService cursoService;
	
	@GetMapping
	public Mono<ResponseEntity<Flux<Curso>>> listar() {
		Flux<Curso> fxCursos = cursoService.listar();
		
		return Mono.just(ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(fxCursos));
	}
	
	@GetMapping("/{id}")
	public Mono<ResponseEntity<Curso>> listarPorId(@PathVariable("id") String id) {
		return cursoService.listarPorId(id)
				.map(e -> ResponseEntity.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(e))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	} 
	
	@PostMapping
	public Mono<ResponseEntity<Curso>> registrar(@Valid @RequestBody Curso curso, final ServerHttpRequest request) {
		return cursoService.registrar(curso)
				.map(e -> ResponseEntity.created(URI.create(request.getURI().toString().concat("/").concat(e.getId())))
						.contentType(MediaType.APPLICATION_JSON)
						.body(e)
				);
	}
	
	@PutMapping("/{id}")
	public Mono<ResponseEntity<Curso>> modificar(@PathVariable("id") String id, @RequestBody Curso curso) {
		Mono<Curso> monoCurso = Mono.just(curso);
		Mono<Curso> monoBD = cursoService.listarPorId(id);
		
		return monoBD
				.zipWith(monoCurso, (bd, e) -> {
					bd.setId(id);
					bd.setNombre(e.getNombre());
					bd.setSiglas(e.getSiglas());
					bd.setEstado(e.getEstado());
					return bd;
				})
				.flatMap(cursoService::modificar) //bd -> cursoService.modificar(bd)
				.map(e -> ResponseEntity.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(e))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> eliminar(@PathVariable("id") String id) {
		return cursoService.listarPorId(id)
				.flatMap(e -> {
					return cursoService.eliminar(e.getId())
							.then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)));
				})
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
}
