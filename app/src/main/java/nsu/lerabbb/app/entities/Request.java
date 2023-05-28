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
@Table(name = "consumer_requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_requests")
    @SequenceGenerator(name="seq_requests", sequenceName = "seq_requests", allocationSize = 1)
    @Column(name = "r_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "c_id", nullable = false)
    private Consumer consumer;

    @Column(name = "register_date",  columnDefinition = "DEFAULT CURRENT_DATE")
    private Date registerDate;

    @OneToMany(mappedBy = "request")
    private Set<RequestContent> requestContents;
}
