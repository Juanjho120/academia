package academia.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import academia.model.Menu;
import academia.repository.IGenericRepository;
import academia.repository.IMenuRepository;
import academia.service.IMenuService;
import reactor.core.publisher.Flux;

@Service
public class MenuServiceImpl extends CRUDImpl<Menu, String> implements IMenuService {

	@Autowired
	private IMenuRepository menuRepository;

	@Override
	protected IGenericRepository<Menu, String> getRepository() {
		return menuRepository;
	}
	
	@Override
	public Flux<Menu> obtenerMenus(String[] roles) {
		return menuRepository.obtenerMenus(roles);
	}
	
}
