package com.expmng.back.common.cqrs.command;

public interface CommandBus {
	<R> R execute(Command<R> command);
}