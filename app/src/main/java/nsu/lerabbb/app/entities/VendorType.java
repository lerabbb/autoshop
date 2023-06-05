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
@Table(name = "vendor_types")
public class VendorType {
    @Id
    @Column(name = "type_id")

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_types")
    @SequenceGenerator(name="seq_types", sequenceName = "seq_types", allocationSize = 1, initialValue = 5)
    private Long id;

    @Column(name = "type_name")
    private String name;

//    @OneToMany(mappedBy = "type")
//    private Set<Vendor> vendors;
}
