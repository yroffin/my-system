package org.tools.mysystem.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.SysTagEntity;

@Repository
@RepositoryRestResource
public interface SysTagRepository extends JpaRepository<SysTagEntity, UUID> {
}
