package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    @Override
    @Query("SELECT o FROM Sale o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Sale> findById(@Param("id") Long id);

    @Query(value = "SELECT PROFIT_SUM-OUTLAY_SUM AS PROFIT\n" +
            "FROM (SELECT SUM(PRICE*COUNT) AS OUTLAY_SUM\n" +
            "      FROM ORDER_CONTENT\n" +
            "      WHERE DATE_RCVD BETWEEN ?1 AND ?2\n" +
            "),\n" +
            "    (SELECT SUM(PRICE*COUNT) AS PROFIT_SUM\n" +
            "    FROM SALE_CONTENT JOIN SALES USING(S_ID)\n" +
            "    WHERE S_DATE BETWEEN ?1 AND ?2\n" +
            ")\n",
            nativeQuery = true)
    Optional<Object[]> findProfit(java.sql.Date start, Date end);
}
