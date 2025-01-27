package org.tools.mysystem.model.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "sys_graphs")
@Data
public class SysGraphEntity implements Serializable {
    @Id
    private String id;

    @Column(nullable = false)
    private String label;
    @Column(nullable = false)
    private String style;
    @Column(nullable = false)
    private String rules;

    @OneToMany(mappedBy = "sysGraphNode", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SysNodeEntity> nodes = new ArrayList<>();
    @OneToMany(mappedBy = "sysGraphEdge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SysEdgeEntity> edges = new ArrayList<>();
}
