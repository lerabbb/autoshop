package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Consumer;
import nsu.lerabbb.app.entities.Defect;
import nsu.lerabbb.app.entities.keys.SaleContentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DefectRepository extends JpaRepository<Defect, SaleContentId> {
    @Query("SELECT d FROM Defect d WHERE d.sale.id = :saleId AND d.stockDetail.id = :stockDetailId ORDER BY d.sale.id, d.stockDetail.id DESC")
    Optional<Defect> findById(@Param("saleId") Long saleId, @Param("stockDetailId") Long stockDetailId);

    @Modifying
    @Query("DELETE FROM Defect d WHERE d.sale.id=:saleId AND d.stockDetail.id=:stockDetailId")
    void deleteById(@Param("saleId") Long saleId, @Param("stockDetailId") Long stockDetailId);

}
