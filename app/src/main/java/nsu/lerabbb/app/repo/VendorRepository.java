package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Order;
import nsu.lerabbb.app.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    @Override
    @Query("SELECT o FROM Vendor o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Vendor> findById(@Param("id") Long id);

//    @Override
//    @Query("SELECT o FROM Vendor o WHERE o.id = :id ORDER BY o.id DESC")
//    List<Vendor> findAll();

    @Query("SELECT o FROM Order o WHERE o.vendor.id = ?1")
    Optional<List<Order>> findOrdersByVendor(Long vId);

    @Query(value = "SELECT *\n" +
            "FROM (details JOIN order_content USING(d_id)) \n" +
            "              JOIN orders USING(o_id)\n" +
            "              JOIN vendors USING(v_id)\n" +
            "WHERE type_id = ?1 AND d_id = ?2\n", nativeQuery = true)
    Optional<List<Vendor>> findByTypeAndDetail(Long type, Long detail);

    @Query(value = "SELECT *\n" +
            "FROM DETAILS JOIN ORDER_CONTENT USING(D_ID)\n" +
            "             JOIN ORDERS USING(O_ID)\n" +
            "             JOIN VENDORS USING(V_ID)\n" +
            "WHERE D_ID = ?1 AND COUNT >= ?2 AND\n" +
            "    DATE_RCVD BETWEEN ?3 AND ?4\n",
            nativeQuery = true)
    Optional <List<Vendor>> findByDetailCountAndPeriod(Long detail, Integer count, Date startDate, Date endDate);

    @Query(value = "SELECT *\n" +
          "FROM(\n" +
          "    SELECT v_id, v_name, CAST(AVRG AS DECIMAL(6,2)) AS avrg_price,\n" +
          "    RANK() OVER (ORDER BY avrg) AS rank\n" +
          "    FROM(\n" +
          "        SELECT DISTINCT v_id, v_name, AVG(price) OVER (PARTITION BY v_id) AS avrg\n" +
          "        FROM order_content JOIN orders USING(o_id) JOIN vendors USING(v_id)\n" +
          "    )\n" +
          ")\n" +
          "WHERE rank <= 10\n",
            nativeQuery = true)
    Optional <List<Object[]>> findCheapestVendors();


    @Query(value = "SELECT V_ID, V_NAME, PART_AS_NUM/DETAILS_NUM*100 AS PERCENTS, \n" +
            "PART_AS_MONEY, PART_AS_NUM\n" +
            "FROM(\n" +
            "    SELECT V_ID, V_NAME, \n" +
            "    SUM(COUNT) OVER (PARTITION BY V_ID) AS PART_AS_NUM,\n" +
            "    SUM(PRICE) OVER (PARTITION BY V_ID) AS PART_AS_MONEY,\n" +
            "    SUM(COUNT) OVER (PARTITION BY D_ID) AS DETAILS_NUM\n" +
            "    FROM ORDER_CONTENT JOIN ORDERS USING(O_ID) JOIN VENDORS USING (V_ID)\n" +
            "    WHERE D_ID = ?1\n" +
            ")\n", nativeQuery = true)
    Optional<List<Object[]>> findByDetailPart(Long detail);
}
