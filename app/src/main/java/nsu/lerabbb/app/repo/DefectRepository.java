package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Defect;
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
public interface DefectRepository extends JpaRepository<Defect, SaleContentId> {
    @Query("SELECT d FROM Defect d WHERE d.sale.id = :saleId AND d.stockDetail.id = :stockDetailId ORDER BY d.sale.id, d.stockDetail.id DESC")
    Optional<Defect> findById(@Param("saleId") Long saleId, @Param("stockDetailId") Long stockDetailId);

    @Modifying
    @Query("DELETE FROM Defect d WHERE d.sale.id=:saleId AND d.stockDetail.id=:stockDetailId")
    void deleteById(@Param("saleId") Long saleId, @Param("stockDetailId") Long stockDetailId);

    @Query(value =
            "WITH CURRENT_ORDERS AS (SELECT O_ID, V_ID, V_NAME\n" +
            "                        FROM ORDER_CONTENT JOIN ORDERS USING(O_ID)\n" +
            "                                           JOIN VENDORS USING(V_ID)\n" +
            "                        WHERE DATE_RCVD BETWEEN ?1 AND ?2)\n" +
            "\n" +
            "SELECT D_ID, D_NAME, DEFECTS.COUNT, V_ID, V_NAME\n" +
            "FROM DEFECTS JOIN STOCK USING (STOCK_DETAIL_ID)\n" +
            "             JOIN DETAILS USING (D_ID)\n" +
            "             JOIN CURRENT_ORDERS USING(O_ID)\n" +
            "WHERE O_ID IN (SELECT O_ID FROM CURRENT_ORDERS)\n", nativeQuery = true)
    Optional<List<Object[]>> findByDate(Date start, Date end);
}
