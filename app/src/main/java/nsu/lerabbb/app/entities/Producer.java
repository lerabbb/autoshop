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
@Table(name = "producers")
public class Producer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_producers")
    @SequenceGenerator(name="seq_producers", sequenceName = "seq_producers", allocationSize = 1)
    @Column(name = "p_id")
    private Long id;

    @Column(name = "p_name")
    private String name;

    @Column(name = "p_address")
    private String address;

    @Column(name = "phone_num")
    private String phoneNum;

    @OneToMany(mappedBy = "producer")
    private Set<Detail> details;
}
