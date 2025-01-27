package org.tools.mysystem.service.app;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.File;
import java.io.IOException;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.tools.mysystem.service.app.utils.CallbackData;
import org.tools.mysystem.service.app.utils.XMLLoader;

class GEXFTests {
	private static final Logger logger = LoggerFactory.getLogger(GEXFTests.class);

	@Test
	void loadDefaultGexf() throws IOException {
		var loader = new XMLLoader();
		loader.loadFile(new File("src/test/resources/sample.gexf"), new CallbackData() {
			@Override
			public void onCompleteNode(String id) {
				logger.info("[NODE] id: {}", id);
			}

			@Override
			public void onCompleteEdge(String id) {
				logger.info("[EDGE] id: {}", id);
			}
		});
		assertEquals(true, false);
	}

}
