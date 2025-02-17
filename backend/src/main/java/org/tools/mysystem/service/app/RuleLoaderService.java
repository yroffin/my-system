package org.tools.mysystem.service.app;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tools.mysystem.model.entity.SysRuleEntity;
import org.tools.mysystem.model.entity.SysRulesetEntity;
import org.tools.mysystem.repository.SysRuleRepository;
import org.tools.mysystem.repository.SysRulesetRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RuleLoaderService {
    private static final Logger logger = LoggerFactory.getLogger(RuleLoaderService.class);

    private final SysRuleRepository ruleRepository;
    private final SysRulesetRepository rulesetRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public RuleLoaderService(SysRuleRepository ruleRepository, SysRulesetRepository rulesetRepository) {
        this.ruleRepository = ruleRepository;
        this.rulesetRepository = rulesetRepository;
    }

    public void load(String location, String content) {
        ruleRepository.deleteAll();
        rulesetRepository.deleteAll();

        var ruleEntity = new SysRuleEntity();
        ruleEntity.setLocation(location);
        ruleEntity.setLabel("content");
        ruleRepository.saveAndFlush(ruleEntity);

        try {
            JsonNode rootNode = this.objectMapper.readTree(content);
            var elements = rootNode.elements();
            while (elements.hasNext()) {
                var rule = elements.next();
                logger.info("Rule: {}", rule);

                var name = rule.get("name").asText();
                var sets = rule.get("sets").elements();
                var listSets = new ArrayList<String>();
                while (sets.hasNext()) {
                    listSets.add(sets.next().asText());
                }
                var asserts = rule.get("asserts").elements();
                var listAsserts = new ArrayList<String>();
                while (asserts.hasNext()) {
                    listAsserts.add(asserts.next().asText());
                }
                SysRulesetEntity sysRulesetEntity = new SysRulesetEntity();
                sysRulesetEntity.setName(name);
                sysRulesetEntity.setSets(listSets);
                sysRulesetEntity.setAsserts(listAsserts);
                sysRulesetEntity.setRefRule(ruleEntity);
                rulesetRepository.saveAndFlush(sysRulesetEntity);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            logger.error("Error, while reading content : {}", e.getMessage());
        }
    }

}
