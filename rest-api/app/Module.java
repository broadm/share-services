import static com.google.inject.matcher.Matchers.annotatedWith;
import static com.google.inject.matcher.Matchers.any;

import java.util.concurrent.TimeUnit;

import javax.inject.Provider;

import org.aopalliance.intercept.MethodInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.codahale.metrics.ConsoleReporter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Slf4jReporter;
import com.google.inject.AbstractModule;

import annotations.Counter;
import interceptor.CounterInterceptor;
import repository.TestTransactionRepository;
import repository.TransactionRepository;

/**
 * This class is a Guice module that tells Guice how to bind several
 * different types. This Guice module is created when the Play
 * application starts.
 *
 * Play will automatically use any class called `Module` that is in
 * the root package. You can create modules in other locations by
 * adding `play.modules.enabled` settings to the `application.conf`
 * configuration file.
 */
public class Module extends AbstractModule {

    @Override
    public void configure() {
    	bind(MetricRegistry.class).toProvider(MetricRegistryProvider.class).asEagerSingleton();
        bind(TransactionRepository.class).to(TestTransactionRepository.class).asEagerSingleton();
        
        MethodInterceptor counterInterceptor = new CounterInterceptor();
        bindInterceptor(any(), annotatedWith(Counter.class), counterInterceptor);
        requestInjection(counterInterceptor);
    }
}

class MetricRegistryProvider implements Provider<MetricRegistry> {
    private static final Logger logger = LoggerFactory.getLogger("application.Metrics");

    private static final MetricRegistry registry = new MetricRegistry();

    private void consoleReporter() {
        ConsoleReporter reporter = ConsoleReporter.forRegistry(registry)
                .convertRatesTo(TimeUnit.SECONDS)
                .convertDurationsTo(TimeUnit.MILLISECONDS)
                .build();
        reporter.start(10, TimeUnit.SECONDS);
    }

    private void slf4jReporter() {
        final Slf4jReporter reporter = Slf4jReporter.forRegistry(registry)
                .outputTo(logger)
                .convertRatesTo(TimeUnit.SECONDS)
                .convertDurationsTo(TimeUnit.MILLISECONDS)
                .build();
        reporter.start(1, TimeUnit.MINUTES);
    }

    public MetricRegistryProvider() {
        consoleReporter();
        //slf4jReporter();
    }

    @Override
    public MetricRegistry get() {
        return registry;
    }
}

