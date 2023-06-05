package nsu.lerabbb.app.repo;

import nsu.lerabbb.app.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    @Override
    @Query("SELECT o FROM Request o WHERE o.id = :id ORDER BY o.id DESC")
    Optional<Request> findById(@Param("id") Long id);

    @Query(value = "SELECT R_ID, C_ID, \n" +
            "LASTNAME, FIRSTNAME, PATRONYMIC, PHONE_NUM, REGISTER_DATE, COUNT AS COUNT\n" +
            "FROM CONSUMER_REQUESTS JOIN CONSUMERS USING (C_ID)\n" +
            "                       JOIN REQUEST_CONTENT USING (R_ID)\n" +
            "WHERE D_ID = ?1\n", nativeQuery = true)
    Optional<List<Object[]>> findByDetail(Long detail);

    @Query(value = "SELECT SUM(REQUEST_CONTENT.COUNT * ORDER_CONTENT.PRICE) AS SUM\n" +
            "FROM CONSUMER_REQUESTS JOIN CONSUMERS USING (C_ID)\n" +
            "                       JOIN REQUEST_CONTENT USING (R_ID)\n" +
            "                       JOIN ORDER_CONTENT USING(D_ID)\n" +
            "WHERE D_ID = ?1 AND DATE_SENT >= REGISTER_DATE", nativeQuery = true)
    Optional<Object[]> findSum(Long detail);
}
