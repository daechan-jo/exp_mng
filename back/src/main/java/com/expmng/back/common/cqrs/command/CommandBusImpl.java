package com.expmng.back.common.cqrs.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

@Component
public class CommandBusImpl implements CommandBus {

	private final Map<Class<?>, CommandHandler<?, ?>> handlers = new HashMap<>();
	private final ApplicationContext applicationContext;

	@Autowired
	public CommandBusImpl(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
		// 애플리케이션 컨텍스트에서 모든 CommandHandler 구현체를 찾아 등록
		applicationContext.getBeansOfType(CommandHandler.class)
			.values()
			.forEach(this::registerHandler);
	}

	private void registerHandler(CommandHandler<?, ?> handler) {
		Class<?> commandType = extractCommandType(handler);
		handlers.put(commandType, handler);
	}

	private Class<?> extractCommandType(CommandHandler<?, ?> handler) {
		Type[] genericInterfaces = handler.getClass().getGenericInterfaces();
		for (Type genericInterface : genericInterfaces) {
			if (genericInterface instanceof ParameterizedType type) {
				if (CommandHandler.class.isAssignableFrom((Class<?>) type.getRawType())) {
					return (Class<?>) type.getActualTypeArguments()[0];
				}
			}
		}
		throw new IllegalArgumentException("Cannot determine command type for handler: " + handler.getClass());
	}

	@SuppressWarnings("unchecked")
	@Override
	public <R> R execute(Command<R> command) {
		CommandHandler<Command<R>, R> handler = (CommandHandler<Command<R>, R>) handlers.get(command.getClass());
		if (handler == null) {
			throw new IllegalArgumentException("No handler registered for command: " + command.getClass());
		}
		return handler.handle(command);
	}
}