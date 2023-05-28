package nsu.lerabbb.app.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "sales")
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sales")
    @SequenceGenerator(name="seq_sales", sequenceName = "seq_sales", allocationSize = 1)
    @Column(name = "s_id")
    private Long id;

    @Column(name = "s_date",  columnDefinition = "DEFAULT CURRENT_DATE")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "c_id", nullable = false)
    private Consumer consumer;

    @OneToMany(mappedBy = "sale")
    private Set<SaleContent> saleContents;

    @OneToMany(mappedBy = "sale")
    private Set<Defect> defects;

}
