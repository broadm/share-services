package annotations;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

/**
 * @author mark_
 * 
 * Mark methods with this annotation to increment a hit counter 
 * with the application metrics
 *
 */
@Target(METHOD)
@Retention(RUNTIME)
public @interface Counter {

}
