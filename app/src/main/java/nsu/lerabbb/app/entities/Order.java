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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_orders")
    @SequenceGenerator(name="seq_orders", sequenceName = "seq_orders", allocationSize = 1)
    @Column(name = "o_id")
    private Long id;

    @Column(name = "is_done",  columnDefinition = "DEFAULT 0")
    private Integer isDone;

    @ManyToOne
    @JoinColumn(name = "v_id", nullable = false)
    private  Vendor vendor;

    @OneToMany(mappedBy = "order")
    private Set<OrderContent> orderContents;

    @OneToMany(mappedBy = "order")
    private Set<Stock> stockDetails;

}
