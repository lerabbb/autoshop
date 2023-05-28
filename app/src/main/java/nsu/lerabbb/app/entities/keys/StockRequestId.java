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
public class StockRequestId implements Serializable {
    private Long stockDetailId;
    private Long bookId;
}
