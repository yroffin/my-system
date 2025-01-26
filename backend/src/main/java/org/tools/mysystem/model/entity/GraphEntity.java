package org.tools.mysystem.model.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "graphs")
@Data
public class GraphEntity implements Serializable {
    @Id
    private String id;

    @Column(nullable = false)
    private String description;
}
