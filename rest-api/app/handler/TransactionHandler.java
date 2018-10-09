package handler;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

import javax.inject.Inject;

import model.Transaction;
import play.libs.concurrent.HttpExecutionContext;
import repository.TransactionRepository;

public class TransactionHandler {

	private final TransactionRepository repository;
	private final HttpExecutionContext ec;

	@Inject
	public TransactionHandler(TransactionRepository repository, HttpExecutionContext ec) {
		super();
		this.repository = repository;
		this.ec = ec;
	}

	public CompletionStage<Stream<Transaction>> list() {
		return repository.list().thenApplyAsync(transactionStream -> {
			return transactionStream;
		}, ec.current());
	}
}
