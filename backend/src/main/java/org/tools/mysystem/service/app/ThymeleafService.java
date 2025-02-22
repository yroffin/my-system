package org.tools.mysystem.service.app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.tools.mysystem.model.entity.SysEdgeEntity;
import org.tools.mysystem.model.entity.SysNodeEntity;
import org.tools.mysystem.repository.SysEdgeRepository;
import org.tools.mysystem.repository.SysGraphRepository;
import org.tools.mysystem.repository.SysNodeRepository;

@Service
public class ThymeleafService {
    private static final Logger logger = LoggerFactory.getLogger(ThymeleafService.class);

    TemplateEngine templateEngine;

    private final SysGraphRepository graphRepository;
    private final SysNodeRepository nodeRepository;
    private final SysEdgeRepository edgeRepository;

    @Autowired
    public ThymeleafService(SysGraphRepository graphRepository, SysNodeRepository nodeRepository,
            SysEdgeRepository edgeRepository) {
        this.graphRepository = graphRepository;
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;

        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/");
        templateResolver.setTemplateMode(TemplateMode.XML);
        templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
    }

    public String render(String template, Context context) {
        var result = templateEngine.process(template, context);
        logger.info("template {} => {}", template, result);
        return templateEngine.process(template, context);
    }

    public String gexf(String location) {
        String template = "gexf.xml";
        Context context = new Context();
        var graphLoaded = graphRepository.findByLocation(location);
        if (graphLoaded.isEmpty()) {
            return "";
        }
        Map<String, String> graph = new HashMap<String, String>() {
            {
                put("style", graphLoaded.get(0).getStyle());
                put("rules", graphLoaded.get(0).getRules());
                put("label", graphLoaded.get(0).getLabel());
                put("location", graphLoaded.get(0).getLocation());
            }
        };
        context.setVariable("graph", graph);
        List<Map<String, String>> nodes = new ArrayList<Map<String, String>>();
        for (SysNodeEntity node : graphLoaded.get(0).getNodes()) {
            nodes.add(new HashMap<String, String>() {
                {
                    put("location", node.getLocation());
                    put("cdata", node.getCdata());
                    put("label", node.getLabel());
                    put("x", String.valueOf(node.getX()));
                    put("y", String.valueOf(node.getY()));
                    put("tag", node.getTag());
                    put("group", node.getGroup());
                    put("alias", node.getAlias());
                }
            });
        }
        context.setVariable("nodes", nodes);
        List<Map<String, String>> edges = new ArrayList<Map<String, String>>();
        for (SysEdgeEntity edge : graphLoaded.get(0).getEdges()) {
            edges.add(new HashMap<String, String>() {
                {
                    put("location", edge.getLocation());
                    put("cdata", edge.getCdata());
                    put("label", edge.getLabel());
                    put("tag", edge.getTag());
                    put("source", edge.getSource());
                    put("target", edge.getTarget());
                }
            });
        }
        context.setVariable("edges", edges);
        return templateEngine.process(template, context);
    }
}