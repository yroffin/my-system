package org.tools.mysystem.model.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "sys_styles")
@Data
public class SysStyleEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(unique = true)
    private String location;

    @Column(nullable = false)
    private String label;

    @OneToMany(mappedBy = "refStyle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SysTagEntity> tags = new ArrayList<>();
}
