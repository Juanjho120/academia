package academia.controller;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import academia.model.Menu;
import academia.service.IMenuService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/menus")
public class MenuController {

	@Autowired
	private IMenuService menuService;
	
	//CONSULTAR DE ACUERDO AL ROL DEL USUARIO QUE INICIO, DEVOLVER SUS MENUS
		@GetMapping
		public Mono<ResponseEntity<Flux<Menu>>> listar(){
			return ReactiveSecurityContextHolder.getContext()
					.map(SecurityContext::getAuthentication)
					.map(Authentication::getAuthorities)
					.map(roles -> {
						String rolesString = roles.stream().map(Object::toString).collect(Collectors.joining(","));
						String[] strings = rolesString.split(",");
						return menuService.obtenerMenus(strings);
					})
					.flatMap(fx -> {
						return Mono.just(ResponseEntity.ok()
								.contentType(MediaType.APPLICATION_JSON)
								.body(fx));
					});	
		}
		
}
