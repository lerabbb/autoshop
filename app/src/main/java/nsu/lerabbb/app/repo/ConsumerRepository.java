package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsumerRepository extends JpaRepository<Consumer, Long> {
    @Override
    @Query("SELECT c FROM Consumer c WHERE c.id = :id ORDER BY c.id DESC")
    Optional<Consumer> findById(@Param("id") Long id);

    @Query(value = "SELECT *\n" +
            "FROM CONSUMERS JOIN SALES USING(C_ID)\n" +
            "               JOIN SALE_CONTENT USING(S_ID)\n" +
            "               JOIN STOCK USING (STOCK_DETAIL_ID)\n" +
            "WHERE D_ID = ?1 AND \n" +
            "      S_DATE BETWEEN ?2 AND ?3\n",
            nativeQuery = true)
    Optional<List<Consumer>> findByDetailAndDate(Long detail, Date start, Date end);

 @Query(value = "SELECT *\n" +
         "FROM CONSUMERS JOIN SALES USING(C_ID)\n" +
         "               JOIN SALE_CONTENT USING(S_ID)\n" +
         "               JOIN STOCK USING (STOCK_DETAIL_ID)\n" +
         "WHERE D_ID = ?1 AND COUNT >= ?2\n",
         nativeQuery = true)
    Optional<List<Consumer>> findByDetailCount(Long detail, Integer count);
}
