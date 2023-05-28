package nsu.lerabbb.app.entities.keys;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class SaleContentId implements Serializable {
    private Long saleId;
    private Long stockDetailId;
}
