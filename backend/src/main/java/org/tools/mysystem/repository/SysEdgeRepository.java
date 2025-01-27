package org.tools.mysystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.SysEdgeEntity;

@Repository
@RepositoryRestResource
public interface SysEdgeRepository extends JpaRepository<SysEdgeEntity, String> {
}
