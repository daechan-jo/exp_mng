package com.expmng.back.common.cqrs.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@Component
public class QueryBusImpl implements QueryBus {

	private final Map<Class<?>, QueryHandler<?, ?>> handlers = new HashMap<>();
	private final ApplicationContext applicationContext;

	@Autowired
	public QueryBusImpl(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
		// 애플리케이션 컨텍스트에서 모든 QueryHandler 구현체를 찾아 등록
		applicationContext.getBeansOfType(QueryHandler.class)
			.values()
			.forEach(this::registerHandler);
	}

	private void registerHandler(QueryHandler<?, ?> handler) {
		Class<?> queryType = extractQueryType(handler);
		handlers.put(queryType, handler);
	}

	private Class<?> extractQueryType(QueryHandler<?, ?> handler) {
		Type[] genericInterfaces = handler.getClass().getGenericInterfaces();
		for (Type genericInterface : genericInterfaces) {
			if (genericInterface instanceof ParameterizedType type) {
				if (QueryHandler.class.isAssignableFrom((Class<?>) type.getRawType())) {
					return (Class<?>) type.getActualTypeArguments()[0];
				}
			}
		}
		throw new IllegalArgumentException("Cannot determine query type for handler: " + handler.getClass());
	}

	@SuppressWarnings("unchecked")
	@Override
	public <R> R execute(Query<R> query) {
		QueryHandler<Query<R>, R> handler = (QueryHandler<Query<R>, R>) handlers.get(query.getClass());
		if (handler == null) {
			throw new IllegalArgumentException("No handler registered for query: " + query.getClass());
		}
		return handler.handle(query);
	}
}