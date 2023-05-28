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
@Table(name = "details")
public class Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_details")
    @SequenceGenerator(name="seq_details", sequenceName = "seq_details", allocationSize = 1)
    @Column(name = "d_id")
    private Long id;

    @Column(name = "d_name")
    private String name;

    @Column(name = "guarantee", columnDefinition = "DEFAULT 0")
    private Integer guarantee;

    @Column(name = "d_size",  columnDefinition = "DEFAULT 0")
    private Integer size;

    @ManyToOne
    @JoinColumn(name = "p_id", nullable = false)
    private  Producer producer;

    @OneToMany(mappedBy = "detail")
    private Set<Stock> stockDetails;

    @OneToMany(mappedBy = "detail")
    private Set<OrderContent> orderContents;

    @OneToMany(mappedBy = "detail")
    private Set<RequestContent> requestContents;

}
