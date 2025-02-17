package org.tools.mysystem.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.SysRulesetEntity;

@Repository
@RepositoryRestResource
public interface SysRulesetRepository extends JpaRepository<SysRulesetEntity, UUID> {
}
