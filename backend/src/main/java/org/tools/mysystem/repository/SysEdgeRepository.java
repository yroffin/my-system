package org.tools.mysystem.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.SysEdgeEntity;

@Repository
@RepositoryRestResource
public interface SysEdgeRepository extends JpaRepository<SysEdgeEntity, UUID> {
    @Query("SELECT e FROM SysEdgeEntity e WHERE e.location = :location")
    List<SysEdgeEntity> findByLocation(@Param("location") String location);
}
