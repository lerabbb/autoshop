package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nsu.lerabbb.app.entities.keys.SaleContentId;

@Entity
@AllArgsConstructor
@Data
@Table(name = "defects")
public class Defect {

    @EmbeddedId
    private SaleContentId id;

    @MapsId("saleId")
    @ManyToOne
    @JoinColumn(name = "s_id", referencedColumnName = "s_id")
    private Sale sale;

    @MapsId("stockDetailId")
    @ManyToOne
    @JoinColumn(name = "stock_detail_id", referencedColumnName = "stock_detail_id")
    private Stock stockDetail;

    @Column(name = "count", columnDefinition = "DEFAULT 0")
    private Integer count;

    @Column(name = "refund_from_vendor", columnDefinition = "DEFAULT 0")
    private Float refundFromVendor;

    @Column(name = "refund_to_consumer", columnDefinition = "DEFAULT 0")
    private Float refundToConsumer;

    public Defect(){
        sale= new Sale();
        stockDetail=new Stock();
    }
}
