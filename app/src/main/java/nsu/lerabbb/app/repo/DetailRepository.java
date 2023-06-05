package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface DetailRepository extends JpaRepository<Detail, Long> {
    @Override
    @Query("SELECT d FROM Detail d WHERE d.id = :id ORDER BY d.id DESC")
    Optional<Detail> findById(@Param("id") Long id);

    @Query(value = "SELECT D_ID, D_NAME, PRICE, V_ID, V_NAME AS VENDOR,\n" +
            "DELIVERY_TIME AS DELIVERY_DAYS\n" +
            "FROM DETAILS JOIN ORDER_CONTENT USING(D_ID)\n" +
            "             JOIN ORDERS USING(O_ID)\n" +
            "             JOIN VENDORS USING(V_ID)\n" +
            "WHERE D_ID = ?1", nativeQuery = true)
    Optional<List<Object[]>> findInfoById(Long id);

    @Query(value = "SELECT *\n" +
            "FROM(\n" +
            "    SELECT d_id, d_name, sum,\n" +
            "    RANK() OVER (ORDER BY sum DESC) AS rank\n" +
            "    FROM (\n" +
            "        SELECT d_id, d_name,\n" +
            "        SUM(sale_content.count) OVER (PARTITION BY d_id) AS sum\n" +
            "        FROM sale_content JOIN stock USING(stock_detail_id) JOIN details USING(d_id)\n" +
            "    )\n" +
            ")\n" +
            "WHERE rank <= 10\n", nativeQuery = true)
    Optional<List<Object[]>> findBestSellingDetails();

    @Query(value = "SELECT D_ID, D_NAME, CAST(OUTLAY/PROFIT AS DECIMAL(4, 2)) AS PERCENTS\n" +
            "FROM(\n" +
            "    SELECT D_ID, D_NAME,\n" +
            "    SUM(ORDER_CONTENT.COUNT*ORDER_CONTENT.PRICE) OVER (PARTITION BY D_ID) AS OUTLAY,\n" +
            "    SUM(SALE_CONTENT.COUNT*SALE_CONTENT.PRICE) OVER (PARTITION BY D_ID) AS PROFIT\n" +
            "    FROM ORDER_CONTENT JOIN STOCK USING(O_ID, D_ID) \n" +
            "                       JOIN SALE_CONTENT USING(STOCK_DETAIL_ID)\n" +
            "                       JOIN DETAILS USING(D_ID)\n"+
            ")\n" +
            "ORDER BY D_ID\n", nativeQuery = true)
    Optional<List<Object[]>> findOverheadCosts();


    @Query(value = "SELECT D_ID, D_NAME, SALE_CONTENT.PRICE AS PRICE,\n" +
            "SUM(SALE_CONTENT.COUNT) OVER (PARTITION BY D_ID) AS COUNT\n" +
            "FROM SALE_CONTENT JOIN STOCK USING (STOCK_DETAIL_ID)\n" +
            "                  JOIN DETAILS USING (D_ID)\n" +
            "                  JOIN SALES USING (S_ID)\n" +
            "WHERE S_DATE = ?1\n" +
            "ORDER BY D_ID\n", nativeQuery = true)
    Optional<List<Object[]>> findSold(Date day);

    @Query(value = "SELECT DISTINCT D_ID, D_NAME, \n" +
            "COALESCE(S_DATE-DATE_RCVD, -1) AS VELOCITY_OF_MONEY\n" +
            "FROM SALES JOIN SALE_CONTENT USING(S_ID)\n" +
            "           RIGHT JOIN STOCK USING(STOCK_DETAIL_ID)\n" +
            "           JOIN ORDER_CONTENT USING(D_ID, O_ID)\n" +
            "           JOIN DETAILS USING(D_ID)\n" +
            "ORDER BY D_ID",
            nativeQuery = true)
    Optional<List<Object[]>> findVelocityOfMoney();

}
