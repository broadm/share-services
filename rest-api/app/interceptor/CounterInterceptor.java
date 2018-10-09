package interceptor;

import static com.codahale.metrics.MetricRegistry.name;

import javax.inject.Inject;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

import com.codahale.metrics.MetricRegistry;

/**
 * @author mark_
 * 
 * Increments a counter in the metrics registry with the name of 
 * the annotated class and method.
 *
 */
public class CounterInterceptor implements MethodInterceptor {

	@Inject
	private MetricRegistry registry;

	@Override
	public Object invoke(MethodInvocation invocation) throws Throwable {
		registry.counter(name(invocation.getMethod().getDeclaringClass().getName(), invocation.getMethod().getName())).inc();
		return invocation.proceed();
	}

}
