package org.tools.mysystem.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.SysStyleEntity;

@Repository
@RepositoryRestResource
public interface SysStyleRepository extends JpaRepository<SysStyleEntity, UUID> {
}
