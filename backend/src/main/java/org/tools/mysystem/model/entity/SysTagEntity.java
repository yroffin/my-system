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
@Table(name = "sys_tags")
@Data
public class SysTagEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = true)
    private String label;
    @Column(nullable = false)
    private String selector;
    @Column(nullable = false, length = 32768)
    private String style;

    @ManyToOne
    @JoinColumn(name = "ref_style")
    private SysStyleEntity refStyle;
}
