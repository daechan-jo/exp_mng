package com.expmng.back.common.cqrs.query;

public interface QueryBus {
	<R> R execute(Query<R> query);
}