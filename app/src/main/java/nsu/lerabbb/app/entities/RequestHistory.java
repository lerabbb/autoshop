package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "request_history")
public class RequestHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_request_history")
    @SequenceGenerator(name="seq_request_history", sequenceName = "seq_request_history", allocationSize = 1)
    @Column(name = "rh_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private RequestContent book;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "s_id", referencedColumnName = "s_id"),
            @JoinColumn(name = "stock_detail_id", referencedColumnName = "stock_detail_id")
    })
    private SaleContent saleContent;

    @Column(name = "is_bought",  columnDefinition = "DEFAULT 0")
    private Integer isBought;
}
