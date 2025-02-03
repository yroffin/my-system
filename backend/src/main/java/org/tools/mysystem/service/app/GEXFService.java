package org.tools.mysystem.service.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tools.mysystem.model.entity.SysEdgeEntity;
import org.tools.mysystem.model.entity.SysGraphEntity;
import org.tools.mysystem.model.entity.SysNodeEntity;
import org.tools.mysystem.repository.SysEdgeRepository;
import org.tools.mysystem.repository.SysGraphRepository;
import org.tools.mysystem.repository.SysNodeRepository;
import org.tools.mysystem.service.app.utils.CallbackData;
import org.tools.mysystem.service.app.utils.XMLLoader;

@Service
public class GEXFService {
    private static final Logger logger = LoggerFactory.getLogger(GEXFService.class);

    private final SysGraphRepository graphRepository;
    private final SysNodeRepository nodeRepository;
    private final SysEdgeRepository edgeRepository;

    @Autowired
    public GEXFService(SysGraphRepository graphRepository, SysNodeRepository nodeRepository,
            SysEdgeRepository edgeRepository) {
        this.graphRepository = graphRepository;
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
    }

    public void load(String location, String content) {
        graphRepository.deleteAll();
        nodeRepository.deleteAll();
        edgeRepository.deleteAll();

        // create graph
        var s = new SysGraphEntity();
        s.setLocation(location);
        s.setLabel("");
        s.setStyle("");
        s.setRules("");
        graphRepository.save(s);
        var graph_selector = graphRepository.findByLocation(location);

        if (graph_selector.size() == 1) {
            var graph = graph_selector.get(0);
            var loader = new XMLLoader();
            loader.load(content, new CallbackData() {
                @Override
                public void onCompleteNode(String id, String label, int x, int y, String alias, String group,
                        String tag, String cdata) {
                    var entity = new SysNodeEntity();
                    entity.setLocation(id);
                    entity.setLabel(label);
                    entity.setX(x);
                    entity.setY(y);
                    if (alias != null)
                        entity.setAlias(alias);
                    if (group != null)
                        entity.setGrp(group);
                    if (tag != null)
                        entity.setTag(tag);
                    if (cdata != null)
                        entity.setCdata(cdata);
                    entity.setSysGraphNode(graph);
                    var saved = nodeRepository.save(entity);
                    logger.info("[NODE] {}", saved);
                }

                @Override
                public void onCompleteEdge(String id, String label, String source, String target, String tag) {
                    var entity = new SysEdgeEntity();
                    entity.setLocation(id);
                    entity.setLabel(label);
                    entity.setSource(source);
                    entity.setTarget(target);
                    if (tag != null)
                        entity.setTag(tag);
                    entity.setSysGraphEdge(graph);
                    var saved = edgeRepository.save(entity);
                    logger.info("[EDGE] {}", saved);
                }
            });
        }
    }

}
