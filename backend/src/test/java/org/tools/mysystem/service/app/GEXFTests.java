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
			public void onCompleteNode(String id, String label, int x, int y, String alias, String group, String tag,
					String cdata) {
				logger.info("[NODE] id: {} label: {} x: {} y: {} alias: {} group: {} tag: {} cdata: {}", id, label, x,
						y, alias, group, tag, cdata);
			}

			@Override
			public void onCompleteEdge(String id, String label, String source, String target, String tag) {
				logger.info("[EDGE] id: {} label: {} source: {} target: {} tag: {}", id, label, source, target, tag);
			}
		});
		assertEquals(true, true);
	}

}
