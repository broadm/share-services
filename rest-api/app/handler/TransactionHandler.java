package handler;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

import javax.inject.Inject;

import model.Transaction;
import play.Logger;
import play.mvc.Http;
import repository.TransactionExecutionContext;
import repository.TransactionRepository;

public class TransactionHandler {

	private final TransactionRepository repository;
	private final TransactionExecutionContext ec;

	@Inject
	public TransactionHandler(TransactionRepository repository, TransactionExecutionContext ec) {
		super();
		this.repository = repository;
		this.ec = ec;
	}

	public CompletionStage<Stream<Transaction>> list() {
		Logger.debug("TransactionHandler.list():" + this);
		Logger.debug("context:"+Http.Context.current().id());
		return repository.list().thenApplyAsync(transactionStream -> {
			return transactionStream;
		}, ec);
	}
}
