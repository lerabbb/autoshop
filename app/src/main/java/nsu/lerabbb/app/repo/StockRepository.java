package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    @Override
    @Query("SELECT o FROM Stock o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Stock> findById(@Param("id") Long id);


    @Query(value = "SELECT D_ID, CELL_ID, D_NAME, STOCK.COUNT\n" +
            "FROM STOCK JOIN ORDER_CONTENT USING (D_ID, O_ID) JOIN DETAILS USING (D_ID)\n" +
            "WHERE DATE_RCVD BETWEEN ?1 AND ?2\n",
            nativeQuery = true)
    Optional<List<Object[]>> findNotSold(Date start, Date end);


    @Query(value = "SELECT S_SUM, \n" +
            "CAST(S_SUM/O_SUM*100 AS DECIMAL(4,2)) AS PERCENTAGE\n" +
            "FROM(\n" +
            "   SELECT SUM(STOCK.COUNT) AS S_SUM, SUM(ORDER_CONTENT.COUNT) AS O_SUM\n" +
            "   FROM STOCK JOIN ORDER_CONTENT USING (D_ID, O_ID) JOIN DETAILS USING (D_ID)\n" +
            "   WHERE DATE_RCVD BETWEEN ?1 AND ?2)",
            nativeQuery = true)
    Optional<Object[]> countNotSold(Date start, Date end);


    @Query(value = "SELECT D_ID, D_NAME AS DETAIL, O_ID,\n" +
            "STOCK.COUNT AS COUNT,\n" +
            "PRICE AS PURCHASE_PRICE\n" +
            "FROM STOCK JOIN DETAILS USING(D_ID)\n" +
            "           JOIN ORDER_CONTENT USING(D_ID, O_ID)\n" +
            "ORDER BY D_ID\n" +
            "\n",
                nativeQuery = true)
    Optional<List<Object[]>> findStockReport();


    @Query(value = "SELECT CELLS - FILLED_CELLS AS EMPTY_CELLS\n" +
            "FROM (SELECT COUNT (DISTINCT CELL_ID) AS FILLED_CELLS FROM STOCK),\n" +
            "    (SELECT COUNT(CELL_ID) AS CELLS FROM CELLS)\n",
                nativeQuery = true)
    Optional<Object[]> findEmptyCells();


    @Query(value = "SELECT SUM(CELL_SIZE - FILLED_CELL) AS CAPACITY\n" +
            "FROM(\n" +
            "    SELECT CELL_SIZE, \n" +
            "    SUM(COALESCE(COUNT*D_SIZE, 0)) OVER (PARTITION BY CELL_ID) AS FILLED_CELL\n" +
            "    FROM CELLS LEFT JOIN STOCK USING (CELL_ID) JOIN DETAILS USING(D_ID)\n" +
            ")",
                nativeQuery = true)
    Optional<Object[]> findCapacity();


}
