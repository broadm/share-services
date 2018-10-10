package handler;

import static org.junit.Assert.assertEquals;

import java.util.concurrent.CompletionStage;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;

import model.Transaction;
import play.Application;
import play.inject.guice.GuiceApplicationBuilder;
import play.test.WithApplication;
import repository.TestTransactionRepository;

public class TransactionHandlerTest extends WithApplication {

	@Override
	protected Application provideApplication() {
		return new GuiceApplicationBuilder().build();
	}

	@Test
	public void testList() throws InterruptedException, ExecutionException {
		CompletionStage<Stream<Transaction>> result = app.injector().instanceOf(TransactionHandler.class).list();

		assertEquals(TestTransactionRepository.TEST_DATA,
				result.toCompletableFuture().get().collect(Collectors.toList()));
	}
}
