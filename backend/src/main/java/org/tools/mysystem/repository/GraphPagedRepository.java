package org.tools.mysystem.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.tools.mysystem.model.entity.GraphEntity;

@Repository
public interface GraphPagedRepository extends PagingAndSortingRepository<GraphEntity, String> {
}
