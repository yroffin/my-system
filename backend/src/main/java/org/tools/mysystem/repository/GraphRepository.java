package org.tools.mysystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.GraphEntity;

@Repository
public interface GraphRepository extends JpaRepository<GraphEntity, String> {
}
