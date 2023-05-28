package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "cells")
public class Cell {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_cells")
    @SequenceGenerator(name="seq_cells", sequenceName = "seq_cells", allocationSize = 1)
    @Column(name = "cell_id")
    private Long id;

    @Column(name = "cell_size", columnDefinition = "DEFAULT 0")
    private Integer size;

    @OneToMany(mappedBy = "cell")
    private Set<Stock> stockDetails;
}
