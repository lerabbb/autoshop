package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "vendors")
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_vendors")
    @SequenceGenerator(name="seq_vendors", sequenceName = "seq_vendors", allocationSize = 1)
    @Column(name = "v_id")
    private Long id;

    @Column(name = "v_name")
    private String name;

    @Column(name = "v_address")
    private String address;

    @Column(name = "phone_num")
    private String phoneNum;

    @Column(name = "discount",  columnDefinition = "DEFAULT 0")
    private Float discount;

    @Column(name = "contract",  columnDefinition = "DEFAULT 0")
    private Integer contract;

    @Column(name = "v_guarantee",  columnDefinition = "DEFAULT 0")
    private Integer guarantee;

    @Column(name = "delivery_time",  columnDefinition = "DEFAULT 0")
    private Integer deliveryTime;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private VendorType type;

    @Transient
    private Float averagePrice;

    @Transient
    private Integer percents;
    @Transient
    private Float partAsMoney;
    @Transient
    private Float partAsNum;

//    @OneToMany(mappedBy = "order")
//    private Set<OrderContent> orderContents;


}
