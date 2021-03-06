package repository;

import static java.util.concurrent.CompletableFuture.supplyAsync;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

import javax.inject.Inject;
import javax.inject.Singleton;

import model.Transaction;
import play.Logger;
import play.mvc.Http;

@Singleton
public class TestTransactionRepository implements TransactionRepository {
	
	public static final List<Transaction> TEST_DATA = Arrays.asList(
			new Transaction(new Date(), 100, "ASOS", 99.88),
			new Transaction(new Date(), 200, "BP", 599.88));
	
	private final TransactionExecutionContext ec;
	
	@Inject
    public TestTransactionRepository(TransactionExecutionContext ec) {
        this.ec = ec;
    }

	@Override
	public CompletionStage<Stream<Transaction>> list() {
		Logger.debug("TransactionRepository.list():"+this);
		Logger.debug("context:"+Http.Context.current().id());
		return supplyAsync(() -> TEST_DATA.stream(), ec);
	}

}
