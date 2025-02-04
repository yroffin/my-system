package org.tools.mysystem.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.SysStyleEntity;

@Repository
@RepositoryRestResource
public interface SysStyleRepository extends JpaRepository<SysStyleEntity, UUID> {
    @Query("SELECT e FROM SysStyleEntity e WHERE e.location = :location")
    List<SysStyleEntity> findByLocation(@Param("location") String location);
}
