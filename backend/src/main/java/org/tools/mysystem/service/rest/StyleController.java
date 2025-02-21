package org.tools.mysystem.service.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tools.mysystem.service.app.StyleLoaderService;

@RestController
@RequestMapping("/api/style")
public class StyleController {
    private static final Logger logger = LoggerFactory.getLogger(GraphController.class);

    private StyleLoaderService styleLoaderService;

    @Autowired
    public StyleController(StyleLoaderService styleLoaderService) {
        this.styleLoaderService = styleLoaderService;
    }

    @PostMapping("/loader/{id}")
    public String create(@PathVariable String id, @RequestBody String body) {
        logger.info("Load {}", "?");
        styleLoaderService.load(id, body);
        return body;
    }
}
