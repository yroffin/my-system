package org.tools.mysystem.model.entity;

import java.io.Serializable;
import java.util.List;
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
@Table(name = "sys_rulesets")
@Data
public class SysRulesetEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = true)
    private String name;
    @Column(nullable = false, length = 512)
    private List<String> sets;
    @Column(nullable = false, length = 512)
    private List<String> asserts;

    @ManyToOne
    @JoinColumn(name = "ref_rule")
    private SysRuleEntity refRule;
}
