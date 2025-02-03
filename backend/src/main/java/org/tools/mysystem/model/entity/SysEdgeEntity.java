package org.tools.mysystem.model.entity;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "sys_edges")
@Data
public class SysEdgeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private String location;

    @Column(nullable = false)
    private String label;
    @Column(nullable = true)
    private String cdata;
    @Column(nullable = false)
    private String source;
    @Column(nullable = false)
    private String target;
    @Column(nullable = true)
    private String tag;

    @ManyToOne
    @JoinColumn(name = "graph_id")
    private SysGraphEntity sysGraphEdge;
}
