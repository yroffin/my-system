package org.tools.mysystem.service.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tools.mysystem.service.app.RuleLoaderService;

@RestController
@RequestMapping("/api/rule")
public class RuleController {
    private static final Logger logger = LoggerFactory.getLogger(GraphController.class);

    private RuleLoaderService ruleLoaderService;

    @Autowired
    public RuleController(RuleLoaderService ruleLoaderService) {
        this.ruleLoaderService = ruleLoaderService;
    }

    @PostMapping("/loader/{id}")
    public boolean create(@RequestBody String body) {
        logger.info("Load {}", "?");
        ruleLoaderService.load("sample", body);
        return true;
    }
}
