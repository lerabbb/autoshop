package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
@Table(name = "stock")
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_stock")
    @SequenceGenerator(name="seq_stock", sequenceName = "seq_stock", allocationSize = 1)
    @Column(name = "stock_detail_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cell_id", nullable = false)
    private Cell cell;

    @ManyToOne
    @JoinColumn(name = "d_id", nullable = false)
    private Detail detail;

    @ManyToOne
    @JoinColumn(name = "o_id", nullable = false)
    private Order order;

    @Column(name = "count",  columnDefinition = "DEFAULT 0")
    private Integer count;

    @Transient
    private Integer sum;

    @Transient
    private Float percentage;

    @Transient
    private Double purchasePrice;

    public Stock(){
        cell = new Cell();
        detail = new Detail();
        order = new Order();
    }

//    @OneToMany(mappedBy = "stockDetail")
//    private Set<StockRequest> stockRequests;
//
//    @OneToMany(mappedBy = "stockDetail")
//    private Set<SaleContent> saleContents;
//
//    @OneToMany(mappedBy = "stockDetail")
//    private Set<Defect> defects;

}
