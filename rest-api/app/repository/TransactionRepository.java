package repository;

import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

import model.Transaction;

public interface TransactionRepository {
	
	CompletionStage<Stream<Transaction>> list();

}
