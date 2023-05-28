package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nsu.lerabbb.app.entities.keys.StockRequestId;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "stock_request")
public class StockRequest {

    @EmbeddedId
    private StockRequestId id;

    @MapsId("stockDetailId")
    @ManyToOne
    @JoinColumn(name = "stock_detail_id", referencedColumnName = "stock_detail_id")
    private Stock stockDetail;

    @MapsId("bookId")
    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "book_id")
    private RequestContent book;
}
