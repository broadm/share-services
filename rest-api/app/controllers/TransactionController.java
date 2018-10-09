package controllers;

import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

import javax.inject.Inject;

import annotations.Counter;
import handler.TransactionHandler;
import model.Transaction;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;

/**
 * This controller contains actions that handle HTTP requests to the
 * application's transactions API
 */
public class TransactionController extends Controller {

	private final HttpExecutionContext ec;
	private final TransactionHandler handler;

	@Inject
	public TransactionController(HttpExecutionContext ec, TransactionHandler handler) {
		this.ec = ec;
		this.handler = handler;
	}

	/**
	 * An action that renders a JSON response with all transactions. The
	 * configuration in the <code>routes</code> file means that this method will be
	 * called when the application receives a <code>GET</code> request with a path
	 * of <code>/transactions</code>.
	 */
	@Counter
	public CompletionStage<Result> list() {
		return handler.list().thenApplyAsync(transactions -> {
			final List<Transaction> transactionList = transactions.collect(Collectors.toList());
			return ok(Json.toJson(transactionList));
		}, ec.current());
	}

}
