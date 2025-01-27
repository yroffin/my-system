package org.tools.mysystem.service.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tools.mysystem.model.rest.GEXFRest;
import org.tools.mysystem.service.app.GEXFService;

@RestController
@RequestMapping("/api/graph")
public class GraphController {
    private static final Logger logger = LoggerFactory.getLogger(GraphController.class);

    private GEXFService gexfService;

    @Autowired
    public GraphController(GEXFService gexfService) {
        this.gexfService = gexfService;
    }

    @PostMapping("/gexf/{id}")
    public boolean create(@RequestBody GEXFRest body) {
        logger.info("Load {}", "?");
        gexfService.load("sample", body.getContent());
        return true;
    }
}
