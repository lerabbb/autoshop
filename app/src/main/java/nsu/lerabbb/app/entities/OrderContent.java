package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nsu.lerabbb.app.entities.keys.OrderContentId;

import java.util.Date;
import java.util.Set;

@Entity
@AllArgsConstructor
@Data
@Table(name = "order_content")
public class OrderContent {

    @EmbeddedId
    private OrderContentId id;

    @MapsId("orderId")
    @ManyToOne
    @JoinColumn(name = "o_id", referencedColumnName = "o_id")
    private Order order;

    @MapsId("detailId")
    @ManyToOne
    @JoinColumn(name = "d_id", referencedColumnName = "d_id")
    private Detail detail;

    @Column(name = "count", columnDefinition = "DEFAULT 0")
    private Integer count;

    @Column(name = "date_sent", columnDefinition = "DEFAULT CURRENT_DATE")
    private Date dateSent;

    @Column(name = "date_rcvd", columnDefinition = "DEFAULT CURRENT_DATE")
    private Date dateRcvd;

    @Column(name = "price", columnDefinition = "DEFAULT 0")
    private Float price;

    public OrderContent(){
        order = new Order();
        detail = new Detail();
    }
}
