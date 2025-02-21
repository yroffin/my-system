package org.tools.mysystem.service.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tools.mysystem.service.app.GEXFService;
import org.tools.mysystem.service.app.ThymeleafService;

@RestController
@RequestMapping("/api/graph")
public class GraphController {
    private static final Logger logger = LoggerFactory.getLogger(GraphController.class);

    private GEXFService gexfService;
    private ThymeleafService thymeleafService;

    @Autowired
    public GraphController(GEXFService gexfService, ThymeleafService thymeleafService) {
        this.gexfService = gexfService;
        this.thymeleafService = thymeleafService;
    }

    @GetMapping(value = "/gexf/{id}", produces = "application/xml")
    public String get(@PathVariable String id) {
        logger.info("Load {}", id);
        return thymeleafService.gexf(id);
    }

    @PostMapping(value = "/gexf/{id}", produces = "application/xml")
    public String create(@PathVariable String id, @RequestBody String body) {
        logger.info("Load {}", id);
        gexfService.load(id, body);
        return thymeleafService.gexf(id);
    }
}
