package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.RequestContent;
import nsu.lerabbb.app.entities.SaleContent;
import nsu.lerabbb.app.entities.keys.SaleContentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaleContentRepository extends JpaRepository<SaleContent, SaleContentId> {
    @Query("SELECT s FROM SaleContent s WHERE s.sale.id=:saleId AND s.stockDetail.id=:stockDetailId ORDER BY s.sale.id, s.stockDetail.id DESC")
    Optional<SaleContent> findById(@Param("saleId") Long saleId, @Param("stockDetailId") Long stockDetailId);

    @Modifying
    @Query("DELETE FROM SaleContent s WHERE s.sale.id=:saleId AND s.stockDetail.id=:stockDetailId")
    void deleteById(@Param("saleId") Long saleId, @Param("stockDetailId") Long stockDetailId);

    @Query("SELECT o FROM SaleContent o WHERE o.sale.id = :saleId ORDER BY o.sale.id DESC")
    Optional<List<SaleContent>> findBySale(@Param("saleId") Long saleId);
}
