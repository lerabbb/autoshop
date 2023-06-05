package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;


@Entity
@AllArgsConstructor
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

    @Transient
    private Float sum;

    @Transient
    private Long rank;

    @Transient
    private Double price;

    @Transient
    private Vendor vendor;

    @Transient
    private Float percents;

    @Transient
    private Integer count;

    @Transient
    private Integer velocityOfMoney;

    public Detail(){
        vendor = new Vendor();
    }

}
