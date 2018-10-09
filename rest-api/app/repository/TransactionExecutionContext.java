package repository;

import javax.inject.Inject;

import akka.actor.ActorSystem;
import play.libs.concurrent.CustomExecutionContext;

/**
 * Custom execution context wired to "transaction.repository" thread pool
 */
public class TransactionExecutionContext extends CustomExecutionContext {

    @Inject
    public TransactionExecutionContext(ActorSystem actorSystem) {
        super(actorSystem, "transaction.repository");
    }
}
