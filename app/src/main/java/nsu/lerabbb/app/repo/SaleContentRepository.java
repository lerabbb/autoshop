package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.SaleContent;
import nsu.lerabbb.app.entities.keys.SaleContentId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
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

    @Query(value = "\n" +
            "SELECT S_ID, D_ID, D_NAME AS DETAIL_NAME,\n" +
            "       SALE_CONTENT.COUNT AS COUNT,\n" +
            "       PRICE, \n" +
            "       SALE_CONTENT.COUNT*PRICE AS TOTAL_SUM, \n" +
            "       S_DATE AS SALE_DATE, \n" +
            "       C_ID, LASTNAME, FIRSTNAME, PATRONYMIC\n" +
            "FROM SALE_CONTENT JOIN STOCK USING (STOCK_DETAIL_ID)\n" +
            "                  JOIN DETAILS USING (D_ID)\n" +
            "                  JOIN SALES USING (S_ID)\n" +
            "                  JOIN CONSUMERS USING (C_ID)\n" +
            "WHERE S_DATE BETWEEN ?1 AND ?2\n",
            nativeQuery = true)
    Optional <List<Object[]>> findCashReport(Date start, Date end);
}
