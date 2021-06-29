package academia.service;

import academia.model.Menu;
import reactor.core.publisher.Flux;

public interface IMenuService extends ICRUD<Menu, String> {

	Flux<Menu> obtenerMenus(String[] roles);
	
}
