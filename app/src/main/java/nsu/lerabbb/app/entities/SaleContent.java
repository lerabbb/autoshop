package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nsu.lerabbb.app.entities.keys.SaleContentId;

import java.util.Set;

@Entity
@AllArgsConstructor
@Data
@Table(name = "sale_content")
public class SaleContent {

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

    @Column(name = "count",  columnDefinition = "DEFAULT 0")
    private Integer count;

    @Column(name = "price",  columnDefinition = "DEFAULT 0")
    private Float price;

    @Transient
    private Float totalSum;


    public SaleContent(){
        sale= new Sale();
        stockDetail=new Stock();
    }

}
