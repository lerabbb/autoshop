package nsu.lerabbb.app.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "request_states")
public class RequestState {
    @Id
    @Column(name = "state_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_states")
    @SequenceGenerator(name="seq_states", sequenceName = "seq_states", allocationSize = 1, initialValue = 5)
    private Long id;

    @Column(name = "state_name")
    private String name;
}
