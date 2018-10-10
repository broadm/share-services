package controllers;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.GET;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.route;

import org.junit.Test;

import play.Application;
import play.inject.guice.GuiceApplicationBuilder;
import play.libs.Json;
import play.mvc.Http;
import play.mvc.Result;
import play.test.WithApplication;

public class TransactionControllerTest extends WithApplication {

	@Override
    protected Application provideApplication() {
        return new GuiceApplicationBuilder().build();
    }

	@Test
	public void testList() {
		Http.RequestBuilder request = new Http.RequestBuilder()
                .method(GET)
                .uri("/transactions");

        Result result = route(app, request);
        assertEquals(OK, result.status());
        assertNotNull(Json.parse(contentAsString(result)));
	}
}
