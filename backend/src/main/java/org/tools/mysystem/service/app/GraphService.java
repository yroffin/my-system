package org.tools.mysystem.service.app;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.tools.mysystem.model.entity.GraphEntity;
import org.tools.mysystem.model.rest.GraphRest;
import org.tools.mysystem.repository.GraphRepository;

@Service
public class GraphService {

    private final GraphRepository graphRepository;

    @Autowired
    public GraphService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    public GraphRest create(GraphRest body) {
        var entity = new GraphEntity();
        entity.setId(body.getId());
        entity.setDescription("");
        graphRepository.save(entity);
        var saved = graphRepository.findById(body.getId());
        return new GraphRest(saved.get().getId());
    }

    public List<GraphRest> findAll() {
        var page = graphRepository.findAll();
        return new ArrayList<GraphRest>();
    }

}
