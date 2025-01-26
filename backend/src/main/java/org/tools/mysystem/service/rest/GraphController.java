package org.tools.mysystem.service.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tools.mysystem.model.rest.GraphRest;
import org.tools.mysystem.service.app.GraphService;

@RestController
@RequestMapping("/graph")
public class GraphController {
    private static final String template = "Hello, %s! test 18";

    private GraphService graphService;

    @Autowired
    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @PostMapping("/")
    public GraphRest create(@RequestBody GraphRest body) {
        return graphService.create(body);
    }

    @GetMapping("/")
    public List<GraphRest> greeting() {
        return graphService.findAll();
    }
}
