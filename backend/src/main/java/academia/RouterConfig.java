package academia;

import static org.springframework.web.reactive.function.server.RequestPredicates.DELETE;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.PUT;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import academia.handler.CursoHandler;
import academia.handler.EstudianteHandler;
import academia.handler.MatriculaHandler;


@Configuration
public class RouterConfig {

	@Bean
	public RouterFunction<ServerResponse> rutasEstudiantes(EstudianteHandler estudianteHandler) {
		return route(GET("/functional/estudiantes"), estudianteHandler::listar)
				.andRoute(GET("/functional/estudiantes/ordenado-por-edad-desc"), estudianteHandler::obtenerEstudiantesOrdenadoPorEdadDesc)
				.andRoute(GET("/functional/estudiantes/{id}"), estudianteHandler::listarPorId)
				.andRoute(POST("/functional/estudiantes"), estudianteHandler::registrar)
				.andRoute(PUT("/functional/estudiantes/{id}"), estudianteHandler::modificar)
				.andRoute(DELETE("/functional/estudiantes/{id}"), estudianteHandler::eliminar);
	}
	
	@Bean
	public RouterFunction<ServerResponse> rutasCursos(CursoHandler cursoHandler) {
		return route(GET("/functional/cursos"), cursoHandler::listar)
				.andRoute(GET("/functional/cursos/{id}"), cursoHandler::listarPorId)
				.andRoute(POST("/functional/cursos"), cursoHandler::registrar)
				.andRoute(PUT("/functional/cursos/{id}"), cursoHandler::modificar)
				.andRoute(DELETE("/functional/cursos/{id}"), cursoHandler::eliminar);
	}
	
	@Bean
	public RouterFunction<ServerResponse> rutasMatriculas(MatriculaHandler cursoHandler) {
		return route(GET("/functional/matriculas"), cursoHandler::listar)
				.andRoute(GET("/functional/matriculas/ordenado-por-edad-desc"), cursoHandler::obtenerMatriculaOrdenadaPorEdadDesc)
				.andRoute(GET("/functional/matriculas/{id}"), cursoHandler::listarPorId)
				.andRoute(POST("/functional/matriculas"), cursoHandler::registrar)
				.andRoute(PUT("/functional/matriculas/{id}"), cursoHandler::modificar)
				.andRoute(DELETE("/functional/matriculas/{id}"), cursoHandler::eliminar);
	}
	
}
