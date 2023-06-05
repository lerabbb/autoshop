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
@Table(name = "request_content")
public class RequestContent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_request_content")
    @SequenceGenerator(name="seq_request_content", sequenceName = "seq_request_content", allocationSize = 1)
    @Column(name = "book_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "r_id", nullable = false)
    private Request request;

    @ManyToOne
    @JoinColumn(name = "d_id", nullable = false)
    private Detail detail;

    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private RequestState state;

    @Column(name = "count")
    private Integer count;

    @Column(name = "notify_date",  columnDefinition = "DEFAULT CURRENT_DATE")
    private Date notifyDate;
}
