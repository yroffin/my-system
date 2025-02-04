package org.tools.mysystem.service.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tools.mysystem.model.entity.SysStyleEntity;
import org.tools.mysystem.model.entity.SysTagEntity;
import org.tools.mysystem.repository.SysStyleRepository;
import org.tools.mysystem.repository.SysTagRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class StyleLoaderService {
    private static final Logger logger = LoggerFactory.getLogger(StyleLoaderService.class);

    private final SysStyleRepository styleRepository;
    private final SysTagRepository tagRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public StyleLoaderService(SysStyleRepository styleRepository, SysTagRepository tagRepository) {
        this.styleRepository = styleRepository;
        this.tagRepository = tagRepository;
    }

    public void load(String location, String content) {
        styleRepository.deleteAll();
        tagRepository.deleteAll();

        var styleEntity = new SysStyleEntity();
        styleEntity.setLabel("content");
        styleRepository.saveAndFlush(styleEntity);

        try {
            JsonNode rootNode = this.objectMapper.readTree(content);
            var elements = rootNode.elements();
            for (JsonNode style = elements.next(); elements.hasNext(); style = elements.next()) {
                var selector = style.get("selector").asText();
                var css = style.get("style").toString();
                this.logger.error("value: {}", style.get("style").get("css").toString());
                var tagEntity = new SysTagEntity();
                tagEntity.setLabel("content");
                tagEntity.setSelector(selector);
                tagEntity.setStyle(css);
                tagEntity.setRefStyle(styleEntity);
                tagRepository.saveAndFlush(tagEntity);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            logger.error("Error, while reading content : {}", e.getMessage());
        }
    }

}
