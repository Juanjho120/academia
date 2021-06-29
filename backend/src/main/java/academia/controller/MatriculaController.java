package academia.controller;

import java.net.URI;
import java.time.LocalDateTime;

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

import academia.model.Matricula;
import academia.service.IEstudianteService;
import academia.service.IMatriculaService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/matriculas")
public class MatriculaController {

	@Autowired
	private IMatriculaService matriculaService;
	
	@Autowired
	private IEstudianteService estudianteService;
	
	@GetMapping
	public Mono<ResponseEntity<Flux<Matricula>>> listar() {
		Flux<Matricula> fxMatriculas = matriculaService.listar();
		
		return Mono.just(ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(fxMatriculas));
	}
	
	@GetMapping("/ordenado-por-edad-desc")
	public Mono<ResponseEntity<Flux<Matricula>>> obtenerMatriculaOrdenadaPorEdadDesc() {
		Flux<Matricula> fxMatriculas = matriculaService.obtenerMatriculaOrdenadaPorEdadDesc();
		
		return Mono.just(ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(fxMatriculas));
	}
	
	@GetMapping("/{id}")
	public Mono<ResponseEntity<Matricula>> listarPorId(@PathVariable("id") String id) {
		return matriculaService.listarPorId(id)
				//Obteniendo estudiante
				.flatMap(m -> {
					return Mono.just(m)
							.zipWith(estudianteService.listarPorId(m.getEstudiante().getId()), (ma, es) -> {
								ma.setEstudiante(es);
								return ma;
							});
				})
				.map(e -> ResponseEntity.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(e))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/estudiante/{id}")
	public Mono<ResponseEntity<Flux<Matricula>>> obtenerMatriculaPorEstudiante(@PathVariable("id") String id) {
		Flux<Matricula> fxMatriculas = matriculaService.obtenerMatriculaPorEstudiante(id);
		
		return Mono.just(ResponseEntity
				.ok()
				.contentType(MediaType.APPLICATION_JSON)
				.body(fxMatriculas));
	}
	
	@PostMapping
	public Mono<ResponseEntity<Matricula>> registrar(@Valid @RequestBody Matricula matricula, final ServerHttpRequest request) {
		matricula.setFechaMatricula(LocalDateTime.now());
		return matriculaService.registrar(matricula)
				.map(e -> ResponseEntity.created(URI.create(request.getURI().toString().concat("/").concat(e.getId())))
						.contentType(MediaType.APPLICATION_JSON)
						.body(e)
				);
	}
	
	@PutMapping("/{id}")
	public Mono<ResponseEntity<Matricula>> modificar(@PathVariable("id") String id, @RequestBody Matricula matricula) {
		Mono<Matricula> monoMatricula = Mono.just(matricula);
		Mono<Matricula> monoBD = matriculaService.listarPorId(id);
		
		return monoBD
				.zipWith(monoMatricula, (bd, e) -> {
					bd.setId(id);
					bd.setEstudiante(e.getEstudiante());
					bd.setEstado(e.getEstado());
					bd.setCursos(e.getCursos());
					return bd;
				})
				.flatMap(matriculaService::modificar) //bd -> matriculaService.modificar(bd)
				.map(e -> ResponseEntity.ok()
						.contentType(MediaType.APPLICATION_JSON)
						.body(e))
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public Mono<ResponseEntity<Void>> eliminar(@PathVariable("id") String id) {
		return matriculaService.listarPorId(id)
				.flatMap(e -> {
					return matriculaService.eliminar(e.getId())
							.then(Mono.just(new ResponseEntity<Void>(HttpStatus.NO_CONTENT)));
				})
				.defaultIfEmpty(ResponseEntity.notFound().build());
	}
}
